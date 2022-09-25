import { ethers } from "hardhat";

async function main() {
  // const SimpleToken = await ethers.getContractFactory("SimpleToken");
  // const simpleToken = await SimpleToken.deploy("Rewardity token", "REWARD", "10000000000000000000000");
  // await simpleToken.deployed();
  //
  // console.log("SimpleToken deployed to:", simpleToken.address);

  const RewardityManager = await ethers.getContractFactory("RewardityManager");
  const manager = await RewardityManager.deploy("0xD898CD70Cd157D92693aD736df7DDef4373CE6CC");
  await manager.deployed();

  console.log("RewardityManager deployed to:", manager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
