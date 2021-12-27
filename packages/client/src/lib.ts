/**
 * @packageDocumentation
 *
 * Client library to interact with Iroha v2 Peer. Library implements Transactions, Queries,
 * Events, Status & Health check.
 */

export * from './client';
export * from './crypto-singleton';
export type { SetupEventsReturn, EventsEmitteryMap, SetupEventsParams } from './events';
