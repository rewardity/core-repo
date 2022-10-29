import {
  Container,
  Box,
  Heading,
  Grid,
  Button,
  Text,
  Image,
  Center,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

import Laptop from "../../../assets/landing-page/laptop.png";
import { HighlightedInstruction } from "./HighlightedInstruction";

import WelcomingImage from "../../../assets/landing-page/undraw_welcoming.svg";
import GrowingImage from "../../../assets/landing-page/undraw_growing.svg";
import ProgrammingImage from "../../../assets/landing-page/undraw_programming.svg";

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
        <Image src={Laptop} width={"1200px"} />
      </Center>
      <Box h={"10px"} />
      <Box w={"container.xl"} mx={"auto"}>
        <Box h={"150px"} position={"relative"}>
          <Heading
            position={"absolute"}
            fontSize={"6xl"}
            color={"gray.600"}
            bottom={"0"}
          >
            How simple is it?
          </Heading>
          <Heading
            position={"absolute"}
            fontSize={"8xl"}
            opacity={"0.05"}
            color={"gray.800"}
            bottom={"0"}
          >
            How simple is it?
          </Heading>
        </Box>
        <Box h={"60px"} />
        <Flex justifyContent={"flex-start"}>
          <HighlightedInstruction
            instruction={"1. Create your organization account"}
            description={
              "Account creation will take you a few minutes, but it will open your business to new endless oportunities. This process is free."
            }
            buttonDescription={"Login"}
            image={WelcomingImage}
            buttonAction={() => {}}
          />
        </Flex>
        <Flex justifyContent={"center"}>
          <HighlightedInstruction
            instruction={"2. Implement our simple API or use the dashboard"}
            description={
              "Rewardity provides really simple API to use our services in your application. There is also a no-code version if you are not familiar wiht programming."
            }
            buttonDescription={"Docs"}
            image={ProgrammingImage}
            buttonAction={() => {}}
          />
        </Flex>
        <Flex justifyContent={"flex-end"}>
          <HighlightedInstruction
            instruction={"3. Monitor and control your metrics"}
            description={
              "Open your dashboard and analyze metrics. Monitor your business growth and token holders"
            }
            buttonDescription={"Dashboard"}
            image={GrowingImage}
            buttonAction={() => {}}
          />
        </Flex>
      </Box>
      <Box h={"60px"} />
    </>
  );
};
