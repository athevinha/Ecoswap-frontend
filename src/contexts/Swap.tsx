import { useWeb3React } from "@web3-react/core";
import { createContext, useEffect, useState } from "react";
import useRouter from "../hooks/useRouter";
import useToken from "../hooks/useToken";
import { Tokens } from "../utils/addresses";
import { fromWei } from "../utils/convert";
import { web3 } from "../wallet/providers/web3";

const initContextValue = {
    token1: "TK1",
    token2: "",
    token1Amount: 0,
    token2Amount: 0,
    setToken1: () => { },
    setToken2: () => { },
    setToken1Amount: () => { },
    setToken2Amount: () => { },
    output: "",
    calculated: false,
    balance: ""
}
export interface ISwapContext {
    token1: string;
    token2: string;
    token1Amount: number;
    token2Amount: number;
    setToken1: React.Dispatch<React.SetStateAction<string>> | (() => void);
    setToken2: React.Dispatch<React.SetStateAction<string>> | (() => void);
    setToken1Amount: React.Dispatch<React.SetStateAction<number>> | (() => void);
    setToken2Amount: React.Dispatch<React.SetStateAction<number>> | (() => void);
    output: string;
    calculated: boolean;
    balance: string;
}

export const SwapContext = createContext<ISwapContext>(initContextValue);

export function SwapProvider({ children }: { children: any }) {

    const { account } = useWeb3React();

    const [token1, setToken1] = useState<string>("BNB");
    const [token2, setToken2] = useState<string>("");
    const [token1Amount, setToken1Amount] = useState<number>(0);
    const [token2Amount, setToken2Amount] = useState<number>(0);
    const [output, setOutput] = useState<string>("");
    const [calculated, setCalculated] = useState(false);
    const { getAmountOut } = useRouter();
    const { Token } = useToken("");

    // console.log(token1, token2);

    const [balance, setBalance] = useState("");

    const initBalance = async () => {
        if (account) {
            if (token1 !== "BNB") {
                Token.options.address = Tokens[token1].address;
                setBalance(parseFloat(fromWei(await Token.methods.balanceOf(account).call())).toFixed(4).toString());
            }
            else {
                setBalance(parseFloat(fromWei(await web3.eth.getBalance(account))).toFixed(4).toString());
            }
        }
    }
    const handleCalculateOutput = async () => {
        if (token1Amount <= 0) {
            return;
        }
        const a = await getAmountOut(
            token1Amount.toString(),
            [Tokens[token1].address, Tokens[token2].address]
        )
        setOutput(fromWei(a[1]));
        setToken2Amount(parseFloat(fromWei(a[1])));

    }


    useEffect(() => {
        initBalance();
    }, [account, token1])

    useEffect(() => {
        // console.log(token1, token1Amount, token2);
        if (token1 && token2 && token1Amount) {
            handleCalculateOutput();
            setCalculated(true)
        }
        else {
            setOutput("");
            setCalculated(false);
        }
    }, [token1, token1Amount, token2])

    return (
        <SwapContext.Provider value={{
            token1,
            token2,
            token1Amount,
            token2Amount,
            setToken1,
            setToken2,
            setToken1Amount,
            setToken2Amount,
            output,
            calculated,
            balance
        }}>
            {children}
        </SwapContext.Provider>
    )
}

