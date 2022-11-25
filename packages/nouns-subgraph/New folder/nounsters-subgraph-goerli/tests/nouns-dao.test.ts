import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { CancelTransaction } from "../generated/schema"
import { CancelTransaction as CancelTransactionEvent } from "../generated/nounsDAO/nounsDAO"
import { handleCancelTransaction } from "../src/nouns-dao"
import { createCancelTransactionEvent } from "./nouns-dao-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let txHash = Bytes.fromI32(1234567890)
    let target = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let value = BigInt.fromI32(234)
    let signature = "Example string value"
    let data = Bytes.fromI32(1234567890)
    let eta = BigInt.fromI32(234)
    let newCancelTransactionEvent = createCancelTransactionEvent(
      txHash,
      target,
      value,
      signature,
      data,
      eta
    )
    handleCancelTransaction(newCancelTransactionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CancelTransaction created and stored", () => {
    assert.entityCount("CancelTransaction", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CancelTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "txHash",
      "1234567890"
    )
    assert.fieldEquals(
      "CancelTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "target",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CancelTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "value",
      "234"
    )
    assert.fieldEquals(
      "CancelTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "signature",
      "Example string value"
    )
    assert.fieldEquals(
      "CancelTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )
    assert.fieldEquals(
      "CancelTransaction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eta",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
