import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { authLogin, authLogout } from '../features/auth/authSlice';

function Login() {
  const [telegram, setTelegram] = useState(null);
  const [password, setPassword] = useState(null);
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) return <Redirect to="/home" />;

  const handleSubmit = e => {
    if (!telegram | !password) {
      toast({
        title: 'Invalid Login',
        description: 'Please fill in Telegram Username and password',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: 'Loading',
      status: 'info',
      duration: 9000,
      isClosable: true,
    });

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          telegram: telegram,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        if (response.data.authorized) {
          dispatch(authLogin());
          toast.closeAll();
          history.push('/home');
        } else {
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
        dispatch(authLogout());
        toast({
          title: 'An error occurred',
          description: 'Sorry, an error occurred on our side.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });

    e.preventDefault();
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
        <form onSubmit={handleSubmit}>
          <FormControl mb={6}>
            <FormLabel>Telegram Username:</FormLabel>
            <Input
              colorScheme="teal"
              onChange={event => setTelegram(event.target.value)}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              colorScheme="teal"
              onChange={event => setPassword(event.target.value)}
            />
          </FormControl>
          <Button mb={6} type="submit">
            Login!
          </Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
