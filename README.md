# Nutchanon's swap pools

This project allow users to swap BEP20 tokens with my own created tokens with the implementation of liquidity pools. Smart contracts were clonned from [PancakeSwap](https://pancakeswap.finance/) (DEX on Binance Smat Chain) which originally use [Uniswap](https://uniswap.org/). This project is running on **Binance Smart Chian Testnet** for proving about liquidity pool concepts and how it works.

## Project's structures
This project contains 3 parts
- [swap-core](https://github.com/nutchanonc/swap-core)
- [swap-periphery](https://github.com/nutchanonc/swap-periphery)
- swap-frontend (this repo)

#### swap-core
`swap-core` contains PancakeFactory, PancakePair, my own ERC20(BEP20) tokens and their interfaces.

#### swap-periphery
`swap-periphery` contains PancakeRouter, PancakeLibrary, WBNB contract and their interfaces.

#### swap-frontend
`swap-frontnend` is created by using `create-react-app`. Reactjs is used for building user interfaces and integrated with Web3js.

## User's guidelines

### Prerequisite
- MetaMask with the added Binance Smart Chain Testnet Network. You can see how to add the network at [Connecting MetaMask to Binance Smart Chain](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
- Some BNB or WBNB to trade with my tokens

### Trading
- visit [swap](https://swappoolshere.web.app/app)
- Please connect your metamask with the website by click connect button on the website.
- Check your current active network. Make sure your are on Binance Smart Chain Testnet (chainId: 97).
- Choose your input currency, output currency and enter the input amount you want to trade.
- It should show the estimate amount that you will get if their is a sufficient amount of tokens in the liquidity pool.
- press swap!

### App's screenshots
![Trading](https://github.com/nutchanonc/swap-frontend/blob/main/screenshots/Screen%20Shot%202564-10-24%20at%2013.38.18.png)
![Pools](https://github.com/nutchanonc/swap-frontend/blob/main/screenshots/Screen%20Shot%202564-10-24%20at%2013.38.33.png)
![Tokens](https://github.com/nutchanonc/swap-frontend/blob/main/screenshots/Screen%20Shot%202564-10-24%20at%2013.38.46.png)
