import { Network, NetworkType } from '@mavrykdynamics/beacon-types'
import { BlockExplorer } from './block-explorer'

export class TzktBlockExplorer extends BlockExplorer {
  constructor(
    public readonly rpcUrls: { [key in NetworkType]: string } = {
      [NetworkType.MAINNET]: 'https://tzkt.io',
      [NetworkType.BASENET]: 'https://api.mavryk.network/basenet',
      [NetworkType.WEEKLYNET]: 'https://weeklynet.tzkt.io',
      [NetworkType.DAILYNET]: 'https://api.mavryk.network/dailynet',
      [NetworkType.ATLASNET]: 'https://api.mavryk.network/atlasnet',
      [NetworkType.CUSTOM]: 'https://api.mavryk.network/atlasnet',
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
