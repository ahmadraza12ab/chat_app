/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { Drawer, Button } from 'rsuite';
import { useProfile } from '../../context/profile.context';

const DashBoard = ({ onSignOut }) => {
  const { profile } = useProfile();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default DashBoard;
/*
import './components/dashboard';
*/
