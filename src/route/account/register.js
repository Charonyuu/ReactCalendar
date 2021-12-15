import React , {useState,useContext} from 'react';
import '../../css/register.css';
import Logo from '../../images/Logo.png'
import {AuthContext, STATUS} from './AuthContext';   
//database
import { getApps, initializeApp } from "firebase/app";  
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {config} from '../../settings/firebaseConfig';
import { getFirestore,doc, setDoc,} from "firebase/firestore";
function RegisterPage(props) {
    const db = getFirestore();
    if (getApps().length===0) {
        initializeApp(config);
    }
    
    // account
    const [account, setAccount] = useState({email:"",password:"", name:"",location:""});
    const handleChange = function(e){
      setAccount({...account,[e.target.name]:e.target.value})
      console.log(account)
    }

    //SignUp
    const authContext = useContext(AuthContext);
    const handleSubmit = async function(){
        try {
          const auth = getAuth();
          const res = await createUserWithEmailAndPassword(auth, account.email, account.password);
          if (res) {
            await updateProfile(auth.currentUser,{displayName: account.name});
          }
          console.log(auth.currentUser.uid)
          authContext.setStatus(STATUS.toSignIn);
          // console.log(authContext)
          await setDoc(doc(db, "user", auth.currentUser.uid), {
            id:auth.currentUser.uid,
            userName: account.name,
            location: account.location,
          });
        }
        catch(error){
          console.log('err')
        }
        
    }
    //Status
    const changeStatus = function(){
      authContext.setStatus(STATUS.toSignIn);
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
