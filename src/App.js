import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.scss';

const Header = React.lazy(() => import('components/common/Header/Header'));
const Footer = React.lazy(() => import('components/common/Footer/Footer'));
const Sensors = React.lazy(() => import('pages/Sensors/Sensors'));
const Details = React.lazy(() => import('pages/Details/Details'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="page-wrapper">
          <Header />
          <div className="page-content">
          <Switch>
            <Route path="/details/:machineID" component={Details} />
            <Route path="/dashboard" component={Sensors} />
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
