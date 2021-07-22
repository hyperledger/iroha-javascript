import execa from 'execa';
import fs from 'fs/promises';

export async function saveDataAsJSON(data: unknown, destination: string): Promise<void> {
    await fs.writeFile(destination, JSON.stringify(data), { encoding: 'utf-8' });
}

export async function rmWithParams(
    target: string | string[],
    params?: {
        force?: boolean;
        recursive?: boolean;
    },
): Promise<void> {
    const targetNorm = Array.isArray(target) ? target : [target];

    const paramsArray: string[] = [];
    params?.force && paramsArray.push('f');
    params?.recursive && paramsArray.push('r');
    const paramsAssembled = paramsArray.length ? `-${paramsArray.join('')}` : null;

    await execa(`rm`, paramsAssembled ? [paramsAssembled, ...targetNorm] : targetNorm, {
        // enable globs
        shell: true,
    });
}
