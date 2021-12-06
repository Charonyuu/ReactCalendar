import React, {useContext} from 'react';
import {AuthContext, STATUS} from './account/AuthContext';
import SignUp from './account/register';
import SignIn from './account/login';
import App from './App';

export default function Main() {
  const authContext = useContext(AuthContext);
  return (

    <div>
      {(authContext.status===STATUS.toSignIn)?
      <SignIn/>
      :
      (authContext.status===STATUS.toSignUp)?
      <SignUp/>
      :
      <App/>
      }
    </div>
  )



}