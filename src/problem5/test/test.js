const { ethers } = require("ethers");
const gtbABI = require("./gtb.json");
require("dotenv").config();

const ADDR = "0x7d9c63406D2f13AFd07929aAA3254e0672FE390D";   // your contract address
const ABI = gtbABI;

const ADDRESS = "0x8dC847Af872947Ac18d5d63fA646EB65d4D99560"; // some wallet address with token balance
const TOKENS = [
  // token contract addresses
  "0x73e7218B12F146CD5bC6fe3538A2A37F022bBFE5",
  "0x714B3d65824CdD9E7Fe9E9cffE427E4Bb821cC7d",
  "0xE38168a3DF90B79Eb306D3De8341cE09dE19Cdb1",
];

// you can use your own RPC provider url (no need to deploy to mainnet)
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);

const test = async () => {
	const contract = new ethers.Contract(ADDR, ABI, provider);

	const balances = await contract.getBalances(ADDRESS, TOKENS);
	console.log(balances)
	return balances;
};

test().then(console.log);