/* eslint-disable import/no-unresolved */
import React from 'react';
import { Switch } from 'react-router';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Index from './pages/Home';
import PublicRoute from './components/PublicRoute';
import './styles/main.scss';
import 'rsuite/dist/styles/rsuite-default.css';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute path="/">
          <Index />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
