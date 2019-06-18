import React, { useContext } from 'react';
import AuthContext from '../auth-context';

function Auth (props) {
  const auth = useContext(AuthContext);

  return <button onClick={auth.login}>Login!</button>
};

export default Auth;
