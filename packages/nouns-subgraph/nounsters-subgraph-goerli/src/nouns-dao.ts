import {
  CancelTransaction as CancelTransactionEvent,
  ExecuteTransaction as ExecuteTransactionEvent,
  NewAdmin as NewAdminEvent,
  NewDelay as NewDelayEvent,
  NewPendingAdmin as NewPendingAdminEvent,
  QueueTransaction as QueueTransactionEvent
} from "../generated/nounsDAO/nounsDAO"
import {
  CancelTransaction,
  ExecuteTransaction,
  NewAdmin,
  NewDelay,
  NewPendingAdmin,
  QueueTransaction
} from "../generated/schema"

export function handleCancelTransaction(event: CancelTransactionEvent): void {
  let entity = new CancelTransaction(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.params.txHash
  entity.target = event.params.target
  entity.value = event.params.value
  entity.signature = event.params.signature
  entity.data = event.params.data
  entity.eta = event.params.eta
  entity.save()
}

export function handleExecuteTransaction(event: ExecuteTransactionEvent): void {
  let entity = new ExecuteTransaction(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.params.txHash
  entity.target = event.params.target
  entity.value = event.params.value
  entity.signature = event.params.signature
  entity.data = event.params.data
  entity.eta = event.params.eta
  entity.save()
}

export function handleNewAdmin(event: NewAdminEvent): void {
  let entity = new NewAdmin(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newAdmin = event.params.newAdmin
  entity.save()
}

export function handleNewDelay(event: NewDelayEvent): void {
  let entity = new NewDelay(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newDelay = event.params.newDelay
  entity.save()
}

export function handleNewPendingAdmin(event: NewPendingAdminEvent): void {
  let entity = new NewPendingAdmin(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.newPendingAdmin = event.params.newPendingAdmin
  entity.save()
}

export function handleQueueTransaction(event: QueueTransactionEvent): void {
  let entity = new QueueTransaction(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.txHash = event.params.txHash
  entity.target = event.params.target
  entity.value = event.params.value
  entity.signature = event.params.signature
  entity.data = event.params.data
  entity.eta = event.params.eta
  entity.save()
}
