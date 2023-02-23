import styled from "styled-components";

interface IList {
    name: string;
    active: boolean;
    onClick?: () => void;
}


const Container: any = styled.div`
    width: 100%;
    height: 50px;
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    border-radius: 17px;
    cursor: pointer;
    font-weight: 500;

    ${(props: any) => props.active ?

        `
        background-color: #355dde;
        color: #fff;
        &:hover {}
        `
        :

        `
        background-color: transparent;
        color: #000;
        &:hover {
            background-color: rgba(100,100,100,0.1);
            color: #000;
        }
        `

    }

    


`

export default function List({ name, active, onClick }: IList) {
    return (
        <Container onClick={onClick} active={active} className="noselect">
            <div>
                {name}
            </div>
            {
                active ?
                    <div>
                        {">"}
                    </div> :
                    null
            }

        </Container>
    )
}