import {
    Box,
    Button,
    Spacer,
    Image
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
  
  import { useWallet } from "../hooks/useWallet";
  import { useUserData } from "../stores/useUserData";
  import Logo from "../assets/logo2.png";
  
  interface NavigationBarProps {}
  
  export const NavigationBar: React.FC<NavigationBarProps> = () => {
    const [isConnecting, connectWallet, disconnectWallet] = useWallet();
    const userAddress = useUserData((state) => state.address);
  
    const location = useLocation();
    const [isHomeScreen, setIsHomescreen] = useState<Boolean>(true);
  
    useEffect(() => {
      setIsHomescreen(location.pathname === "/" ? true : false);
    }, [location]);
  
    return (
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
    );
  };