import { ethers } from "ethers";
import swthABI from './swth.json';

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/')
const contractAddress = '0xc0ecb8499d8da2771abcbf4091db7f65158f1468';
const addresses = [
    '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
    '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
    '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'
];

async function retrieveHolders(): Promise<void> {
    const contract = new ethers.Contract(contractAddress, swthABI, provider);
    const decimals = await contract.decimals()

    for (const address of addresses) {
        const balance = await contract.balanceOf(address);
        console.log(`${address} ${addCommas(ethers.formatUnits(balance, decimals))}`);
    }
}

// formats a number string with separating commas
function addCommas(amount: string) {
    var split = amount.split(".")
    var whole = split[0]
    // remove leading zeros
    whole = whole.replace(/^0+/, '');
    if (whole === '') {
        whole = "0"
    }
    // create decimal string
    var decimal = split.length === 2
        ? "." + (split[1] || "0")
        : "";
    // add commas
    var wholeWithCommas = []
    while (whole.length > 3) {
        var commaIndex = whole.length - 3
        wholeWithCommas.unshift(whole.substring(commaIndex))
        whole = whole.substring(0, commaIndex)
    }
    wholeWithCommas.unshift(whole)
    return wholeWithCommas + decimal
}

retrieveHolders().catch(console.error);
