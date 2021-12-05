import React, {useState} from 'react';
import SignUp from './account/register';
import SignIn from './account/login';
import App from './App';

export default function Main() {
  const [status, setStatus] = useState("signIn");
  return (

    <div>
      {status==="signUp"?
      <SignUp setStatus={setStatus}/>
      :
      status==="signIn"?
      <SignIn setStatus={setStatus}/>
      :
      <App setStatus={setStatus}/>
      }
    </div>
  )



}