import { useWeb3React } from "@web3-react/core";
import { TiSocialGithubCircular } from "react-icons/ti";
import { Button } from "../../components/Button";
import useToken from "../../hooks/useToken";
import { metamaskTransaction } from "../../hooks/useTransaction";
import useWBNB from "../../hooks/useWBNB";
import { goodgameAddress, katradeAddress, lemonAddress, routerAddress, tigraAddress, token1Address, token2Address, wbnbAddress } from "../../utils/addresses";
import { fromWei, toWei } from "../../utils/convert";

declare let window: any;

export default function DevTools() {

    const { Token: Token1 } = useToken(token1Address);
    const { Token: Token2 } = useToken(token2Address);
    const { Token: KTD } = useToken(katradeAddress);
    const { Token: LEMON } = useToken(lemonAddress);
    const { Token: GG } = useToken(goodgameAddress);
    const { Token: TIG } = useToken(tigraAddress);
    const WBNB = useWBNB(wbnbAddress);
    const { account } = useWeb3React();

    async function getBalanceOfToken1(address: string | null | undefined) {
        return alert(await Token1.methods.balanceOf(address).call());
    }
    async function getBalanceOfToken2(address: string | null | undefined) {
        return alert(await Token2.methods.balanceOf(address).call());
    }
    async function approveToken1ForRouter() {
        const encodedABI = Token1.methods.approve(routerAddress, toWei("100")).encodeABI();
        const txParams = {
            from: account,
            to: token1Address,
            data: encodedABI,
            value: "0"
        }
        window.ethereum.request({
            method: "eth_sendTransaction",
            params: [txParams]
        })
    }
    async function mintToken1() {
        const encodedABI = Token1.methods.faucet(toWei("10")).encodeABI();
        const txhash = await metamaskTransaction(account, token1Address, encodedABI, "");
        return alert(`minted 10 TK1, transaction hash is ${txhash}`);
    }
    async function mintToken2() {
        const encodedABI = Token2.methods.faucet(toWei("10")).encodeABI();
        const txhash = await metamaskTransaction(account, token2Address, encodedABI, "");
        return alert(`minted 10 TK2, transaction hash is ${txhash}`);
    }
    async function mintKTD() {
        const encodedABI = KTD.methods.faucet(toWei("10")).encodeABI();
        const txhash = await metamaskTransaction(account, katradeAddress, encodedABI, "");
        return alert(`minted 10 KTD, transaction hash is ${txhash}`);
    }
    async function mintLEMON() {
        const encodedABI = LEMON.methods.faucet(toWei("10")).encodeABI();
        const txhash = await metamaskTransaction(account, lemonAddress, encodedABI, "");
        return alert(`minted 10 LEMON, transaction hash is ${txhash}`);
    }
    async function mintGG() {
        const encodedABI = GG.methods.faucet(toWei("10")).encodeABI();
        const txhash = await metamaskTransaction(account, goodgameAddress, encodedABI, "");
        return alert(`minted 10 GG, transaction hash is ${txhash}`);
    }
    async function mintTIG() {
        const encodedABI = TIG.methods.faucet(toWei("10")).encodeABI();
        const txhash = await metamaskTransaction(account, tigraAddress, encodedABI, "");
        return alert(`minted 10 TIG, transaction hash is ${txhash}`);
    }
    
    async function wrapBNB() {
        const encodedABI = WBNB.methods.deposit().encodeABI();
        const txhash = await metamaskTransaction(account, wbnbAddress, encodedABI, "0.1");
        alert(txhash);
    }

    async function wbnbBalance() {
        alert(fromWei(await WBNB.methods.balanceOf(account).call()));
    } 

    return (
        <div>
            <h3 className="mb-5">Dev tools</h3>
            <h5>Tokens</h5>
            <hr />
            <div className="mb-5">
                <Button onClick={() => getBalanceOfToken1(account)}>balanceOf TK1</Button>
                <Button onClick={() => getBalanceOfToken2(account)}>balanceOf TK2</Button>
                {/* <Button onClick={() => approveToken1ForRouter()}>allowance TK1 {"(owner => router)"}</Button> */}
                {/* <Button>allowance TK2 {"(owner => router)"}</Button> */}
                <Button onClick={() => mintToken1()}>mint TK1</Button>
                <Button onClick={() => mintToken2()}>mint TK2</Button>
                <Button onClick={() => mintKTD()}>mint KTD</Button>
                <Button onClick={() => mintLEMON()}>mint LEMON</Button>
                <Button onClick={() => mintGG()}>mint GG</Button>
                <Button onClick={() => mintTIG()}>mint TIG</Button>

                <Button onClick={() => wrapBNB()}>Wrap 10 BNB</Button>
                <Button onClick={() => wbnbBalance()}>Balance of WBNB</Button>

                {/* <Button>approve TK1 (router)</Button> */}
                {/* <Button>approve TK2 (router)</Button> */}
            </div>
            <h5>Factory</h5>
            <hr />
            <div className="mb-5">
                <Button>init hash code</Button>
            </div>

        </div>
    )
}