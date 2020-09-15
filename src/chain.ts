import txHelper from './txHelper'
import validate from './validation'
import { sendTransactions } from './util'
import * as Transaction from './proto/transaction_pb'
import {
  AddSignatory,
  TransferAsset,
  AddAssetQuantity,
  CreateAsset,
  RemoveSignatory,
  SetAccountQuorum,
  DetachRole,
  GrantPermission,
  RevokePermission,
  AddPeer,
  CreateAccount,
  SetAccountDetail,
  CreateDomain,
  AppendRole,
  CreateRole,
  SubtractAssetQuantity,
  CompareAndSetAccountDetail,
  RemovePeer,
  CallEngine
} from './proto/commands_pb'

class Chain {
  public txs: Transaction.Transaction[]

  public constructor (
    txs: Transaction.Transaction[]
  ) {
    this.txs = txs
  }

  public sign (privateKeys, transactionId) {
    const signed = privateKeys.reduce(
      (tx, key) => txHelper.sign(tx, key),
      this.txs[transactionId]
    )
    const newTxs = this.txs.slice()
    newTxs.splice(transactionId, 1, signed)

    return new Chain(newTxs)
  }

  public send (commandService, timeoutLimit = 5000, statusesList = []) {
    return sendTransactions(
      this.txs,
      commandService,
      timeoutLimit,
      statusesList
    )
  }
}

class TxBuilder {
  public tx: Transaction.Transaction

  public constructor (
    tx = new Transaction.Transaction()
  ) {
    this.tx = tx
  }

  public addAssetQuantity (params: AddAssetQuantity.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'addAssetQuantity',
        validate(params, ['assetId', 'amount'])
      )
    )
  }

  public addPeer (params: AddPeer.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'addPeer',
        validate(params, ['address', 'peerKey'])
      )
    )
  }

  public addSignatory (params: AddSignatory.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'addSignatory',
        validate(params, ['accountId', 'publicKey'])
      )
    )
  }

  public callEngine (params: CallEngine.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'callEngine',
        validate(params, ['type', 'caller', 'callee', 'input'])
      )
    )
  }

  public createAsset (params: CreateAsset.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'createAsset',
        validate(params, ['assetName', 'domainId', 'precision'])
      )
    )
  }

  public createAccount (params: CreateAccount.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'createAccount',
        validate(params, ['accountName', 'domainId', 'publicKey'])
      )
    )
  }

  public setAccountDetail (params: SetAccountDetail.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'setAccountDetail',
        validate(params, ['accountId', 'key', 'value'])
      )
    )
  }

  public createDomain (params: CreateDomain.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'createDomain',
        validate(params, ['domainId', 'defaultRole'])
      )
    )
  }

  public removeSignatory (params: RemoveSignatory.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'removeSignatory',
        validate(params, ['accountId', 'publicKey'])
      )
    )
  }

  public setAccountQuorum (params: SetAccountQuorum.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'setAccountQuorum',
        validate(params, ['accountId', 'quorum'])
      )
    )
  }

  public transferAsset (params: TransferAsset.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'transferAsset',
        validate(params, ['amount', 'assetId', 'description', 'destAccountId', 'srcAccountId'])
      )
    )
  }

  public appendRole (params: AppendRole.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'appendRole',
        validate(params, ['accountId', 'roleName'])
      )
    )
  }

  public detachRole (params: DetachRole.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'detachRole',
        validate(params, ['accountId', 'roleName'])
      )
    )
  }

  public createRole (params: CreateRole.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'createRole',
        validate(params, ['roleName', 'permissionsList'])
      )
    )
  }

  public grantPermission (params: GrantPermission.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'grantPermission',
        validate(params, ['accountId', 'permission'])
      )
    )
  }

  public revokePermission (params: RevokePermission.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'revokePermission',
        validate(params, ['accountId', 'permission'])
      )
    )
  }

  public subtractAssetQuantity (params: SubtractAssetQuantity.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'subtractAssetQuantity',
        validate(params, ['assetId', 'amount'])
      )
    )
  }

  public compareAndSetAccountDetail (params: CompareAndSetAccountDetail.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'compareAndSetAccountDetail',
        validate(params, ['accountId', 'key', 'value', 'oldValue'])
      )
    )
  }

  public setSettingValue (): void {
    throw new Error('Command not allowed to use')
  }

  public removePeer (params: RemovePeer.AsObject): TxBuilder {
    return new TxBuilder(
      txHelper.addCommand(
        this.tx,
        'removePeer',
        validate(params, ['publicKey'])
      )
    )
  }

  public addMeta (creatorAccountId: string, quorum: number): TxBuilder {
    return new TxBuilder(
      txHelper.addMeta(this.tx, { creatorAccountId, quorum })
    )
  }

  public sign (privateKeys): TxBuilder {
    return new TxBuilder(
      privateKeys.reduce(
        (tx, key) => txHelper.sign(tx, key),
        this.tx
      )
    )
  }

  public send (commandService, timeoutLimit = 5000, statusesList = []) {
    return sendTransactions(
      [this.tx],
      commandService,
      timeoutLimit,
      statusesList
    )
  }
}

class BatchBuilder {
  public txs: Transaction.Transaction[]

  public constructor (
    txs: Transaction.Transaction[]
  ) {
    this.txs = txs
  }

  public addTransaction (tx: Transaction.Transaction) {
    return new BatchBuilder([...this.txs, tx])
  }

  /**
   * 0 - ATOMIC
   * 1 - ORDERED
   */
  public setBatchMeta (type: number) {
    return new Chain(
      txHelper.addBatchMeta(this.txs, type)
    )
  }
}

export {
  TxBuilder,
  BatchBuilder
}
