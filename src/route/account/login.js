import React , {useState,useContext} from 'react';
import '../../css/login.css';
import Logo from '../../images/Logo.png'
import {AuthContext, STATUS} from './AuthContext';
//firebase
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {config} from '../../settings/firebaseConfig';

function LoginPage(props) {
    if (getApps().length===0) {
        initializeApp(config);
    }

    //wrong Account or Password
    const [WarnText,setWarnText] = useState('')

    //account
    const [account, setAccount] = useState({email:"",password:"", displayName:""});
    const handleChange = function(e){
        setAccount({...account,[e.target.name]:e.target.value})
    }
    
    //SignIn
    const authContext = useContext(AuthContext);
    const handleSubmit = async function(){
        try {
          const auth = getAuth();
          const res = await signInWithEmailAndPassword(auth, account.email, account.password);
          if (res) {
            //console.log(auth.currentUser.displayName);
            authContext.setStatus(auth.lastNotifiedUid);
            // authContext.setuser(account.email)
          }
        }
        catch(error){  
          setWarnText('帳號或密碼錯誤')
        }
      }

    //Status
    const changeStatus = function(){
      authContext.setStatus(STATUS.toSignUp);
    }
  return (
    <div className='LoginBody'>
        <img src={Logo} alt="" />
        <div className="LogoText">Time Clock</div>
        <form>
            <div className="inputBox">
                <div className='inputLabel'>Account</div>
                <input type="text" placeholder='請輸入email' name = "email" value={account.email} onChange={handleChange}/>
            </div>
            <div  className="inputBox">
                <div className='inputLabel' autoComplete="current-password">Password</div>
                <input type="password" placeholder='請輸入password' name = "password" value={account.password} onChange={handleChange}/>
            </div>
            <div className='warnText'>{WarnText}</div>
            <div className="btnBox">
                <div className="loginbtn" onClick={handleSubmit}>Login</div>
            </div>
        </form>
        <div className="signUpbtn">還沒有帳號嗎?  <span onClick={changeStatus}>立刻註冊</span></div>
    </div>
  );
}

export default LoginPage;
