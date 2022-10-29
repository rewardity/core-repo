import { Box, Button, Heading, Image } from "@chakra-ui/react";

interface HighlightedInstructionProps {
  instruction: string;
  description: string;
  buttonDescription: string;
  image: string;
  buttonAction: () => void;
}

export const HighlightedInstruction: React.FC<HighlightedInstructionProps> = ({
  instruction,
  description,
  buttonDescription,
  image,
  buttonAction,
}) => {
  return (
    <Box
      boxShadow={"lg"}
      w={"800px"}
      borderRadius={"20px"}
      pt={"30px"}
      pb={"30px"}
      px={"20px"}
      background={"white"}
      opacity={"0.8"}
      my={"30px"}
      borderColor={"gray.200"}
      borderWidth={"1px"}
      display={"flex"}
    >
      <Image src={image} width={"200px"} maxHeight={"170px"} mr={"30px"} />
      <Box>
        <Heading fontSize={"xl"} mb={"15px"}>
          {instruction}
        </Heading>
        <Box color={"gray.300"} mb={"20px"}>
          {description}
        </Box>
        <Button
          bg={"brand.blue"}
          color={"white"}
          w={"140px"}
          borderRadius={"10px"}
          boxShadow={"lg"}
          fontSize={"sm"}
          onClick={buttonAction}
        >
          {buttonDescription}
        </Button>
      </Box>
    </Box>
  );
};
