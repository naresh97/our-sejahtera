import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Success(){
    const history = useHistory();

    return (
        <Flex
          height="100vh"
          background="teal.100"
          alignItems="center"
          justifyContent="center"
        >
          <Flex direction="column" background="white" p={12} rounded={6}>
            <Heading>Success!</Heading>
            <Text fontSize="lg">We have succesfully saved your contact! Stay safe out there!</Text>
            <Button onClick={()=>{history.push("/home")}}>Return home</Button>
          </Flex>
        </Flex>
      );
}

export default Success;