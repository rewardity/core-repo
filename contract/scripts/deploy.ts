import { ethers } from "hardhat";

async function main() {
  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const simpleToken = await SimpleToken.deploy("Test1", "TST", "100000000000000000000");

  await simpleToken.deployed();

  console.log("SimpleToken deployed to:", simpleToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
