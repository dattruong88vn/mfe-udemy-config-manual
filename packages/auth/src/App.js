import React from 'react';
import { Switch, Route, BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import SignUp from './components/Signup';
import SignIn from "./components/Signin"

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin/" component={SignIn} />
            <Route path="/auth/signup/" component={SignUp} />
            <Route path="/" component={<div>Hi, I'm Home</div>} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
