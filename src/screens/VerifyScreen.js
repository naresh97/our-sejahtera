import { Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

function Verify(props) {
  const verifyID = props.match.params.id;
  const [verifyError, setVerifyError] = useState(false);
  const history = useHistory();
  const [t] = useTranslation();

  useEffect(() => {
    if (verifyError) return;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/verify`,
        {
          id: verifyID,
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.success) {
          if (response.data.loggedIn) {
            history.push('/success');
          } else {
            history.push('/login');
          }
        }
      })
      .catch(err => {
        setVerifyError(true);
      });
  }, [verifyError, history, verifyID]);

  const errorMessage = <Text>{t('verifyingErrorParagraph')}</Text>;
  const loadingMessage = <Text>{t('verifyingParagraph')}</Text>;

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
        p={12}
        mt={6}
        mb={6}
        rounded={6}
      >
        {verifyError ? errorMessage : loadingMessage}
      </Flex>
    </Flex>
  );
}

export default Verify;
