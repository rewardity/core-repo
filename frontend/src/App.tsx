import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, HStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Center, Image, Input, Spacer, VStack } from "@chakra-ui/react";
import Logo from "./assets/logo2.png";
import { useUserData } from "./stores/useUserData";
import { useContracts } from "./stores/useContracts";
import { useWallet } from "./hooks/useWallet";

function App() {
  const userAddress = useUserData((state) => state.address);
  const manager = useContracts((state) => state.manager);

  const [,connectWallet] = useWallet();

  const [addReviewUserId, setAddReviewUserId] = useState("");

  const [addLikeFrom, setAddLikeFrom] = useState("");
  const [addLikeTo, setAddLikeTo] = useState("");

  const [buyId, setBuyId] = useState("");
  const [buyMembership, setBuyMembership] = useState("");

  const [withdrawId, setWithdrawId] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  const handleAddReview = async () => {
    console.log("Calling [handleAddReview]");

    if(!manager) return;

    const result = await manager.addReview(parseInt(addReviewUserId));

    console.log(result);
  };

  const handleAddLike = async () => {
    console.log("Calling [handleAddLike]");

    if(!manager) return;

    const result = await manager.addLike(
      parseInt(addLikeFrom),
      parseInt(addLikeTo)
    );

    console.log(result);
  };

  const handleWithdraw = async () => {
    console.log("Calling [handleWithdraw]");

    if(!manager) return;

    const result = await manager.withdrawTokens(
      parseInt(withdrawId),
      parseInt(withdrawAmount),
      withdrawAddress
    );

    console.log(result);
  };

  const handleBuy = async () => {
    console.log("Calling [handleBuy]");

    if(!manager) return;

    const result = await manager.buyMembership(
      parseInt(buyId),
      parseInt(buyMembership)
    );

    console.log(result);
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
          <Button onClick={() => connectWallet()} m={"20px"}>
            {userAddress ? userAddress : "Connect wallet"}
          </Button>
        </Box>
        <Box h={"80px"} />
        <Center>
          <Text fontWeight={"extrabold"} fontSize={"5xl"} textColor={"gray.700"}>
            Rewardity manager
          </Text>
        </Center>
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
