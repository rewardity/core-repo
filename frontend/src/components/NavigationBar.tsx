import { Box, Button, Spacer, HStack } from "@chakra-ui/react";
import React from "react";

import { useWallet } from "../hooks/useWallet";
import { useUserData } from "../stores/useUserData";

interface NavigationBarProps {}

export const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [, connectWallet] = useWallet();
  const userAddress = useUserData((state) => state.address);

  return (
    <Box
      w={"60%"}
      my={"30px"}
      mx="auto"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box fontSize={"2xl"} fontWeight={"bold"}>
        Rewardity LOGO
      </Box>
      <Spacer />
      <HStack gap={"70px"}>
        <Button fontWeight={"normal"} variant={"link"}>
          team
        </Button>
        <Button fontWeight={"normal"} variant={"link"}>
          about
        </Button>
        <Button
          bg={"brand.blue"}
          color={"white"}
          w={"140px"}
          m={"20px"}
          borderRadius={"10px"}
          boxShadow={"lg"}
          fontSize={"sm"}
          onClick={() => connectWallet()}
        >
          {userAddress ? userAddress : "login"}
        </Button>
      </HStack>
    </Box>
  );
};
