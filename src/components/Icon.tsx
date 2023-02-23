import styled from "styled-components";

const Icon: any = styled.div`
    width: ${(props: any) => props.size};
    height: ${(props: any) => props.size};
    background-image: url(${(props: any) => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
`
export default Icon;