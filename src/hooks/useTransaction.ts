import { toHex, toWei } from "../utils/convert";

declare let window: any;

export const metamaskTransaction = async (from: string | null | undefined, to: string | null | undefined, data: string, value?: string): Promise<string> => {
    
    if (value) console.log(toWei(value));
    const txParams = {
        from: from,
        to: to,
        data: data,
        value: value ? toHex(toWei(value)) : "0",
    }
    return await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams]
    })
    .catch((err: any) => {
        throw new Error(err);
    })
}
