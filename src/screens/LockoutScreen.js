import { Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { authLogout } from "../features/auth/authSlice";
import { setCovidNegative, setCovidPositive } from "../features/auth/covidSlice";

function Lockout() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isCovidPositive = useSelector(state => state.covid.isCovidPositive);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/covid`, {}, { withCredentials: true })
      .then(res => {
        if (res.data.covidPositive) {
          dispatch(setCovidPositive());
        } else if (res.data.covidPositive === false) {
          dispatch(setCovidNegative());
        }
      })
      .catch(err => {
        try {
          if (err.response.status === 401) {
            dispatch(authLogout());
            history.push("/login");
          }
        }
        catch (e) { }
      });

  }, [dispatch, history]);

  if (!isAuthenticated) return <Redirect to="/login" />;
  if (!isCovidPositive) return <Redirect to="/home" />;

  return (
    <Flex
      height="100vh"
      background="red.500"
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="column" background="white" p={12} rounded={6} id="contentFlex">
        <Heading>Lockout</Heading>
        <Text>
          You have reported that you have been tested <b>POSITIVE</b> with COVID19.
          This lockout is to remind you to quarantine yourself according to local
          COVID19 health policies. This lockout will automatically be lifted after
          14 days.
          <br /><br />
          <b>Please avoid contact with other people for the duration of this lockout!</b>
        </Text>
      </Flex>
    </Flex>
  );
}

export default Lockout;