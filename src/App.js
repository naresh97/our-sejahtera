import { ChakraProvider, theme } from '@chakra-ui/react';
import { React } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import Create from './screens/CreateScreen';

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
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
