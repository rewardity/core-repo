import { ethers } from "hardhat";

async function main() {
  // const SimpleToken = await ethers.getContractFactory("SimpleToken");
  // const simpleToken = await SimpleToken.deploy("Rewardity token", "REWARD", "10000000000000000000000");
  // await simpleToken.deployed();
  //
  // console.log("SimpleToken deployed to:", simpleToken.address);

  const RewardityManager = await ethers.getContractFactory("RewardityManager");
  const manager = await RewardityManager.deploy("0x9f8312aFdBfB83C4859cCC4b74CEE74b2ca1ff72");
  await manager.deployed();

  console.log("RewardityManager deployed to:", manager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
