import styled from "styled-components";

interface IReserve {
    name: string | undefined;
    value: string | undefined;
    symbol?: string | undefined;
    ratio?: number | undefined;
    theme?: number | undefined;
    className?: string;
}

const ReserveContainer: any = styled.div`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
    transition: 300ms ease;
`

const AmountBar: any = styled.div`
    width: ${(props: any) => !props.ratio ? 0 : props.ratio*100}%;
    max-width: 100%;
    height: 10px;
    border-radius: 5px;
    ${(props: any) => (props.theme === 1) ? 
    `
        background: rgb(33,97,255);
        background: linear-gradient(151deg, rgba(33,97,255,1) 23%, rgba(0,255,166,1) 100%);
    ` :
    `
        background: rgb(212,33,255);
        background: linear-gradient(151deg, rgba(212,33,255,1) 18%, rgba(255,0,74,1) 100%);
    `
    }
    
    margin: 10px 0;
    transition: 300ms ease;
`

export default function Reserve({ name, value, symbol, ratio, theme, className }: IReserve) {
    console.log(ratio)
    return (
        <ReserveContainer className={className}>
            <h4 className="mb-3">{symbol}<span className="ms-2"style={{ color:  "#9e9e9e", fontWeight: 500, fontSize: "16px"}}>{name}</span></h4>
            <p>available: {value} {symbol}</p>
            <AmountBar ratio={ratio} theme={theme}/>
        </ReserveContainer>
    )
}