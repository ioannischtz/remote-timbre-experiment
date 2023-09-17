import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alerts from './components/layout/Alerts';
import Login from './components/layout/Login';
import Experiment from './components/layout/Experiment';
import PrivateRoute from './components/PrivateRoute';
import { LOGOUT } from './actions/types';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadSession } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadSession());
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Alerts />
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/experiment" component={Experiment} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
}

export default App;
