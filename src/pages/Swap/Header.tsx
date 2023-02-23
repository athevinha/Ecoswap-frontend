import { useWeb3React } from "@web3-react/core";
import { useContext, useEffect, useState } from "react";
import { SwapContext } from "../../contexts/Swap";
import { fromWei } from "../../utils/convert";
import { web3 } from "../../wallet/providers/web3";

const bnbIcon = "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Binance-Coin-BNB-icon.png";

export default function Header() { 
    const { balance, token1 } = useContext(SwapContext);
    return (
        <div className="full-width mt-3 ">
            <h4>Swap</h4>
            <p style={{ fontSize: "14px" }}>Trade tokens in an instant</p>
            <div className="d-flex justify-content-end align-items-center">
                <img src={bnbIcon} height={30}  className="me-1"/>
                <span style={{ fontSize: "14px"}}>{ balance ? `${balance} ${token1}` : "Getting balance.."}</span>
            </div>
            {/* <hr /> */}
        </div>
    )
} 