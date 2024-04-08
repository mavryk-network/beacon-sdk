import { BeaconBaseMessage, BeaconMessageType } from '@mavrykdynamics/beacon-types'

export interface SimulatedProofOfEventChallengeRequest extends BeaconBaseMessage {
  type: BeaconMessageType.SimulatedProofOfEventChallengeRequest
  payload: string // The payload that will be emitted.
  contractAddress: string // The contract address of the abstracted account
}
