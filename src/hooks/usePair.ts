import { AbiItem } from 'web3-utils';
import { web3 } from "../wallet/providers/web3";
import pairData from "../utils/abi/PancakePair.json";
import { useEffect, useState } from 'react';
import useFactory from './useFactory';
import { stringHexToNumber, toWei } from '../utils/convert';
import { Tokens } from '../utils/addresses';
import { useWeb3React } from '@web3-react/core';
import { metamaskTransaction } from './useTransaction';

export default function usePair(token1: string, token2: string) {

    const { account } = useWeb3React();
    const Factory = useFactory();
    const [pairAddress, setPairAddress] = useState<string>("");
    const [reserve0, setReserve0] = useState("");
    const [reserve1, setReserve1] = useState("");
    const [lpToken, setLp] = useState("");
    const [tk0, setTk0] = useState<string>("");
    const [tk1, setTk1] = useState<string>("");
    const Pair = new web3.eth.Contract(pairData.abi as AbiItem[], pairAddress);

    const getToken0 = async () => {
        const t0 = await Pair.methods.token0().call();
        setTk0(t0);
    }
    const getToken1 = async () => {
        const t1 = await Pair.methods.token1().call();
        setTk1(t1);
    }

    const getReserves = async () => {
        const resv: any = await Pair.methods.getReserves().call();
        const { _reserve0, _reserve1 } = resv;
        setReserve0(_reserve0);
        setReserve1(_reserve1);
    }
    const getLpToken = async () => {
        const _lp: any = await Pair.methods.balanceOf(account).call();
        setLp(_lp);
    }
    const approve = async (targetAddress: string, amount: string) => {
        const data = Pair.methods.approve(targetAddress, toWei(amount)).encodeABI();
        return await metamaskTransaction(account, pairAddress, data, "0");
    }
    

    useEffect(() => {
        const init = async () => {
            if (!pairAddress) {
                const paddr = await Factory.methods.getPair(Tokens[token1].address,Tokens[token2].address).call();
                if (stringHexToNumber(paddr) === 0) {
                    setPairAddress("");
                }
                else {
                    setPairAddress(paddr);
                }
                
            }
        }
        init();
    }, []);

    useEffect(() => {     
        if (pairAddress) {
            getToken0();
            getToken1();
            getReserves();
            getLpToken();          
        }
    }, [pairAddress]);

    return {
        Pair,
        pairAddress,
        reserve0,
        reserve1,
        lpToken,
        tk0,
        tk1,
        approve
    };
}

export const Pair = (addressToken1: string, addressToken2: string) => {
    return new web3.eth.Contract(pairData.abi as AbiItem[], )
}