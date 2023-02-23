import styled from "styled-components";
import { MdSwapHoriz } from "react-icons/all";
interface IPoolHeader {
    name1: string | undefined;
    name2: string | undefined;
    address: string | undefined;
}

const PoolHeaderContainer = styled.div`
    min-height: 300px;
    width: 100%;
    color: #fff;
    padding: 50px;
    border-radius: 20px 20px 0 0;
    background: rgb(0,95,255);
background: linear-gradient(180deg, rgba(0,95,255,1) 48%, rgba(2,73,129,1) 100%);
    display: flex;
    justify-content: end;
    align-items: end;
`

export default function PoolHeader({ name1, name2, address }: IPoolHeader) {
    return (
        <PoolHeaderContainer>
            <div className="text-end">
                <h1 className="mb-3">{name1}<MdSwapHoriz />{name2}</h1>
                <p>at: {address}</p>
            </div>
        </PoolHeaderContainer>
    )
}