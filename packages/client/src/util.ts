import { CloseEvent, IsomorphicWebSocketAdapter, SendData, Event as WsEvent } from './web-socket/types'
import { Debugger } from 'debug'
import Emittery from 'emittery'
import JsonBigIntParseFactory from 'json-bigint/lib/parse'

const MAX_SAFE_U32 = 0xffff_ffff

export function randomU32(): number {
  return ~~(Math.random() * MAX_SAFE_U32)
}

export function transformProtocolInUrlFromHttpToWs(url: string): string {
  return url.replace(/^https?:\/\//, (substr) => {
    const isSafe = /https/.test(substr)
    return `ws${isSafe ? 's' : ''}://`
  })
}

export interface SocketEmitMapBase {
  accepted: undefined
  open: WsEvent
  close: CloseEvent
  error: WsEvent
  message: ArrayBufferView
}

export function setupWebSocket<EmitMap extends SocketEmitMapBase>(params: {
  baseURL: string
  endpoint: string
  parentDebugger: Debugger
  adapter: IsomorphicWebSocketAdapter
}): {
  ee: Emittery<EmitMap>
  isClosed: () => boolean
  send: (data: SendData) => void
  close: () => Promise<void>
  accepted: () => Promise<void>
} {
  const debug = params.parentDebugger.extend('websocket')
  const url = transformProtocolInUrlFromHttpToWs(params.baseURL) + params.endpoint
  const ee = new Emittery<EmitMap>()

  debug('opening connection to %o', url)

  const { isClosed, send, close } = params.adapter.initWebSocket({
    url,
    onopen: (e) => {
      debug('connection opened')
      ee.emit('open', e)
    },
    onclose: (e) => {
      debug('connection closed; code: %o, reason: %o, was clean: %o', e.code, e.reason, e.wasClean)
      ee.emit('close', e)
    },
    onerror: (e) => {
      debug('connection error %o', e)
      ee.emit('error', e)
    },
    onmessage: ({ data }) => {
      debug('message', data)
      ee.emit('message', data)
    },
  })

  async function closeAsync() {
    if (isClosed()) return
    debug('closing connection...')
    close()
    return ee.once('close').then(() => {})
  }

  async function accepted() {
    return new Promise<void>((resolve, reject) => {
      ee.once('accepted').then(resolve)
      ee.once('close').then(() => {
        reject(new Error('Handshake acquiring failed - connection closed'))
      })
    })
  }

  return { isClosed, send, close: closeAsync, ee, accepted }
}

const jsonBigIntParse = JsonBigIntParseFactory({ useNativeBigInt: true })

export function parseJsonWithBigInts(raw: string): any {
  return jsonBigIntParse(raw)
}

if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest

  test('When plain JSON is passed, it parses numbers as plain numbers', () => {
    const raw = `{"num":123}`
    const parsed = { num: 123 }

    const actual = parseJsonWithBigInts(raw)

    expect(actual).toEqual(parsed)
  })

  test('When JSON with too big ints is passed, it parses numbers as BigInts', () => {
    const raw = `{"num":123456789123456789123456789123456789}`
    const parsed = { num: 123456789123456789123456789123456789n }

    const actual = parseJsonWithBigInts(raw)

    expect(actual).toEqual(parsed)
  })
}
