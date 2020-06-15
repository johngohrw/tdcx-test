import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routes from './routes.js';
import {isLoggedIn} from './utils/auth';
import { notification } from 'antd';

notification.config({
  placement: 'bottomRight',
  duration: 3,
});

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          if (route.hasOwnProperty("isPublic") && route.isPublic) {
            return (
              <Route exact path={route.path} key={index}>
                {route.component}
              </Route>
            );
          }
          return (
            <PrivateRoute exact path={route.path} key={index}>
              {route.component}
            </PrivateRoute>
          );
        })}
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
