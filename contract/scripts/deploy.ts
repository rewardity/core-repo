import { ethers } from "hardhat";

async function main() {
  // const SimpleToken = await ethers.getContractFactory("SimpleToken");
  // const simpleToken = await SimpleToken.deploy("Crumbs token", "CRUMBS", "10000000000000000000000");
  // await simpleToken.deployed();
  //
  // console.log("SimpleToken deployed to:", simpleToken.address);

  const CrumbsRewardManager = await ethers.getContractFactory("CrumbsRewardManager");
  const manager = await CrumbsRewardManager.deploy("0x8f6cc4b377380ed132610C03d6205c07e7ceF0aD");
  await manager.deployed();

  console.log("CrumbsRewardManager deployed to:", manager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
