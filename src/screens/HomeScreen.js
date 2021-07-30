import { Button, Divider, Flex, Image, Link, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Fragment, React, useEffect, useState } from 'react';
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
        {
          process.env.REACT_APP_DONATE_LINK && 
          <Fragment>
          <Divider mb={6} />
          <Link href={process.env.REACT_APP_DONATE_LINK} ><Button style={{width: "100%  "}} mb={6} colorScheme="blue">Donate!</Button></Link>
          <Text mb={6}>
            Servers require money to run, and apps require labor to develop and maintain.
            You can show your support by donating what you can. Every cent counts, buy me
            my next coffee, or help pay for a month of server usage!
          </Text>
        </Fragment>
        }
        <Divider mb={6} />
        <Button colorScheme="red" mb={6} onClick={handleLogout}>Log Out!</Button>
      </Flex>
    </Flex>
  );
}

export default Home;
