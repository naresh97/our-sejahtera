import { ChakraProvider, theme } from '@chakra-ui/react';
import { React } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import Success from './screens/SuccessScreen';
import './App.css';
import Verify from './screens/VerifyScreen';
import Scanner from './screens/ScannerScreen';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/scanner">
          <Scanner />
        </Route>
        <Route path="/verify/:id" component={Verify} />
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
