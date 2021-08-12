import { Flex, Heading, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { authLogout } from '../features/auth/authSlice';
import {
  setCovidNegative,
  setCovidPositive,
} from '../features/auth/covidSlice';

function Lockout() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isCovidPositive = useSelector(state => state.covid.isCovidPositive);
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const [t] = useTranslation();

  useEffect(() => {
    toast({
      title: t("checkingLockoutToastTitle"),
      status: 'info',
      duration: 10000,
    });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/covid`,
        {},
        { withCredentials: true }
      )
      .then(res => {
        toast.closeAll();
        if (res.data.covidPositive) {
          dispatch(setCovidPositive());
        } else if (res.data.covidPositive === false) {
          dispatch(setCovidNegative());
        }
      })
      .catch(err => {
        toast.closeAll();
        try {
          if (err.response.status === 401) {
            dispatch(authLogout());
            history.push('/login');
          } else {
            toast({
              title: t("defaultErrorToastDescription"),
              status: 'error',
              duration: 10000,
            });
          }
        } catch (e) {}
      });
  }, [dispatch, history, toast, t]);

  if (!isAuthenticated) return <Redirect to="/login" />;
  if (!isCovidPositive) return <Redirect to="/home" />;

  return (
    <Flex
      minHeight="100vh"
      background="red.500"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        background="white"
        mt={5}
        mb={5}
        p={12}
        rounded={6}
        id="contentFlex"
      >
        <Heading>{t("Lockout")}</Heading>
        <Trans i18nKey="lockoutExplanation">
        <Text>
          You have reported that you have been tested <b>POSITIVE</b> with
          COVID19. This lockout is to remind you to quarantine yourself
          according to local COVID19 health policies. This lockout will
          automatically be lifted after 14 days.
          <br />
          <br />
          <b>
            Please avoid contact with other people for the duration of this
            lockout!
          </b>
        </Text>
        </Trans>
      </Flex>
    </Flex>
  );
}

export default Lockout;
