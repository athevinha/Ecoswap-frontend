import styled from "styled-components";

export const Button = styled.button`
    margin: 5px;
    height: 40px;
    background-color: transparent;
    border: solid 1px #1241ff;
    color: #1241ff;
    cursor: pointer;
    border-radius: 7px;
    padding: 0 10px;
    transition: 300ms ease;
    &:hover {
        color: #fff;
        background-color: #1241ff;
    }
`

export const BlackButton = styled.div`
    background-color: #355dde;
    width: 100%;
    height: 40px;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const DefaultBlackButton = styled.div`
    padding: 0 20px;
    background-color: #355dde;
    width: fit-content;
    height: 40px;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 300ms ease;
    &:hover {
        background-color: #4500c4;
    }
`

export const CustomButton: any = styled.div`
    padding: 0 20px;
    background-color: ${(props: any) => props.backgroundColor ? props.backgroundColor : "#000"};
    width: fit-content;
    height: 40px;
    text-align: center;
    color: ${(props: any) => props.color ? props.color : "#fff"};
    border: none;
    border-radius: 20px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 300ms ease;
    &:hover {
        background-color: #3f3f3f;
    }
`