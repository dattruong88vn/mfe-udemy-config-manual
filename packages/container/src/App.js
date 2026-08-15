import React, { lazy, Suspense, useState } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from "history"

import Header from './components/Header';
import Progress from './components/Progress';
import { useEffect } from 'react';

const DashboardAppLazy = lazy(() => import("./components/DashboardApp"));
const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));
const AuthAppLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header onSignOut={() => setIsSignedIn(false)} signedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthAppLazy onSignIn={() => { setIsSignedIn(true) }} />
            </Route>
            <Route path="/dashboard" >
              {!isSignedIn && <Redirect to={"/"} />}
              <DashboardAppLazy />
            </Route>
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
