import {
    BTreeSetSignatureOfTransactionPayload,
    Enum,
    Fragment,
    FragmentFromBuilder,
    QueryPayload,
    Result,
    Signature,
    SignedQueryRequest,
    Transaction,
    TransactionPayload,
    Value,
    VersionedQueryResult,
    VersionedSignedQueryRequest,
    VersionedTransaction,
} from '@iroha2/data-model';
import { IrohaCryptoInterface, KeyPair } from '@iroha2/crypto-core';
import { fetch } from '@iroha2/client-isomorphic-fetch';
import { SetupEventsParams, SetupEventsReturn, setupEventsWebsocketConnection } from './events';
import { collect, createScope } from './collect-garbage';
import { normalizeArray } from './util';
import { useCrypto } from './crypto-singleton';

function useCryptoAssertive(): IrohaCryptoInterface {
    const crypto = useCrypto();
    if (!crypto) {
        throw new Error(
            '"crypto" is not defined, but required for Iroha Client to function. ' +
                'Have you set it with `setCrypto()`?',
        );
    }
    return crypto;
}

export interface SubmitTransactionParams {
    payload: FragmentFromBuilder<typeof TransactionPayload>;
    signing: KeyPair | KeyPair[];
}

export type CheckHealthResult = Result<null, Error>;

export interface MakeQueryParams {
    payload: FragmentFromBuilder<typeof QueryPayload>;
    signing: KeyPair;
}

export type MakeQueryResult = Result<FragmentFromBuilder<typeof Value>, Error>;

export type ListenEventsParams = Pick<SetupEventsParams, 'filter'>;

export interface PeerStatus {
    peers: number;
    blocks: number;
    txs: number;
    uptime: number;
}

export interface UserConfig {
    torii: {
        apiURL?: string | null;
        telemetryURL?: string | null;
    };
}

function makeSignature(keyPair: KeyPair, payload: Uint8Array): FragmentFromBuilder<typeof Signature> {
    const { createSignature } = useCryptoAssertive();

    const signature = collect(createSignature(keyPair, payload));

    // Should it be collected?
    const pubKey = keyPair.publicKey();

    return Signature.wrap({
        public_key: {
            digest_function: pubKey.digestFunction(),
            payload: pubKey.payload(),
        },
        signature: signature.signatureBytes(),
    });
}

const HEALTHY_RESPONSE = `"Healthy"`;

import { inspect } from 'util';

function tapFragment<T extends Fragment<any, any>>(x: T, label: string): T {
    // console.log(`${label}:`, inspect(x.unwrap(), false, 999, true));
    return x;
}

export class Client {
    public static create(config: UserConfig): Client {
        return new Client(config);
    }

    private toriiApiURL: null | string;
    private toriiTelemetryURL: null | string;

    private constructor(config: UserConfig) {
        this.toriiApiURL = config.torii.apiURL ?? null;
        this.toriiTelemetryURL = config.torii.telemetryURL ?? null;
    }

    /**
     * The way to define Torii API URL if it wasn't defined in the initial config.
     */
    public setApiURL(url: string): Client {
        this.toriiApiURL = url;
        return this;
    }

    /**
     * The way to define Torii Status URL if it wasn't defined in the initial config.
     */
    public setStatusURL(url: string): Client {
        this.toriiTelemetryURL = url;
        return this;
    }

    /**
     * "Status" endpoint implementation.
     *
     * @remarks
     *
     * Requires Torii Status URL in the config.
     */
    public async checkStatus(): Promise<PeerStatus> {
        return fetch(`${this.forceGetToriiTelemetryURL()}/status`).then((x) => x.json());
    }

    /**
     * "Health" endpoint implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config.
     */
    public async checkHealth(): Promise<CheckHealthResult> {
        try {
            await fetch(`${this.forceGetToriiApiURL()}/health`)
                .then((x) => {
                    if (x.status !== 200) {
                        throw new Error(`Response status is ${x.status}`);
                    }
                    return x.text();
                })
                .then((text) => {
                    if (text !== HEALTHY_RESPONSE) {
                        throw new Error(`Expected '${HEALTHY_RESPONSE}' response; got: '${text}'`);
                    }
                });

            return Enum.valuable('Ok', null);
        } catch (err) {
            return Enum.valuable('Err', err);
        }
    }

    /**
     * "Transaction" enpoint implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config.
     */
    public async submitTransaction(params: SubmitTransactionParams): Promise<void> {
        const scope = createScope();
        const { payload, signing } = params;
        const { createHash } = useCryptoAssertive();
        const baseURL = this.forceGetToriiApiURL();

        try {
            let txBytes: Uint8Array;

            scope.run(() => {
                const payloadHash = collect(createHash(payload.bytes));
                const signatures = normalizeArray(signing).map((x) => makeSignature(x, payloadHash.bytes()));

                txBytes = tapFragment(
                    VersionedTransaction.variants.V1(
                        Transaction.fromValue({
                            payload,
                            signatures: BTreeSetSignatureOfTransactionPayload.fromValue(signatures),
                        }),
                    ),
                    'versioned tx',
                ).bytes;
            });

            await fetch(`${baseURL}/transaction`, {
                method: 'POST',
                body: txBytes!,
            }).then((x) => {
                if (x.status !== 200) throw new Error(`Response status: ${x.status}`);
            });
        } finally {
            scope.free();
        }
    }

    /**
     * "Query" endpoint implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config.
     */
    public async makeQuery(params: MakeQueryParams): Promise<MakeQueryResult> {
        const scope = createScope();
        const { payload, signing } = params;
        const { createHash } = useCryptoAssertive();
        const baseURL = this.forceGetToriiApiURL();

        try {
            let queryBytes: Uint8Array;

            scope.run(() => {
                const payloadHash = collect(createHash(payload.bytes));
                const signature = makeSignature(signing, payloadHash.bytes());

                queryBytes = tapFragment(
                    VersionedSignedQueryRequest.variants.V1(SignedQueryRequest.fromValue({ payload, signature })),
                    'versioned signed query request',
                ).bytes;
            });

            const resp = await fetch(`${baseURL}/query`, {
                method: 'POST',
                body: queryBytes!,
            });

            const { status } = resp;

            if (status >= 400) {
                return Enum.valuable(
                    'Err',
                    new Error(`Request failed with status code ${status}. Text: ${await resp.text()}`),
                );
            }

            const bytes = new Uint8Array(await resp.arrayBuffer());
            const value: FragmentFromBuilder<typeof Value> = VersionedQueryResult.fromBytes(bytes).value.as('V1');

            return Enum.valuable('Ok', value);
        } finally {
            scope.free();
        }
    }

    /**
     * "Events" implementation.
     *
     * @remarks
     *
     * Requires Torii API URL in the config
     */
    public async listenForEvents(params: ListenEventsParams): Promise<SetupEventsReturn> {
        return setupEventsWebsocketConnection({
            filter: params.filter,
            toriiApiURL: this.forceGetToriiApiURL(),
        });
    }

    private forceGetToriiApiURL(): string {
        if (!this.toriiApiURL) {
            throw new Error(
                'It looks like you use some endpoint that requires Torii API URL to be set, but it is undefined.',
            );
        }
        return this.toriiApiURL;
    }

    private forceGetToriiTelemetryURL(): string {
        if (!this.toriiTelemetryURL) {
            throw new Error(
                'It looks like you use some endpoint that requires Torii Telemetry URL to be set, but it is undefined.',
            );
        }
        return this.toriiTelemetryURL;
    }
}
