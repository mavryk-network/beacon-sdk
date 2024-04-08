import { BeaconBaseMessage, BeaconMessageType } from '@mavrykdynamics/beacon-types'

export interface SimulatedProofOfEventChallengeResponse extends BeaconBaseMessage {
  type: BeaconMessageType.SimulatedProofOfEventChallengeResponse
  operationsList: string // Base64 encoded json
  errorMessage: string
}
