import { BigNumber, ethers, BigNumberish } from "ethers";
import TokenContract from "../SimpleToken.json";

// Function is later referenced with this name
const action = async (context, event) => {
  // Log so we can later see what's available in payload
  console.log(event);
  console.log("Withdrawal has been made");
  console.log("Fetching the remaining tokens...");

  const TOKEN_ADDRESS = "0x9f8312aFdBfB83C4859cCC4b74CEE74b2ca1ff72";
  const MANAGER = "0x24378a8CE7d01c586b031ceBfaA5F45de0DFb8CF";

  const contract = new ethers.Contract(TOKEN_ADDRESS, TokenContract.abi);
  const balanceOf = await contract.balanceOf(MANAGER);

  if (balanceOf.lt(BigNumber.from("100"))) {
    console.log("WARNING: Low contract balance");
    return;
  }

  console.log("INFO: Withdrawal made by a user");
};

// Function must be exported
module.exports = { action };
