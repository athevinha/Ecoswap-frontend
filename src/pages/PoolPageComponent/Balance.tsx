import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingCenter } from "../../components/Loading";
import usePair from "../../hooks/usePair";
import useToken from "../../hooks/useToken";
import { TokenOfAddress } from "../../utils/addresses";
import { fromWei } from "../../utils/convert";
import { AiFillCrown } from "react-icons/ai";

interface IBalance {
    address0: string;
    address1: string;
    symbol0: string;
    symbol1: string;
}

export default function Balance({ address0, address1, symbol0, symbol1 }: IBalance) {

    const { lpToken } = usePair(symbol0, symbol1);
    const { balanceOf: balanceOf0 } = useToken(address0);
    const { balanceOf: balanceOf1 } = useToken(address1);
    const [balance0, setBalance0] = useState("");
    const [balance1, setBalance1] = useState("");

    const init = async () => {
        const a = await balanceOf0();
        const b = await balanceOf1();
        setBalance0(a);
        setBalance1(b);
    }
    useEffect(() => {
        init();
    }, [])
    return (
        <div className="p-3">
            <h3 className="mb-4">Your token balances</h3>
            {
                (balance0 && balance1 && lpToken) ?
                    (
                        <>
                            <div className="row m-0" style={{ height: "auto" }}>
                                <div className="col m-1 p-2 px-3" style={{ ...balanceStyles, backgroundColor: "#2c5bc9" }}>
                                    <p className="text-white">{TokenOfAddress[address0].name}</p>
                                    <div className="full-width d-flex justify-content-end align-items-end mt-4">
                                        <p className="text-white" style={{ fontSize: "26px" }}>{parseFloat(fromWei(balance0)).toFixed(4)} {symbol0}</p>
                                    </div>
                                </div>
                                <div className="col m-1 p-2 px-3" style={{ ...balanceStyles, backgroundColor: "#bf0659" }}>
                                    <p className="text-white">{TokenOfAddress[address1].name}</p>
                                    <div className="full-width d-flex justify-content-end align-items-end mt-4">
                                        <p className="text-white" style={{ fontSize: "26px" }}>{parseFloat(fromWei(balance1)).toFixed(4)} {symbol1}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="full-width mt-3 d-flex justify-content-center align-items-center"
                                style={{ height: "100px", backgroundColor: "#ffac1c", borderRadius: "5px" }}
                            >
                                <AiFillCrown className="me-3 text-white" size="37px"/>
                                <h3 className="text-white">{parseFloat(fromWei(lpToken)).toFixed(4)} LP</h3>
                            </div>
                        </>
                    ) :
                    <LoadingCenter />
            }
        </div>
    )
}

const balanceStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
}