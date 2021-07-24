import {
  Button, Flex,
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
import { authLogin } from '../features/auth/authSlice';

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) return <Redirect to="/home" />;

  const handleSubmit = e => {
    if (!email | !password) {
      toast({
        title: 'Invalid Login',
        description: 'Please fill in email and password',
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
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        if (response.data.authorized) {
          dispatch(authLogin());
          history.push('/home');
        } else {
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
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              colorScheme="teal"
              onChange={event => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
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
