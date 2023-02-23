import { InjectedConnector } from '@web3-react/injected-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1,56,96,97,1337] })
// 1 (Ethereum Mainnet), 56 (Binance Smart Chain), 96 (Ethereum Classic), 97 (Binance Smart Chain Testnet), và 1337 (Ganache Local Testnet).