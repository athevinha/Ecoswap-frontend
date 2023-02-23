import { AbiItem } from 'web3-utils';
import { web3 } from "../wallet/providers/web3";
import routerData from "../utils/abi/PancakeRouter01.json";
import { routerAddress } from '../utils/addresses';
import { toWei } from '../utils/convert';
import { useWeb3React } from '@web3-react/core';
import { metamaskTransaction } from './useTransaction';
import { approve, isRouterApprovedToken } from './useToken';
import { useEffect, useState } from 'react';

declare let window: any;

export default function useRouter() {

    const { account } = useWeb3React();
    const [WETH, setWETH] = useState();
    const Router = new web3.eth.Contract(routerData.abi as AbiItem[], routerAddress);

    const initWETH = async () => {
        console.log(await Router.methods.WETH().call());
        setWETH(await Router.methods.WETH().call());
    }

    useEffect(() => {
        initWETH();
    }, [])

    const addLiquidity = (
        token0Address: string,
        token1Address: string,
        amount0: string,
        amount1: string,
        min0: string,
        min1: string,
        to: string | null | undefined,
    ) => {
        const data = Router.methods.addLiquidity(
            token0Address,
            token1Address,
            toWei(amount0),
            toWei(amount1),
            toWei(min0),
            toWei(min1),
            to,
            Math.floor(Date.now() / 1000) + 60 * 10,
        ).encodeABI();

        const txParams = {
            from: to,
            to: routerAddress,
            data: data
        }

        window.ethereum.request({
            method: "eth_sendTransaction",
            params: [txParams]
        })
        .then((txhash: any) => console.log(txhash))
        .catch((err: any) => console.log(err))
    }

    const removeLiquidity = (
        token0Address: string,
        token1Address: string,
        liquidity: string,
        min0: string,
        min1: string,
        to: string | null | undefined,
    ) => {
        console.log(toWei(liquidity), toWei(min0), toWei(min1));
        const data = Router.methods.removeLiquidity(
            token0Address,
            token1Address,
            toWei(liquidity),
            toWei(min0),
            toWei(min1),
            to,
            Math.floor(Date.now() / 1000) + 60 * 10,
        ).encodeABI();
        metamaskTransaction(to, routerAddress, data, "");
    }


    const swapTokenToToken = (
        amountIn: string,
        amountOutMin: string,
        path: string[],
        to: string | null | undefined,
    ) => {
        const data = Router.methods.swapExactTokensForTokens(
            toWei(amountIn),
            toWei(amountOutMin),
            path,
            to,
            Math.floor(Date.now() / 1000) + 60 * 10
        ).encodeABI();
        // approve(path[0], account, routerAddress, toWei(amountIn));
        isRouterApprovedToken(account, path[0]).then(
            () => metamaskTransaction(account, routerAddress, data, "0")
        )
        
    }

    const swapBNBToToken = (
        amountIn: string,
        amountOutMin: string,
        path: string[],
        to: string | null | undefined,
    ) => {
        const data = Router.methods.swapExactETHForTokens(
            toWei(amountOutMin),
            path,
            to,
            Math.floor(Date.now() / 1000) + 60 * 10
        ).encodeABI();
        // approve(path[0], account, routerAddress, toWei(amountIn));
        isRouterApprovedToken(account, path[0]).then(
            () => metamaskTransaction(account, routerAddress, data, amountIn)
        )
        
    }

    const getAmountOut = async (
        amountIn: string,
        path: string[],
    ) => {
        console.log(amountIn);
        console.log(path);
        return await Router.methods.getAmountsOut(
            toWei(amountIn),
            path
        ).call().catch((err: any) => console.log(err));
    }

    return {
        WETH,
        Router,
        addLiquidity,
        swapTokenToToken,
        getAmountOut,
        removeLiquidity,
        swapBNBToToken
    };
}