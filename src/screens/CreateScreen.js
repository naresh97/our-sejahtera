import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authLogin } from '../features/auth/authSlice';

function Create() {
  const dispatch = useDispatch();
  const toast = useToast();
  const history = useHistory();

  const [telegram, setTelegram] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    if (!telegram | !password) {
      toast({
        title: 'Problem!',
        description: 'Please fill in all the fields',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/create`,
        {
          telegram: telegram,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then(response => {
        if (response.data.success) {
          dispatch(authLogin());
          history.push('/success');
        } else {
          toast({
            title: 'An error occurred',
            description: response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(e => {
        if (e.response.status === 401) {
          toast({
            title: 'Verification Error',
            description:
              "You couldn't be verified. Please try scanning the verification QR Code again.",
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
        <Heading mb={6}>Create Account</Heading>
        <Button onClick={()=>{history.push("/login");}} mb={6}>I already have an account!</Button>
        <Divider mb={6} />
        <form onSubmit={handleSubmit}>
          <FormControl mb={6}>
            <FormLabel>Telegram Username:</FormLabel>
            <Input onChange={e => setTelegram(e.target.value)} />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit">Create!</Button>
        </form>
      </Flex>
    </Flex>
  );
}

export default Create;
