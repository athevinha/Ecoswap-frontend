import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { token1Address } from "../../utils/addresses";
import { fromWei } from "../../utils/convert";

declare let window: any;

export default function Account() {
    const [balances, setBalances] = useState<string | null>(null)
    const { Token: Token1 } = useToken(token1Address);
    const { account } = useWeb3React();
    console.log(window.ethereum)
    const getBalance = async () => {

        const b = await Token1.methods.balanceOf(account).call();
        // console.log(b);
        setBalances(fromWei(b));
    }
    
    useEffect(() => {
        getBalance();
    }, [])
    return (
        <div>
            <h5 className="mb-5">Your account</h5>
            <p>{
                balances ?
                    `Token1: ${balances}`:
                    `Getting...`
            }</p>
        </div>
    )
}