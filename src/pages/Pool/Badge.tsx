import styled from "styled-components";
import { BsCheckLg } from "react-icons/all";
const BadgeContainer = styled.div`
    padding: 6px 6px;
    width: fit-content;
    border-radius: 50%;
    display: flex;
    align-items: center;
`

export function VerifiedBadge() {
    return (
        <BadgeContainer
            style={{ backgroundColor: "#1259ff", color: "#fff" }}
        >
            <BsCheckLg style={{ fontSize: "14px" }} />
        </BadgeContainer>
    )
}