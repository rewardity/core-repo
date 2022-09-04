<p align="center"><a target="_blank" href="https://devpost.com/software/rewardity"><img src="logo.png" alt="Rewardity" width="600"/></a></p>

<p align="center">DevPost showcase URL: https://devpost.com/software/rewardity</p>

##### Table of Contents
- [Description](#description)
    * [Problem](#problem)
    * [Solution](#solution)
- [Architecture and used dependencies](#architecture-and-used-dependencies)
    * [Current state](#current-state)
    * [Potential further improvements](#potential-further-improvements)

## Description
**Rewardity** is a set of **well tested** tools which can help you to set up, manage and monitor **web3 rewards** for your dApp or **adapt existing web2** project. Add collection points or loyalty bonuses to your product with ease!

### Problem
* Quite a lot of the **existing web2** applications (like Reddit for example) or **offline businesses** (like StarBucks) might have pretty standard reward or loyalty programs which they might like to **adapt for web3**. But effort for development might be quite high as well as expertise required.
* You might need to make a **new dApp** but **don't want to extra spend effort** adding "yet another reward system" yourself.

### Solution
**Rewardity** provides:
* a set of **well tested** (just check our tests + tested on **Gnosis**) smart contracts to set up a simple reward/likes/loyalty/rating etc. system.
* with a help of **Tenderly Actions** you can easily monitor your solution. Like keep track of token remains, stats and many other.
* with a help of **Tenderly Actions** as well you can easily integrate on-chain solution with more traditional backend and other services. Want to send an email once some user left a review on your platform? We are here to help!
* A small and tiny backoffice UI to test and keep track of activity on your platform. Want to manually adjust reward of some user? We can help!

## Architecture and used dependencies
### Current state
* Smart contracts are covered with plenty of unit tests.
* Smart contracts deployed and tested on **Gnosis**. Example contracts: https://blockscout-chiado.gnosistestnet.com/token/0x9f8312aFdBfB83C4859cCC4b74CEE74b2ca1ff72 and https://blockscout-chiado.gnosistestnet.com/address/0x24378a8CE7d01c586b031ceBfaA5F45de0DFb8CF
* A web backoffice application to test or adjust rewards.
* Set of action rules for **Tenderly** to monitor the solution and communicate with other services.

### Potential further improvements
* Add unique rewards (in form NFTs for example).
* Improve smart contracts. Like allow users top up of their reward balances or sell/exchange it.
* Improve UI/UX and functionality of the backoffice.