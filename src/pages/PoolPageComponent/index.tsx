import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { CustomButton, DefaultBlackButton } from "../../components/Button";
import { LoadingTop } from "../../components/Loading";
import useFactory from "../../hooks/useFactory";
import usePair from "../../hooks/usePair";
import useRouter from "../../hooks/useRouter";
import useToken, { approve } from "../../hooks/useToken";
import { routerAddress, token1Address, token2Address, TokenOfAddress, Tokens } from "../../utils/addresses";
import { fromWei } from "../../utils/convert";
import Balance from "./Balance";
import PoolHeader from "./PoolHeader";
import Reserve from "./Reserve";


interface IParams {
    pair: string;
}

declare let window: any;

export default function PoolPageComponent() {

    const { pair }: IParams = useParams();
    const [param1, param2] = pair.split("-");
    const Factory = useFactory();
    const { account } = useWeb3React();
    const { pairAddress, reserve0, reserve1, tk0, tk1, approve: approvePair } = usePair(param1, param2);
    const { addLiquidity, removeLiquidity } = useRouter();
    const { approve: approveToken1 } = useToken(tk0);
    const { approve: approveToken2 } = useToken(tk1);
    const [amount0, setAmount0] = useState("");
    const [amount1, setAmount1] = useState("");
    const [min0, setMin0] = useState("");
    const [min1, setMin1] = useState("");
    const history = useHistory();
    const { balance: balance0 } = useToken(tk0);
    const { balance: balance1 } = useToken(tk1);
    const { balance: lpBalance } = useToken(pairAddress);
    const [minRemove0, setMinRemove0] = useState("");
    const [minRemove1, setMinRemove1] = useState("");
    const [lpAmount, setLpAmount] = useState("");




    // for init pairAddress

    const handleAmount0 = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setAmount0(e.target.value);
        } catch (error) {
            //
        }
    }
    const handleAmount1 = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setAmount1(e.target.value);
        } catch (error) {
            //
        }
    }
    const handleMin0 = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setMin0(e.target.value);
        } catch (error) {
            //
        }
    }
    const handleMin1 = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setMin1(e.target.value);
        } catch (error) {
            //
        }
    }

    const handleMinRemove0 = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setMinRemove0(e.target.value);
        } catch (error) {
            //
        }
    }
    const handleMinRemove1 = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setMinRemove1(e.target.value);
        } catch (error) {
            //
        }
    }
    const handleRemoveLP = (e: any) => {
        try {
            const a = parseFloat(e.target.value);
            setLpAmount(e.target.value);
        } catch (error) {
            //
        }
    }

    const handleAddLiquidity = () => {
        if (!amount0 || !amount1 || !min0 || !min1) {
            return alert("Missing arguments")
        }
        if (parseFloat(balance0) < parseFloat(amount0) || parseFloat(balance1) < parseFloat(amount1)) {
            return alert("Insufficient balance")
        }
        approveToken1(routerAddress, amount0);
        approveToken2(routerAddress, amount1);
        addLiquidity(
            tk0,
            tk1,
            amount0,
            amount1,
            min0,
            min1,
            account
        );
    }
    const handleRemoveLiquidity = () => {
        // if (parseFloat(lpBalance) < ) {
        //     return alert("Insufficient balance")
        // }
        approvePair(routerAddress, lpAmount);
        removeLiquidity(
            tk0,
            tk1,
            lpAmount,
            minRemove0,
            minRemove1,
            account
        );
    }




    if (pairAddress === "") {
        return null;
    }
    if (pairAddress === null) {
        return (
            <h4>No pool available</h4>
        )
    }
    if (!tk0 || !tk1) {
        return (
            <LoadingTop />
        )
    }
    return (
        <>
            <DefaultBlackButton className="mt-5" onClick={() => history.push("/app")}>{"<"} Back to app</DefaultBlackButton>
            <div className="my-5"
                style={{
                    backgroundColor: "rgba(255,255,255,0.70)",
                    borderRadius: "20px",
                    minHeight: "600px",
                }}
            >
                <PoolHeader name1={param1} name2={param2} address={pairAddress} />
                {/* <h3>Pool {token1}-{token2}</h3>
            <p>pool address: {pairAddress}</p> */}
                <div style={{ padding: "20px" }}>
                    <h5 className="mt-5">Reserves</h5>
                    <div className="row m-0 p-0">
                        <Reserve
                            className="col-lg mx-2"
                            name={TokenOfAddress[tk0].name}
                            value={reserve0 ? fromWei(reserve0) : "Getting number..."}
                            symbol={TokenOfAddress[tk0].symbol}
                            ratio={parseFloat(reserve0) / (parseFloat(reserve0) + parseFloat(reserve1))}
                            theme={1}
                        // ratio={0.4}
                        />

                        <Reserve
                            className="col-lg mx-2"
                            name={TokenOfAddress[tk1].name}
                            value={reserve1 ? fromWei(reserve1) : "Getting number..."}
                            symbol={TokenOfAddress[tk1].symbol}
                            ratio={parseFloat(reserve1) / (parseFloat(reserve0) + parseFloat(reserve1))}
                            theme={2}
                        // ratio={0.6}
                        />

                    </div>

                    <div className="my-3">
                        <div className="row m-0">
                            <div className="col-lg mx-2 p-3" style={{ backgroundColor: "#fff", borderRadius: "20px", minHeight: "200px" }}>
                                <div className="p-3">
                                    <h3 className="mb-2">Liquidity</h3>
                                    <p className="mb-5" style={{ color: "#a3a3a3" }}>Add or remove liquidity from the pool.</p>
                                    <div className="row">
                                        <div className="col-4">
                                            <b>{TokenOfAddress[tk0].name}</b>
                                        </div>
                                        <div className="col-8">
                                            <input className="mx-2" onChange={handleAmount0} /><span>{TokenOfAddress[tk0].symbol}</span><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <b>{TokenOfAddress[tk1].name}</b>
                                        </div>
                                        <div className="col-8">
                                            <input className="mx-2" onChange={handleAmount1} /><span>{TokenOfAddress[tk1].symbol}</span><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <b>Minimum {TokenOfAddress[tk0].name}</b>
                                        </div>
                                        <div className="col-8">
                                            <input className="mx-2" onChange={handleMin0} /><span>{TokenOfAddress[tk0].symbol}</span><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <b>Minimum {TokenOfAddress[tk1].name}</b>
                                        </div>
                                        <div className="col-8 ">
                                            <input className="mx-2" onChange={handleMin1} /><span>{TokenOfAddress[tk1].symbol}</span><br />
                                        </div>
                                    </div>
                                    <CustomButton
                                        className="mt-3"
                                        onClick={handleAddLiquidity}
                                    >+ Add</CustomButton>





                                    <div className="row mt-5">
                                        <div className="col-4">
                                            <b>Minimum {TokenOfAddress[tk0].name}</b>
                                        </div>
                                        <div className="col-8 ">
                                            <input className="mx-2" onChange={handleMinRemove0} /><span>{TokenOfAddress[tk0].symbol}</span><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <b>Minimum {TokenOfAddress[tk1].name}</b>
                                        </div>
                                        <div className="col-8 ">
                                            <input className="mx-2" onChange={handleMinRemove1} /><span>{TokenOfAddress[tk1].symbol}</span><br />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <b>LP Token</b>
                                        </div>
                                        <div className="col-8 ">
                                            <input className="mx-2" onChange={handleRemoveLP} /><span>LP</span><br />
                                        </div>
                                    </div>
                                    <CustomButton
                                            className="mt-3"
                                            onClick={handleRemoveLiquidity}
                                        >- Remove</CustomButton>
                                </div>
                            </div>
                            <div className="col-lg mx-2 p-3" style={{ backgroundColor: "#fff", borderRadius: "20px", minHeight: "200px" }}>
                                <Balance
                                    address0={tk0}
                                    address1={tk1}
                                    symbol0={TokenOfAddress[tk0].symbol}
                                    symbol1={TokenOfAddress[tk1].symbol}
                                />
                            </div>
                        </div>
                        {/* <Button>Add liquidity</Button> */}

                    </div>



                </div>
            </div>
        </>
    )
}