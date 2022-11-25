import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CancelTransaction,
  ExecuteTransaction,
  NewAdmin,
  NewDelay,
  NewPendingAdmin,
  QueueTransaction
} from "../generated/nounsDAO/nounsDAO"

export function createCancelTransactionEvent(
  txHash: Bytes,
  target: Address,
  value: BigInt,
  signature: string,
  data: Bytes,
  eta: BigInt
): CancelTransaction {
  let cancelTransactionEvent = changetype<CancelTransaction>(newMockEvent())

  cancelTransactionEvent.parameters = new Array()

  cancelTransactionEvent.parameters.push(
    new ethereum.EventParam("txHash", ethereum.Value.fromFixedBytes(txHash))
  )
  cancelTransactionEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  cancelTransactionEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  cancelTransactionEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromString(signature))
  )
  cancelTransactionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  cancelTransactionEvent.parameters.push(
    new ethereum.EventParam("eta", ethereum.Value.fromUnsignedBigInt(eta))
  )

  return cancelTransactionEvent
}

export function createExecuteTransactionEvent(
  txHash: Bytes,
  target: Address,
  value: BigInt,
  signature: string,
  data: Bytes,
  eta: BigInt
): ExecuteTransaction {
  let executeTransactionEvent = changetype<ExecuteTransaction>(newMockEvent())

  executeTransactionEvent.parameters = new Array()

  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("txHash", ethereum.Value.fromFixedBytes(txHash))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromString(signature))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  executeTransactionEvent.parameters.push(
    new ethereum.EventParam("eta", ethereum.Value.fromUnsignedBigInt(eta))
  )

  return executeTransactionEvent
}

export function createNewAdminEvent(newAdmin: Address): NewAdmin {
  let newAdminEvent = changetype<NewAdmin>(newMockEvent())

  newAdminEvent.parameters = new Array()

  newAdminEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return newAdminEvent
}

export function createNewDelayEvent(newDelay: BigInt): NewDelay {
  let newDelayEvent = changetype<NewDelay>(newMockEvent())

  newDelayEvent.parameters = new Array()

  newDelayEvent.parameters.push(
    new ethereum.EventParam(
      "newDelay",
      ethereum.Value.fromUnsignedBigInt(newDelay)
    )
  )

  return newDelayEvent
}

export function createNewPendingAdminEvent(
  newPendingAdmin: Address
): NewPendingAdmin {
  let newPendingAdminEvent = changetype<NewPendingAdmin>(newMockEvent())

  newPendingAdminEvent.parameters = new Array()

  newPendingAdminEvent.parameters.push(
    new ethereum.EventParam(
      "newPendingAdmin",
      ethereum.Value.fromAddress(newPendingAdmin)
    )
  )

  return newPendingAdminEvent
}

export function createQueueTransactionEvent(
  txHash: Bytes,
  target: Address,
  value: BigInt,
  signature: string,
  data: Bytes,
  eta: BigInt
): QueueTransaction {
  let queueTransactionEvent = changetype<QueueTransaction>(newMockEvent())

  queueTransactionEvent.parameters = new Array()

  queueTransactionEvent.parameters.push(
    new ethereum.EventParam("txHash", ethereum.Value.fromFixedBytes(txHash))
  )
  queueTransactionEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromAddress(target))
  )
  queueTransactionEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  queueTransactionEvent.parameters.push(
    new ethereum.EventParam("signature", ethereum.Value.fromString(signature))
  )
  queueTransactionEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )
  queueTransactionEvent.parameters.push(
    new ethereum.EventParam("eta", ethereum.Value.fromUnsignedBigInt(eta))
  )

  return queueTransactionEvent
}
