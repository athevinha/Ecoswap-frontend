import styled from "styled-components";
import Icon from "../../components/Icon";
import useToken from "../../hooks/useToken";
import { TokenOfAddress } from "../../utils/addresses";

const TokenBoxContainer = styled.div`
    width: 300px;
    padding: 20px;
    border-radius: 20px;
    background-color: #fff;
`

interface ITokenBox {
    address: string
}

const popcat = "https://popcat.click/twitter-card.jpg"
export default function TokenBox({ address }: ITokenBox ) {
    const { balance } = useToken(address);
    return (
        <TokenBoxContainer className="me-3 my-3">
            <div className="row m-0 p-0">
                <div className="col-4">
                    <Icon size="50px" src={TokenOfAddress[address].icon}/>
                </div>
                <div className="col-8 ps-3">
                    <h3>{TokenOfAddress[address].symbol}</h3>
                    <p style={{color: "#8a8a8a"}}>{TokenOfAddress[address].name}</p>
                    
                </div>
            </div>
            <p className="mt-3"><b>balance:</b> <span style={{ color: "rgb(0,95,255)"}}>{ parseFloat(balance).toFixed(4) } {TokenOfAddress[address].symbol}</span></p>
        </TokenBoxContainer>
    )
}