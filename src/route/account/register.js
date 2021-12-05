import React , {useState} from 'react';
import '../../css/register.css';
import Logo from '../../images/Logo.png'
    
//database
import { getApps, initializeApp } from "firebase/app";  
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {config} from '../../settings/firebaseConfig';

function RegisterPage(props) {
    if (getApps().length===0) {
        initializeApp(config);
    }

    // accout
    const [account, setAccount] = useState({email:"",password:"", name:"",location:""});
    const handleChange = function(e){
      setAccount({...account,[e.target.name]:e.target.value})
      console.log(account)
    }

    //SignUp
    const [message, setMessage] = useState("");
    const handleSubmit = async function(){
        try {
          const auth = getAuth();
          const res = await createUserWithEmailAndPassword(auth, account.email, account.password);
          if (res) {
            await updateProfile(auth.currentUser,{displayName: account.name,location: account.location});
          }
          setMessage("");
        }
        catch(error){
          setMessage(""+error);
        }
        console.log(message)
    }
    //Status
    const changeStatus = function(){
      props.setStatus("signIn");
    }

  return (
    <div className='RegisterBody'>
        <img src={Logo} alt="" />
        <div className="LogoText">Time Clock</div>
        <form>
            <div className="inputBox">
                <div className='inputLabel' >Name</div>
                <input type="text" name = "name"  value={account.name} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <div className='inputLabel'>Email</div>
                <input type="text" name = "email" onChange={handleChange} value={account.email}/>
            </div>
            <div className="inputBox">
                <div className='inputLabel'>Password</div>
                <input type="password" name = "password" onChange={handleChange}  value={account.password} autoComplete="current-password"/>
            </div>
            <div className="inputBox">
                <div className='inputLabel'>Location</div>
                <input type="text" name = "location" onChange={handleChange} value={account.location} />
            </div>
            <div className="btnBox">    
                <div className="Registerbtn" onClick={handleSubmit}>SignUp</div>
            </div>
        </form>
        <div className="signUpbtn">已有帳號  <span onClick={changeStatus}>立刻登入</span></div>
    </div>
  );
}

export default RegisterPage;
