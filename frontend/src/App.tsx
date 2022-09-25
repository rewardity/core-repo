import React, { useEffect, useState } from "react";
import "./App.css";
import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { useGlobalState } from "./useGlobal";
import { AvailableNetworks, networks } from "./networks";
import { ethers } from "ethers";
import { Image, Input, Spacer, VStack } from "@chakra-ui/react";
import { RewardityManager } from "./typechain-types";
import Logo from "./logo2.png";
import { uploadIpfs } from "./ipfs"

function App() {
  const manager = useGlobalState((state) => state.manager) as RewardityManager;
  const setProvider = useGlobalState((state) => state.setProvider);
  const setUserAddress = useGlobalState((state) => state.setUserAddress);
  const userAddress = useGlobalState((state) => state.userAddress);
  const setManager = useGlobalState((state) => state.setManager);

  const [addReviewUserId, setAddReviewUserId] = useState("");

  const [addLikeFrom, setAddLikeFrom] = useState("");
  const [addLikeTo, setAddLikeTo] = useState("");

  const [buyId, setBuyId] = useState("");
  const [buyMembership, setBuyMembership] = useState("");

  const [withdrawId, setWithdrawId] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const NFT_STORAGE_API_KEY = ""

  useEffect(() => {
    console.log(userAddress);
  }, [userAddress]);

  const handleAddReview = async () => {
    console.log("Calling [handleAddReview]");

    const result = await manager.addReview(parseInt(addReviewUserId));

    console.log(result);
  };

  const handleUploadIpfs = async (content: string) => {
    console.log("Calling [handleUploadIpfs]");

    const cid = await uploadIpfs(NFT_STORAGE_API_KEY, content)
    const ipfsLink = `https://${cid}.ipfs.nftstorage.link`;
    console.log(ipfsLink);
  };

  const handleAddLike = async () => {
    console.log("Calling [handleAddLike]");

    const result = await manager.addLike(
      parseInt(addLikeFrom),
      parseInt(addLikeTo)
    );

    console.log(result);
  };

  const handleWithdraw = async () => {
    console.log("Calling [handleWithdraw]");

    const result = await manager.withdrawTokens(
      parseInt(withdrawId),
      parseInt(withdrawAmount),
      withdrawAddress
    );

    console.log(result);
  };

  const handleBuy = async () => {
    console.log("Calling [handleBuy]");

    const result = await manager.buyMembership(
      parseInt(buyId),
      parseInt(buyMembership)
    );

    console.log(result);
  };

  const handleConnectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("Cannot find MetaMask");
      console.log("1234");

      // Switch networks
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[AvailableNetworks.CHAIDO],
          },
        ],
      });
      console.log("12345");

      // Set up wallet
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      if (!signer) throw new Error("Metamask is not connected");

      setProvider(provider);
      setUserAddress(address);
      setManager();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Box>
        <Box
          bg={"#2f5385"}
          w={"80%"}
          mx="auto"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          overflow={"hidden"}
          borderBottomRadius={"20px"}
        >
          <Image src={Logo} h={"80px"} />
          <Spacer />
          <Button onClick={() => handleConnectWallet()} m={"20px"}>
            {userAddress ? userAddress : "Connect wallet"}
          </Button>
        </Box>
        <Box h={"80px"} />
        <Text fontWeight={"extrabold"} fontSize={"5xl"} textColor={"gray.700"}>
          Rewardity manager
        </Text>
        <Box h={"30px"} />
        <Box w={"1200px"} mx={"auto"}>
          <VStack gap={"20px"} w={"full"}>
            <HStack w={"full"}>
              <Button
                padding={"30px"}
                w={"500px"}
                onClick={() => handleAddReview()}
                bg={"#2f5385"}
                color={"white"}
              >
                addReview
              </Button>
              <Input
                h={"60px"}
                onChange={(e: any) => setAddReviewUserId(e.target.value)}
                value={addReviewUserId}
              ></Input>
            </HStack>
            <HStack w={"full"}>
              <Button
                padding={"30px"}
                w={"300px"}
                onClick={() => handleAddLike()}
                bg={"#2f5385"}
                color={"white"}
              >
                addLike
              </Button>
              <Input
                h={"60px"}
                onChange={(e: any) => setAddLikeFrom(e.target.value)}
                value={addLikeFrom}
              ></Input>
              <Input
                h={"60px"}
                onChange={(e: any) => setAddLikeTo(e.target.value)}
                value={addLikeTo}
              ></Input>
            </HStack>
            <HStack w={"full"}>
              <Button
                padding={"30px"}
                w={"400px"}
                onClick={() => handleBuy()}
                bg={"#2f5385"}
                color={"white"}
              >
                buyMembership
              </Button>
              <Input
                h={"60px"}
                onChange={(e: any) => setBuyId(e.target.value)}
                value={buyId}
              ></Input>
              <Input
                h={"60px"}
                onChange={(e: any) => setBuyMembership(e.target.value)}
                value={buyMembership}
              ></Input>
            </HStack>
            <HStack>
              <Button
                padding={"30px"}
                w={"500px"}
                onClick={() => handleWithdraw()}
                bg={"#2f5385"}
                color={"white"}
              >
                withdrawTokens
              </Button>
              <Input
                h={"60px"}
                onChange={(e: any) => setWithdrawId(e.target.value)}
                value={withdrawId}
              ></Input>
              <Input
                h={"60px"}
                onChange={(e: any) => setWithdrawAmount(e.target.value)}
                value={withdrawAmount}
              ></Input>
              <Input
                h={"60px"}
                onChange={(e: any) => setWithdrawAddress(e.target.value)}
                value={withdrawAddress}
              ></Input>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </div>
  );
}

export default App;
