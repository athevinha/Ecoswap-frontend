import { useWeb3React } from "@web3-react/core";
import { Button } from "../components/Button";
import { injected } from "../wallet/connectors";
import PoolPageComponent from "./PoolPageComponent";

export default function PoolPage() {

    const { activate, active, account } = useWeb3React();


    async function connect() {
        try {
            activate(injected);
        } catch (error) {
            alert("Can't connect to your wallet.");
        }
    }
    console.log(active)
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh" }}>
            <div style={{ width: "87vw", height: "100vh", maxWidth: "2000px" }}>
                {
                    active ?

                        <PoolPageComponent />

                        :

                        <Button onClick={
                            connect
                        }>Connect</Button>
                }

            </div>
        </div>
    )
}