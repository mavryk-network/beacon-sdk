import { App, DesktopApp, ExtensionApp, WebApp } from 'packages/beacon-types/src/types/ui'

// TODO: Temporary build fix
export enum NetworkType {
  MAINNET = 'mainnet',
  BASENET = 'basenet', // Long running testnet
  WEEKLYNET = 'weeklynet', // Testnet, resets every week
  DAILYNET = 'dailynet', // Testnet, resets every day
  ATLASNET = 'atlasnet',
  CUSTOM = 'custom'
}

export const tezosExtensionList: ExtensionApp[] = [
  {
    key: 'spire_chrome',
    id: 'gpfndedineagiepkpinficbcbbgjoenn',
    name: 'Spire',
    shortName: 'Spire',
    color: '',
    logo: 'extension-spire.png',
    link: 'https://spirewallet.com/'
  },
  {
    key: 'temple_chrome',
    id: 'ookjlbkiijinhpmnjffcofjonbfbgaoc',
    name: 'Temple Wallet Chrome',
    shortName: 'Temple',
    color: '',
    logo: 'extension-temple.png',
    link: 'https://templewallet.com/'
  },
  {
    key: 'temple_firefox',
    id: '{34ac229e-1cf5-4e4c-8a77-988155c4360f}',
    name: 'Temple Wallet Firefox',
    shortName: 'Temple',
    color: '',
    logo: 'extension-temple.png',
    link: 'https://templewallet.com/'
  }
]

export const tezosWebList: WebApp[] = [
  {
    key: 'metamask_tezos_web',
    name: 'MetaMask',
    shortName: 'MetaMask',
    color: '',
    logo: 'web-metamask.png',
    links: {
      [NetworkType.MAINNET]: 'https://metamask.tezos.com/',
      [NetworkType.BASENET]: 'https://metamask.tezos.com/',
      [NetworkType.WEEKLYNET]: 'https://metamask.tezos.com/',
      [NetworkType.DAILYNET]: 'https://metamask.tezos.com/',
      [NetworkType.ATLASNET]: 'https://metamask.tezos.com/'
    }
  },
  {
    key: 'kukai_web',
    name: 'Kukai Wallet',
    shortName: 'Kukai',
    color: '',
    logo: 'web-kukai.png',
    supportedInteractionStandards: ['wallet_connect'],
    links: {
      [NetworkType.MAINNET]: 'https://wallet.kukai.app',
      [NetworkType.BASENET]: 'https://basenet.kukai.app',
      [NetworkType.WEEKLYNET]: 'https://weeklynet.kukai.app',
      [NetworkType.DAILYNET]: 'https://dailynet.kukai.app',
      [NetworkType.ATLASNET]: 'https://atlasnet.kukai.app'
    }
  },

  {
    key: 'tzsafe',
    name: 'TzSafe',
    shortName: 'TzSafe',
    color: 'rgb(235, 52, 72)',
    logo: 'tzsafe.svg',
    links: {
      [NetworkType.MAINNET]: 'https://tzsafe.marigold.dev',
      [NetworkType.BASENET]: 'https://ghostnet.tzsafe.marigold.dev',
      [NetworkType.WEEKLYNET]: 'https://ghostnet.tzsafe.marigold.dev',
      [NetworkType.DAILYNET]: 'https://ghostnet.tzsafe.marigold.dev',
      [NetworkType.ATLASNET]: 'https://ghostnet.tzsafe.marigold.dev'
    }
  }
]

export const tezosDesktopList: DesktopApp[] = [
  {
    key: 'infinity_wallet',
    name: 'Infinity Wallet',
    shortName: 'Infinity Wallet',
    color: 'rgb(52, 147, 218)',
    logo: 'infinity-wallet.png',
    deepLink: 'infinity://',
    downloadLink: 'https://infinitywallet.io/download'
  },
  {
    key: 'galleon_desktop',
    name: 'Galleon',
    shortName: 'Galleon',
    color: '',
    logo: 'desktop-galleon.png',
    deepLink: 'galleon://',
    downloadLink: 'https://cryptonomic.tech/galleon.html'
  },
  {
    key: 'umami_desktop',
    name: 'Umami',
    shortName: 'Umami',
    color: '',
    logo: 'desktop-umami.png',
    deepLink: 'umami://',
    downloadLink: 'https://umamiwallet.com/#download'
  },
  {
    key: 'atomex_desktop',
    name: 'Atomex Wallet',
    shortName: 'Atomex',
    color: '',
    logo: 'desktop-atomex.png',
    deepLink: 'atomex://',
    downloadLink: 'https://atomex.me/'
  }
]

export const tezosIosList: App[] = [
  {
    key: 'airgap_ios',
    name: 'AirGap Wallet',
    shortName: 'AirGap',
    color: 'rgb(4, 235, 204)',
    logo: 'ios-airgap.png',
    universalLink: 'https://wallet.airgap.it',
    deepLink: 'airgap-wallet://'
  },
  {
    key: 'plenty_wallet_ios',
    name: 'Plenty Wallet - your portal to web3 ',
    shortName: 'Plenty Wallet',
    color: '',
    logo: 'ios-plenty-wallet.png',
    universalLink: 'https://www.naan.app/',
    deepLink: 'naan://'
  },
  {
    key: 'altme_wallet',
    name: 'Altme Wallet',
    shortName: 'Altme',
    color: '',
    logo: 'altme.png',
    universalLink: 'https://app.altme.io/app/download'
  },
  {
    key: 'feralfile_app',
    name: 'Feral File - The place to experience digital art today',
    shortName: 'Feral File',
    color: 'rgb(236, 255, 12)',
    logo: 'ios-feralfile.png',
    universalLink: 'https://app.feralfile.com/apps/tezos',
    deepLink: 'autonomy-tezos://'
  },
  {
    key: 'temple_ios',
    name: 'Temple Wallet',
    shortName: 'Temple',
    color: '',
    logo: 'ios-temple.png',
    universalLink: 'https://templewallet.com',
    deepLink: 'temple://'
  },
  {
    key: 'atomex_ios',
    name: 'Atomex Wallet',
    shortName: 'Atomex',
    color: '',
    logo: 'ios-atomex.png',
    universalLink: 'https://atomex.me',
    deepLink: 'atomex://'
  },
  {
    key: 'umami_ios',
    name: 'Umami Mobile',
    shortName: 'Umami Mobile',
    color: '',
    logo: 'desktop-umami.png',
    deepLink: 'umami://',
    universalLink: 'https://umamiwallet.com/'
  },
  {
    key: 'trust_ios',
    name: 'Trust Wallet',
    shortName: 'Trust Wallet',
    color: '',
    supportedInteractionStandards: ['wallet_connect'],
    logo: 'ios-trust.png',
    universalLink: 'https://link.trustwallet.com',
    deepLink: 'trust://'
  },
  {
    key: 'exodus_mobile',
    name: 'Exodus Mobile',
    shortName: 'Exodus',
    color: '',
    logo: 'exodus.svg',
    supportedInteractionStandards: ['beacon'],
    deepLink: 'exodus://wc',
    universalLink: 'https://www.exodus.com/'
  },
  {
    key: 'kukai_ios',
    name: 'Kukai Wallet',
    shortName: 'Kukai',
    color: '',
    logo: 'web-kukai.png',
    supportedInteractionStandards: ['wallet_connect'],
    universalLink: 'https://wallet.kukai.app',
    deepLink: 'kukai://'
  },
  {
    key: 'fireblocks_ios',
    name: 'Fireblocks Wallet',
    shortName: 'Fireblocks',
    color: '',
    logo: 'ios-fireblocks.svg',
    supportedInteractionStandards: ['wallet_connect'],
    universalLink: '',
    deepLink: undefined
  }
  // {
  //   name: 'Galleon',
  //   shortName: 'Galleon',
  //   color: '',
  //   logo: 'ios-galleon.png',
  //   universalLink: 'https://cryptonomic.tech',
  //   deepLink: 'galleon://'
  // }
]
