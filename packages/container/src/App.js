import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));
const AuthAppLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" component={AuthAppLazy} />
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
