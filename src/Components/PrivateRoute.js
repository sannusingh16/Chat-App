  
import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isloading } = useProfile();

  if (isloading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="fast" />
      </Container>
    );
  }

  if (!profile && !isloading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;