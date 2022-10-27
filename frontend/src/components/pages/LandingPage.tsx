import {
  Container,
  Box,
  Heading,
  Grid,
  Button,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import Laptop from "../../assets/laptop.png";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <>
      <Container w={"full"} centerContent>
        <Box h={"10"} />
        <Box w={"container.xl"}>
          <Box h={"100px"} />
          <Heading
            fontSize={"6xl"}
            mb={"10px"}
            lineHeight={"70px"}
            textShadow={"0 0 10px rgba(0,0,0,0.3)"}
          >
            Easy to use{" "}
            <Text display={"inline"} color={"brand.blue"}>
              loyalty tokens
            </Text>
            <br />
            for your business
          </Heading>
          <Text
            fontSize={"2xl"}
            opacity={"0.2"}
            mb={"10px"}
            fontWeight={"bold"}
          >
            Grow your business and improve{" "}
            <Text display={"inline"} color={"brand.blue"}>
              retention
            </Text>{" "}
            with loylaty tokens
          </Text>
          <Box h={"2"} />
          <Grid templateColumns="repeat(2, 1fr)" gap={6}></Grid>
          <Button
            bg={"brand.blue"}
            color={"white"}
            w={"180px"}
            py={"22px"}
            fontSize={"sm"}
            borderRadius={"10px"}
            boxShadow={"lg"}
            fontWeight={"bold"}
          >
            Try for free
          </Button>
          <Link to={"/dashboard"}>
            <Text
              ml={"40px"}
              opacity={"0.2"}
              fontSize={"lg"}
              display={"inline-block"}
              fontWeight={"bold"}
            >
              Demo
            </Text>
          </Link>
        </Box>
      </Container>
      <Box h={"60px"} />
      <Center>
        <Image src={Laptop} width={"1600px"} />
      </Center>
    </>
  );
};
