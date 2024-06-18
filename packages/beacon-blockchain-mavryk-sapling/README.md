# `@mavrykdynamics/beacon-blockchain-mavryk-sapling`

This package is part of the `@mavrykdynamics/beacon-sdk` project. [Read more](https://github.com/mavryk-network/beacon-sdk)

## Introduction

This package adds support for `mavryk-sapling`, the sapling integration on the Mavryk blockchain. It can be used in combination with the `@mavrykdynamics/beacon-dapp` or `@mavrykdynamics/beacon-wallet` packages.

## Usage

```
import { DAppClient } from '@airga/beacon-dapp'
import { MavrykSaplingBlockchain } from '@airga/beacon-blockchain-mavryk-sapling'

const client = new DAppClient({
    name: 'Example DApp',
})

const mavrykSaplingBlockchain = new MavrykSaplingBlockchain()
client.addBlockchain(mavrykSaplingBlockchain)
```

Check our documentation for more information. [Documentation](https://docs.walletbeacon.io)
