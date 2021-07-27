import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../features/auth/authSlice';

function QRCode() {
  const [url, setURL] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/code`, { withCredentials: true })
      .then(response => {
        if (!response.data.error) {
          setURL(response.data.data);
        }
      })
      .catch(err => {
        if(!err.response){
          console.log("No response... Strange");
        }else if (err.response.status === 401) {
          dispatch(authLogout());
        }
      });
  }, [dispatch]);

  if (url) {
    return <Image src={url} />;
  } else {
    return <Spinner />;
  }
}

function Home() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <Flex
      height="100vh"
      background="teal.100"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        background="white"
        p={12}
        rounded={6}
        id="QRFlex"
      >
        <QRCode />
        <Text align="center" fontSize="lg">
          This is your QR code. Show this to others to allow them to confirm a
          contact, or allow them to create an account!
        </Text>
      </Flex>
    </Flex>
  );
}

export default Home;
