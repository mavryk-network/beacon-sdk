import { Network, NetworkType } from '@mavrykdynamics/beacon-types'
import { BlockExplorer } from './block-explorer'

export class TzktBlockExplorer extends BlockExplorer {
  constructor(
    public readonly rpcUrls: { [key in NetworkType]: string } = {
      [NetworkType.MAINNET]: 'https://api.mavryk.network',
      [NetworkType.BASENET]: 'https://basenet.api.mavryk.network',
      [NetworkType.WEEKLYNET]: 'https://weeklynet.tzkt.io',
      [NetworkType.DAILYNET]: 'https://dailynet.api.mavryk.network',
      [NetworkType.ATLASNET]: 'https://atlasnet.api.mavryk.network',
      [NetworkType.CUSTOM]: 'https://atlasnet.api.mavryk.network',
    }
  ) {
    super(rpcUrls)
  }

  public async getAddressLink(address: string, network: Network): Promise<string> {
    const blockExplorer = await this.getLinkForNetwork(network)

    return `${blockExplorer}/${address}`
  }
  public async getTransactionLink(transactionId: string, network: Network): Promise<string> {
    const blockExplorer = await this.getLinkForNetwork(network)

    return `${blockExplorer}/${transactionId}`
  }
}
