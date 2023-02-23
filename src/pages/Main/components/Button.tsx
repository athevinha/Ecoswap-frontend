import styled from "styled-components"

export const Button: any = styled.button`
    color: ${(props: any) => props.color ? props.color : "#fff"};
    background-color: ${(props: any) => props.backgroundColor ? props.backgroundColor : "#000"};
    height: 40px;
    display: flex;
    jsutify-content: center;
    align-items: center;
    padding: 0 15px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    margin-right: 10px;
`