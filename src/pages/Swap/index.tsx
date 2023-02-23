import { SwapProvider } from "../../contexts/Swap";
import Container from "./Container";
import Header from "./Header";
import Input from "./Input";
import Output from "./Output";
import SwapButton from "./SwapButton";

export default function Swap() {
    return (
        <SwapProvider>
            <div className="d-flex justify-content-center align-items-center full-width" style={{ minHeight: "500px", height: "60vh" }}>
                <Container>
                    <Header />
                    <Input />
                    <Output />
                    <SwapButton />
                </Container>
            </div>
        </SwapProvider>
    )
}