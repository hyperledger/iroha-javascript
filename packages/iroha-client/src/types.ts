import { IrohaTypes } from '@iroha/data-model';
import { CloseEvent, ErrorEvent } from 'ws';

export interface Key {
    digest: string;
    hex: string;
}

export type HashFn = (payload: Uint8Array) => Uint8Array;
export type SignFn = (payload: Uint8Array, privKey: Uint8Array) => Uint8Array;

export interface IrohaClientConfiguration {
    account: {
        name: string;
        domainName: string;
    };
    publicKey: Key;
    privateKey: Key;
    baseURL: string;
}

export interface IrohaClientInitParams {
    config: IrohaClientConfiguration;
    hashFn: HashFn;
    signFn: SignFn;
}

export interface IrohaEventsAPIParams {
    eventFilter: IrohaTypes['iroha_data_model::events::EventFilter'];
    baseURL: string;

    /**
     * Event listeners
     */
    on: IrohaEventsAPIListeners;
}

export interface IrohaEventsAPIListeners {
    /**
     * When connection is closed
     */
    close?: (closeEvent: CloseEvent) => void;

    /**
     * When some socket error occured
     */
    error?: (errorEvent: ErrorEvent) => void;

    /**
     * When socket connected and handshake acquired
     */
    ready?: () => void;

    /**
     * Main callback with event payload
     */
    event: (irohaEvent: IrohaTypes['iroha_data_model::events::Event']) => void;
}

export interface IrohaEventAPIReturn {
    close: () => Promise<void>;
}
