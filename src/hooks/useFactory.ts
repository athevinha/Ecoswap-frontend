import { web3 } from "../wallet/providers/web3";
import { AbiItem } from 'web3-utils';
import { abi } from "../utils/abi/PancakeFactory.json";
import { factoryAddress } from "../utils/addresses";

export default function useFactory() {
    const Factory = new web3.eth.Contract(abi as AbiItem[], factoryAddress);
    return Factory;
}