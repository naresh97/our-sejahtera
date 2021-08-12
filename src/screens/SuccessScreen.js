import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

function Success() {
  const history = useHistory();
  const [t] = useTranslation();

  return (
    <Flex
      minHeight="100vh"
      background="teal.100"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        background="white"
        mb={6}
        mt={6}
        p={12}
        rounded={6}
      >
        <Heading>Success!</Heading>
        <Text fontSize="lg">
          {t("contactSavedParagraph")}
        </Text>
        <Button
          onClick={() => {
            history.push('/home');
          }}
        >
          {t("returnHomeButtonLabel")}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Success;
