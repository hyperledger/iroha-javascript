import { TMP_IROHA_DEPLOY_DIR } from '../const';
import path from 'path';
import execa from 'execa';
import { rmWithParams, saveDataAsJSON } from './util';
import readline from 'readline';

const deployDir = path.resolve(__dirname, '../', TMP_IROHA_DEPLOY_DIR);

export interface StartPeerParams {
    /**
     * @default true
     */
    withGenesis?: boolean;

    outputPeerLogs?: boolean;
}

export interface KillPeerParams {
    /**
     * If set to `true`, then after killing all side effects will be cleared, e.g. saved blocks
     */
    clearSideEffects?: boolean;
}

export interface StartPeerReturn {
    /**
     * Kill peer's process
     */
    kill: (params?: KillPeerParams) => Promise<void>;

    /**
     * Check for alive status
     */
    isAlive: () => boolean;
}

export interface IrohaConfiguration {
    trusted_peers: unknown;
    genesis: unknown;
    config: unknown;
}

/**
 * Start network with single peer.
 */
export async function startPeer(params?: StartPeerParams): Promise<StartPeerReturn> {
    // state
    let isAlive = true;

    // starting peer
    const withGenesis: boolean = params?.withGenesis ?? true;
    const subprocess = execa('./iroha_cli', withGenesis ? ['--genesis', 'genesis.json'] : [], {
        cwd: deployDir,
    });
    const stdout = readline.createInterface(subprocess.stdout!);

    stdout.on('line', (line) => {
        params?.outputPeerLogs &&
            // logging alongside of jest
            process.stdout.write(line + '\n');
    });

    subprocess.on('error', (err) => {
        console.error(err);
    });

    const irohaIsReadyLogMessagePromise = new Promise<void>((resolve) => {
        stdout.on('line', (line) => {
            if (/listening on.+:8080/i.test(line)) {
                resolve();
            }
        });
    });
    const exitPromise = new Promise<void>((resolve) => {
        subprocess.once('exit', resolve);
    });
    exitPromise.then(() => {
        isAlive = false;
    });

    async function kill(params?: KillPeerParams) {
        if (!isAlive) throw new Error('Already dead');

        subprocess.kill('SIGTERM', { forceKillAfterTimeout: 500 });

        await exitPromise;
        params?.clearSideEffects && (await clearSideEffects());

        return exitPromise;
    }

    await new Promise<void>((resolve, reject) => {
        exitPromise.then(() => reject(new Error('Iroha has exited already, maybe something went wrong')));
        setTimeout(() => reject(new Error('No key log message detected within timeout')), 300);
        irohaIsReadyLogMessagePromise.then(() => resolve());
    });

    return {
        kill,
        isAlive: () => isAlive,
    };
}

/**
 * Set config files
 */
export async function setConfiguration(configs: IrohaConfiguration): Promise<void> {
    const asKeyValue = Object.entries(configs);

    await Promise.all(
        asKeyValue.map(async ([configName, data]: [unknown, string]) => {
            await saveDataAsJSON(data, path.resolve(deployDir, `${configName}.json`));
        }),
    );
}

/**
 * Clear config files
 */
export async function clearConfiguration(): Promise<void> {
    const rmTarget = path.resolve(deployDir, '*.json');
    await rmWithParams(rmTarget);
}

/**
 * Clear all side-effects from last peer startup. Use it before each peer startup if you want to isolate states.
 *
 * (Remove `blocks` dir)
 */
export async function clearSideEffects() {
    const rmTarget = path.resolve(deployDir, 'blocks');
    await rmWithParams(rmTarget);
}
