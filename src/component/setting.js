import React, {useState, useContext,useEffect} from 'react';
import {AuthContext, STATUS} from '../route/account/AuthContext';
import '../css/setting.css';

//database
import {config} from '../settings/firebaseConfig';
import { getFirestore, collection, getDoc,deleteDoc,doc } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth,updatePassword} from "firebase/auth";
getApps().length === 0 ? initializeApp(config) : getApp();

function Setting() {
    const [editable] = useState({editable:false,text:'編輯'})
    
    //Status
    const authContext = useContext(AuthContext);
    const changeStatus = function(){
        authContext.setStatus(STATUS.toSignIn);
    }


    //profile
    const auth = getAuth();
    const [userName,setuserName] = useState(auth.currentUser.displayName)
    const [location,setLocation] = useState()
    const [email,setEmail] = useState(auth.currentUser.email)
    //firestore取資料庫
    const db = getFirestore();
    useEffect(()=>{
        async function readData() {
          const ref = doc(db, "user", authContext.status);
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            // Convert to City object
            setLocation(docSnap.data().location)
            
          } else {
            console.log("No such document!");
          }

        }
        readData();
        // console.log(listData)
    
      },[db]); 


      
  //編輯
  const [password,setPassword] = useState()
  function edit(params) {
      updatePassword(auth.currentUser, password).then(() => {
        // Update successful.
      }).catch((error) => {
        // An error ocurred
        // ...
    });
  }


    


    return (
        <div className='SettingMenu'>
          <input type="text"  value={userName} onChange={e => setuserName(e.target.value)}/>
          <input type="text" placeholder='未填寫地址'  value={location} onChange={e => setLocation(e.target.value)}/>
          <input type="text"  value={email} onChange={e => setEmail(e.target.value)}/>
          <input type="password"  placeholder='設置新密碼'  value={password} onChange={e => setPassword(e.target.value)}/><span onClick={edit}>確定</span>
            <div className='editIcon' onClick={edit}>{editable.text}</div>
            <div className="logoutIcon" onClick={changeStatus}>登出</div>
        </div>
    );
}

export default Setting;