async function main() {
  const contractFactory = await ethers.getContractFactory("GetTokenBalances");
  const contract = await contractFactory.deploy();
  console.log(`Contract Address: ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });