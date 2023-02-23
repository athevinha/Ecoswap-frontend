import styled from "styled-components";

const ContainerTop = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
`
const ContainerCenter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function LoadingTop() {
    return (
        <ContainerTop>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </ContainerTop>
    )
}
export function LoadingCenter() {
    return (
        <ContainerCenter>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </ContainerCenter>
    )
}