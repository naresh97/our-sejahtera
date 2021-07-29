import {
  Flex, Heading, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import TelegramLoginButton from 'react-telegram-login';
import { authLogin, authLogout } from '../features/auth/authSlice';

function Login() {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) return <Redirect to="/home" />;

  const handleTelegramResponse = (response) => {
    toast({
      title: "Logging you in",
      description: "Hold on, we're logging you in.",
      status: 'info',
      duration: 10000,
      isClosable: false
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
          if(response.data.contactSuccess){
            history.push('/success');
          }else{
            history.push('/home');
          }
        } else {
          toast.closeAll();
          dispatch(authLogout());
          toast({
            title: 'An error occurred',
            description: response.data.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch(err => {
        toast.closeAll();
        if(err.response){
          if(err.response.status === 401){
            dispatch(authLogout());
            toast({
              title: 'Login Failed',
              description: 'The wrong credentials were used.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        }else{
          toast({
            title: 'An error occurred',
            description: 'Sorry, an error occurred on our side.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
        
      });
  };

  return (
    <Flex
      height="100vh"
      background="teal.100"
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="column" background="white" p={12} rounded={6}>
        <Heading size="xl" mb={6}>
          SSR Covid Tracing
        </Heading>
        <Heading size="lg" mb={4}>
          Login
        </Heading>
        <TelegramLoginButton dataOnauth={handleTelegramResponse} botName={process.env.REACT_APP_TELEGRAM_BOT_NAME} />
      </Flex>
    </Flex>
  );
}

export default Login;
