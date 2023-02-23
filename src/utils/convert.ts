import BigNumber from "bignumber.js";
import BN from "bn.js";
import { web3 } from "../wallet/providers/web3"

export const toWei = (_amount: string) => {
    return web3.utils.toWei(_amount, "ether");
}
export const fromWei = (_amount: string) => {
    return web3.utils.fromWei(_amount, "ether");
}
export const stringHexToNumber = (_hexString: string) => {
    return parseInt(_hexString, 16);
}
export const toHex = (_amount: string) => {
    return web3.utils.toHex(_amount);
}