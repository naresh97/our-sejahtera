import { Divider, Flex, Heading, Link, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { React } from 'react';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import TelegramLoginButton from 'react-telegram-login';
import { authLogin, authLogout } from '../features/auth/authSlice';

function Login() {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) return <Redirect to="/home" />;

  const handleTelegramResponse = response => {
    toast({
      title: t("loggingInToastTitle"),
      description: t("loggingInToastDescription"),
      status: 'info',
      duration: 10000,
      isClosable: false,
    });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          telegramResponse: response,
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        if (response.data.authorized) {
          dispatch(authLogin());
          toast.closeAll();
          if (response.data.contactSuccess) {
            history.push('/success');
          } else {
            history.push('/home');
          }
        } else {
          toast.closeAll();
          dispatch(authLogout());
          toast({
            title: t("defaultErrorToastDescription"),
            description: response.data.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(err => {
        toast.closeAll();
        if (err.response) {
          if (err.response.status === 401) {
            dispatch(authLogout());
            toast({
              title: t("failedLoginToastTitle"),
              description: t("failedLoginToastDescription"),
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: t("errorToastTitle"),
            description: t("defaultErrorToastDescription"),
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Flex
      minHeight="100vh"
      background="teal.100"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        mt={5}
        mb={5}
        background="white"
        p={12}
        rounded={6}
        id="contentFlex"
      >
        <Heading size="xl" mb={6}>
          {t("appTitle")}
        </Heading>
        <Heading size="lg" mb={4}>
          {t("login")}
        </Heading>
        <TelegramLoginButton
          dataOnauth={handleTelegramResponse}
          botName={process.env.REACT_APP_TELEGRAM_BOT_NAME}
        />
        <Divider mb={6} mt={6} />
        <Trans i18nKey="loginPrivacyNotice">
        <Text fontSize="sm">
          <b>Privacy notes:</b> <br />
          Telegram Login allows us to verify your identity, without collecting
          any of your data. Telegram does NOT give us your phone number. The
          only piece of information stored on our server is your Telegram ID,
          this is an internal ID Number Telegram uses that is SEPARATE from your
          Telegram Username.
          <br />
          <br />
          All the code for this project is{' '}
          <Link
            color="teal.500"
            href="https://github.com/naresh97/our-sejahtera"
            isExternal
          >
            Open Source
          </Link>
          , that means anyone, including you can audit and verify that your
          information is being handled securely.
        </Text>
        </Trans>
      </Flex>
    </Flex>
  );
}

export default Login;
