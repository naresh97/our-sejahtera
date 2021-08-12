import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { Fragment, React, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { authLogout } from '../features/auth/authSlice';
import { setCovidPositive } from '../features/auth/covidSlice';

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
        if (!err.response) {
          console.log('No response... Strange');
        } else if (err.response.status === 401) {
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

function ConfirmCOVIDPositiveAlertDialog() {
  const [isOpen, setOpen] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const onClose = () => {
    setOpen(false);
  };
  const showErrorToast = (errorMessage = t('defaultErrorToastDescription')) => {
    toast.closeAll();
    toast({
      title: t('errorToastTitle'),
      description: errorMessage,
      status: 'error',
      duration: 5000,
    });
  };
  const onConfirm = () => {
    toast({
      title: t('confirmingToastTitle'),
      description: t('confirmingToastDescription'),
      status: 'info',
      duration: 10000,
    });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/covid`,
        {
          setPositive: true,
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.covidPositive) {
          dispatch(setCovidPositive());
          toast.closeAll();
          toast({
            title: t('confirmedToastTitle'),
            status: 'info',
            duration: 2000,
          });
        } else {
          showErrorToast();
        }
      })
      .catch(err => {
        console.log(err);
        try {
          if (err.response.status === 401) {
            showErrorToast(t('notLoggedInToastDescription'));
            history.push('/login');
          } else {
            showErrorToast();
          }
        } catch (e) {
          showErrorToast();
        }
      });
    setOpen(false);
  };
  const cancelRef = useRef();

  return (
    <>
      <Button
        colorScheme="red"
        mb={6}
        onClick={() => {
          setOpen(true);
        }}
      >
        {t('covidPositiveReportButton')}
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              {t('covidPositiveAlertHeader')}
            </AlertDialogHeader>
            <AlertDialogBody>{t('covidPositiveAlertBody')}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                {t('confirm')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const handleLogout = () => {
    dispatch(authLogout());
    history.push('/login');
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isCovidPositive = useSelector(state => state.covid.isCovidPositive);
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/covid`,
        {},
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.covidPositive) {
          dispatch(setCovidPositive());
        }
      })
      .catch(err => {});
  }, [dispatch]);
  if (!isAuthenticated) return <Redirect to="/login" />;
  if (isCovidPositive) return <Redirect to="/lockout" />;

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
        mt={5}
        mb={5}
        rounded={6}
        id="QRFlex"
      >
        <QRCode />
        <Text mb={6} align="center" fontSize="lg">
          {t('homeExplanation')}
        </Text>
        <Divider mb={6} />
        <Button
          mb={6}
          onClick={() => {
            history.push('/scanner');
          }}
        >
          {t('scanButtonLabel')}
        </Button>
        {process.env.REACT_APP_DONATE_LINK && (
          <Fragment>
            <Divider mb={6} />
            <Link href={process.env.REACT_APP_DONATE_LINK}>
              <Button style={{ width: '100%  ' }} mb={6} colorScheme="blue">
                {t('donateButtonlabel')}
              </Button>
            </Link>
            <Text mb={6}>{t('donateButtonParagraph')}</Text>
          </Fragment>
        )}
        <Divider mb={6} />
        <ConfirmCOVIDPositiveAlertDialog />
        <Divider mb={6} />
        <Button colorScheme="blackAlpha" mb={6} onClick={handleLogout}>
          {t('logOutButtonLabel')}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Home;
