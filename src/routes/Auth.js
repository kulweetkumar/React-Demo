import React from 'react';
import { Route  } from 'react-router-dom';
import Layout from 'components/layout/Auth';

const Auth = ({
  component: Component,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout screenProps={ScreenProps} {...props}>
        <Component {...props} />
      </Layout>
    )}
    isAuthed
  />
);
export default Auth;

