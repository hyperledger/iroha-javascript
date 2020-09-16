import txHelper from './txHelper'
import { TxStatus, TxStatusRequest, ToriiResponse } from './proto/endpoint_pb'

function _listToTorii (txs, txClient, timeoutLimit): Promise<string[]> {
  const txList = txHelper.createTxListFromArray(txs)
  return new Promise((resolve, reject) => {
    /**
     * grpc-node hangs against unresponsive server, which possibly occur when
     * invalid node IP is set. To avoid this problem, we use timeout timer.
     * c.f. {@link https://github.com/grpc/grpc/issues/13163 Grpc issue 13163}
     */

    const timer = setTimeout(() => {
      txClient.$channel.close()
      reject(new Error('Please check IP address OR your internet connection'))
    }, timeoutLimit)

    // Sending even 1 transaction to listTorii is absolutely ok and valid.
    txClient.listTorii(txList, (err) => {
      clearTimeout(timer)

      if (err) {
        return reject(err)
      }

      const hashes: string[] = txs.map(x => txHelper.hash(x))
      resolve(hashes)
    })
  })
}

function _handleStream (hash, txClient) {
  const request = new TxStatusRequest()
  request.setTxHash(hash.toString('hex'))
  return txClient.statusStream(request)
}

function _fromStream ({ hash, txClient }, requiredStatusesStr) {
  const terminalStatuses = [
    TxStatus.STATELESS_VALIDATION_FAILED,
    TxStatus.STATEFUL_VALIDATION_FAILED,
    TxStatus.COMMITTED,
    TxStatus.NOT_RECEIVED,
    TxStatus.REJECTED
  ]
  const requiredStatuses = requiredStatusesStr.map(s => TxStatus[s])

  const successStatuses = [
    TxStatus.COMMITTED,
    ...requiredStatuses
  ]

  const isTerminal = (status) => terminalStatuses.includes(status)
  const isRequired = (status) => requiredStatuses.includes(status)
  const isError = (status) => !successStatuses.includes(status)

  return new Promise <{ tx: ToriiResponse; error: boolean}>(resolve => {
    let timer

    const connect = () => {
      const stream = _handleStream(hash, txClient)
      stream.on('data', dataHandler)
    }

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(connect, 5000)
    }

    const dataHandler = (tx: ToriiResponse) => {
      resetTimer()
      const status = tx.getTxStatus()
      if (isTerminal(status) || isRequired(status)) {
        clearTimeout(timer)
        resolve({
          tx,
          error: isError(status)
        })
      }
    }

    connect()
  })
}

async function _streamVerifier (hash, txClient, requiredStatusesStr) {
  const result = await _fromStream({ hash, txClient }, requiredStatusesStr)
  return result
}

/**
 * Capitalizes string
 * @param {String} string
 * @returns {String} capitalized string
 */
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

function reverseEnum<T> (e: T) {
  const rmap: {[value: number]: keyof T} = {}
  for (const [key, value] of Object.entries(e)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rmap[value] = key as any
  }
  return rmap
}

function sendTransactions (txs, txClient, timeoutLimit, requiredStatusesStr = [
  'COMMITTED'
]) {
  return _listToTorii(txs, txClient, timeoutLimit)
    .then(hashes => {
      return new Promise((resolve, reject) => {
        const requests = hashes
          .map(h => _streamVerifier(h, txClient, requiredStatusesStr))

        Promise.all(requests)
          .then(res => {
            const status = res
              .map(r => reverseEnum(TxStatus)[r.tx.getTxStatus()])

            return res.some(r => r.error)
              ? reject(
                new Error(
                  `Command response error: expected=${requiredStatusesStr}, actual=${status}`
                )
              )
              : resolve()
          })
      })
    })
}

function signWithArrayOfKeys (tx, privateKeys) {
  privateKeys.forEach(key => {
    tx = txHelper.sign(tx, key)
  })
  return tx
}

export {
  capitalize,
  reverseEnum,
  sendTransactions,
  signWithArrayOfKeys
}
