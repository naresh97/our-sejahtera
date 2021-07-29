import { Button, Divider, Flex, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { authLogout } from '../features/auth/authSlice';

function Scanner() {
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();

  const [scanData, setScanData] = useState(null);

  const handleError = err => {
    console.log(err);
  };

  const handleScan = res => {
    if (res && res !== scanData) {
      setScanData(res);
    }
  };

  useEffect(() => {
    if (scanData) {
      // fucking safari on ios doesn't support lookbehind, so have to workaround with substr
      // const re = /(?<=verify\/).*$/;
      const re = /verify\/.*$/;
      const hash = re.exec(scanData);
      if (hash) {
        toast({
          title: "Checking QR code.",
          description: "Hold on, we're checking this QR code.",
          status: 'info',
          duration: 10000,
          isClosable: false
        });
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/verify`,
            {
              id: hash[0].substr(7),
            },
            { withCredentials: true }
          )
          .then(res => {
            if (res.data.success) {
              if (res.data.loggedIn) {
                toast.closeAll();
                toast({
                  title: 'Contact Succesfully Logged',
                  status: 'info',
                  duration: 2000,
                });
              } else {
                console.log('Time to logout!');
                dispatch(authLogout());
                history.push('/login');
              }
            }
          })
          .catch(e => {
            toast.closeAll();
            toast({
              title: 'Bad Verification',
              status: 'error',
              duration: 2000,
            });
          });
      }else{
        toast.closeAll();
        toast({
          title: "Bad QR code",
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }
    }
  }, [scanData, dispatch, history, toast]);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <Flex
      height="100vh"
      background="teal.100"
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="column" background="white" p={12} rounded={6}>
        <QrReader
          mb={6}
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '30vh' }}
          facingMode="environment"
        />
        <Divider mb={6} />
        <Button
          onClick={() => {
            history.push('/home');
          }}
        >
          Show my QR Code
        </Button>
      </Flex>
    </Flex>
  );
}

export default Scanner;
