import { goodgameAddress, katradeAddress, lemonAddress, tigraAddress, token1Address, token2Address } from "../../utils/addresses";
import TokenBox from "./TokenBox";

export default function Tokens() {
    return (
        <div>
            <h5 className="mb-3">Our Official Tokens</h5>
            <div className="d-flex flex-wrap">
                {/* <TokenBox address={token1Address}/>
                <TokenBox address={token2Address}/> */}
                <TokenBox address={katradeAddress}/>
                <TokenBox address={lemonAddress}/>
                <TokenBox address={goodgameAddress}/>
                <TokenBox address={tigraAddress}/>
            </div>
        </div>
    )
}