import { Button } from "../components/Button";
import { injected } from "../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import Pool from "./Pool";
import List from "../components/List";
import Swap from "./Swap";
import { useEffect, useState } from "react";
import AccountBar from "../components/AccountBar";
import DevTools from "./DevTools";
import Account from "./Account";
import Tokens from "./Tokens";
import Connect from "../components/Connect";

export default function Application() {

    const { activate, active, account } = useWeb3React();
    const g = useWeb3React();

    async function connect() {
        try {
            activate(injected);
        } catch (error) {
            alert("Can't connect to your wallet.");
        }
    }
    console.log(account)
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh", background: active ? "" : "#fff"}}>
            <div style={{ width: "87vw", height: "100vh", maxWidth: "2000px" }}>
                {
                    active ?

                        <HomePage />

                        :

                        <Connect connect={connect}/>
                }

            </div>
        </div>
    )
}

function HomePage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [displayComponent, setDisplayComponent] = useState<any>(null)
    useEffect(() => {
        if (selectedIndex === 0) {
            setDisplayComponent(<Swap />);
        }
        else if (selectedIndex === 1) {
            setDisplayComponent(<Pool />);
        }
        else if (selectedIndex === 3) {
            setDisplayComponent(<Tokens />);
        }
        else if (selectedIndex === 4) {
            setDisplayComponent(<DevTools />)
        }
    }, [selectedIndex])

    return (
        <>
            <AccountBar />
            <div
                className="row m-0 p-0 pe-3"
                style={{
                    backgroundColor: "rgba(255,255,255,0.70)",
                    borderRadius: "20px",
                    minHeight: "600px",
                }}>
                <div
                    className="col-2 px-3 py-5"
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "20px",
                    }}>
                    {/* menu */}
                    <div className="text-center mb-5">
                        <h4>Swap pools</h4>
                    </div>
                    <hr />
                    <List
                        name="Swap"
                        active={selectedIndex === 0}
                        onClick={() => setSelectedIndex(0)} />
                    <List
                        name="Pools"
                        active={selectedIndex === 1}
                        onClick={() => setSelectedIndex(1)} />
                    <List
                        name="Tokens"
                        active={selectedIndex === 3}
                        onClick={() => setSelectedIndex(3)} />
                    <List
                        name="Dev tools"
                        active={selectedIndex === 4}
                        onClick={() => setSelectedIndex(4)} />
                </div>

                <div className="col-10 p-5 ">
                    {
                        displayComponent
                    }
                </div>
            </div>
        </>
    )
}