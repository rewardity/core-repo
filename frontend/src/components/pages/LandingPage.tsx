import { Container, Box, Heading, Grid } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface LandingPageProps {}

export const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <Container w={"full"} centerContent>
      <Box h={"10"} />
      <Box w={"container.xl"}>
        <Heading mb={"4"}>Landing page</Heading>
        <Box h={"2"} />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}></Grid>
      </Box>
      <Link to={"/back-office"}>landing page content</Link>
    </Container>
  );
};
