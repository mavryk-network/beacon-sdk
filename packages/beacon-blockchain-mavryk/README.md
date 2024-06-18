# `@mavrykdynamics/beacon-blockchain-mavryk`

This package is part of the `@mavrykdynamics/beacon-sdk` project. [Read more](https://github.com/mavryk-network/beacon-sdk)

## Introduction

This package adds support for the `mavryk` blockchain. It can be used in combination with the `@mavrykdynamics/beacon-dapp` or `@mavrykdynamics/beacon-wallet` packages.

## Usage

```
import { DAppClient } from '@airga/beacon-dapp'
import { MavrykBlockchain } from '@airga/beacon-blockchain-mavryk'

const client = new DAppClient({
    name: 'Example DApp',
})

const mavrykBlockchain = new MavrykBlockchain()
client.addBlockchain(mavrykBlockchain)
```

Check our documentation for more information. [Documentation](https://docs.walletbeacon.io)
