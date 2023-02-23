import { useContext, useEffect } from "react"
import { SwapContext } from "../../contexts/Swap";

export default function Output() {

    const { token1, token2, setToken2, setToken2Amount, output } = useContext(SwapContext);

    const handleSelect = (e: any) => {
        return setToken2(e.target.value);
    }
    const handleAmountChange = (e: any) => {
        return setToken2Amount(e.target.value);
    }
    useEffect(() => {
        const reset: any = document.getElementById("reset")?.click();
    }, [token2])
    return (
        <div className="d-flex align-items-center" style={{ width: "100%", minHeight: "70px", backgroundColor: "#ebedf0", margin: "20px 0", padding: "10px", borderRadius: "14px", }}>
            <div className="full-width">
                <h6 className="mb-3">To { output ? <span style={{fontSize: "12px", color: "#ff005d"}}>(Estimated)</span> : null}</h6>
                <div className="row m-0 p-0">
                    <div className="col-9 p-0">
                        <input type="number" className="swap-input full-width" placeholder="0.0" value={output} />
                    </div>
                    <div className="col-3 p-0">
                        <select className="full-width swap" onChange={handleSelect} id="select-output">
                            <option disabled={token2 ? true : false} value="" id="reset">Choose</option>
                            <option value="LEMON">LEMON</option>
                            <option value="KTD">KTD</option>
                            <option value="GG">GG</option>
                            <option value="TIG">TIG</option>
                        </select>
                    </div>
                </div>
            </div>

        </div>
    )
}