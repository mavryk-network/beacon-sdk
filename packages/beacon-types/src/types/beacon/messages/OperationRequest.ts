import { BeaconBaseMessage, BeaconMessageType, Network } from '@mavrykdynamics/beacon-types'
import { PartialMavrykOperation } from '../../mavryk/PartialMavrykOperation'

/**
 * @category Message
 */
export interface OperationRequest extends BeaconBaseMessage {
  type: BeaconMessageType.OperationRequest
  network: Network // Network on which the operation will be broadcast
  operationDetails: PartialMavrykOperation[] // Partial MavrykOperation that may lack certain information like counter and fee. Those will be added by the wallet.
  sourceAddress: string
}
