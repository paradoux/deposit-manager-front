# SmartDeposit

# Description

This application was done during the [ChainLink Hackathon Fall 2022]()

## Contracts deployed on Polygon testnet Mumbai :

- VaultSortedList contract [0x86C6389cE6B243561144cD8356c94663934d127a](https://mumbai.polygonscan.com/address/0x86C6389cE6B243561144cD8356c94663934d127a)
- DeFiRouter contract [0x574ebEc067d94E4FcDbCA74DF035c562b7E816A7](https://mumbai.polygonscan.com/address/0x574ebEc067d94E4FcDbCA74DF035c562b7E816A7)
- AdminFeeCollector contract [0xECAFBCCec8fc5a50e3D896bFfDeFde0fc0b336d3](https://mumbai.polygonscan.com/address/0xECAFBCCec8fc5a50e3D896bFfDeFde0fc0b336d3)
- VaultImplementation BASE contract [0x11eb8Cec495EE5731Fc723A16E37dff4c226D324](https://mumbai.polygonscan.com/address/0x11eb8Cec495EE5731Fc723A16E37dff4c226D324)
- VaultFactory contract [0xb7449B6eBd89F8e40040FA8FDD4E587A4e5747a6](https://mumbai.polygonscan.com/address/0xb7449B6eBd89F8e40040FA8FDD4E587A4e5747a6)
- VaultListKeeper contract [0xeEa478d4Ff39Ce5f4303720756e3d50b9820849B](https://mumbai.polygonscan.com/address/0xeEa478d4Ff39Ce5f4303720756e3d50b9820849B)

## Inspiration

In many countries, flat tenants and landlords agree on a certain amount of money (called security deposit) to be given by the tenant and stored in the landlord’s or a third party’s bank account. This amount of money is returned in total or in part to the tenant at the end of the rental period if the flat didn't get damaged.

This system has multiple problems. When using a third party, both tenant and landlord need to trust the company they store the deposit to. When the deposit is just sent to the owner's bank account, the tenant still needs to trust this person. In any situations, some people in the deal are never really sure they'll see their money again. In addition to that, the process is cumbersome, especially in underprivileged parts of the world, because both parties need a bank account, because sending the funds can take long enough to threaten the conclusion of the deal, and because you might even need a clerk to oversee the whole process. Imagine having to do this for amounts smaller than in real estate, like car rentals, construction machinery rentals etc.

## What it does

Thanks to SmartDeposit, all these problems are sorted. Any owner of any item can create a Vault in which the renter will send the deposit into. At the end of the rental period, owner & renter agree on an amount to be returned and both can withdraw their funds.

## Built with

- [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
- [Hardhat](https://hardhat.org)
- [Ethers.js](https://docs.ethers.io/v5/)
- [TypeScript](https://www.typescriptlang.org)
- [Vercel](https://vercel.com/)
- [React](https://reactjs.org/)
- [Netlify Serverless Functions](https://www.netlify.com/products/functions/)

  <!-- - [Chainlink Keeper](https://docs.chain.link/docs/chainlink-automation/introduction/)
  - [TypeChain](https://github.com/dethcrypto/TypeChain) - Hooking with [Wagmi](https://github.com/wagmi-dev/wagmi) - Securing with [Mythril](https://github.com/ConsenSys/mythril) - Analyzing with [Slither](https://github.com/crytic/slither) - Coverage with [Solidity Coverage](https://github.com/sc-forks/solidity-coverage) - Linting with [Solhint](https://github.com/protofire/solhint) - Linting with [ESLint](https://eslint.org) - Formatting with [Prettier](https://prettier.io) -->

# Live demo

[SmartDeposit Live dApp](https://deposit-manager-front.vercel.app/)
