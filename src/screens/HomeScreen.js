import { Button, Divider, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authLogout());
    history.push("/login");
  }

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
        <Text mb={6} align="center" fontSize="lg">
          This is your QR code. Show this to others to allow them to confirm a
          contact, or allow them to create an account!
        </Text>
        <Divider mb={6} />
        <Button mb={6} onClick={()=>{history.push("/scanner");}}>Scan a QR Code</Button>
        <Divider mb={10} />
        <Button mb={6} onClick={handleLogout}>Log Out!</Button>
      </Flex>
    </Flex>
  );
}

export default Home;
