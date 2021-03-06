import React,{useState,useContext} from 'react';
import '../css/main.css';
import AppMenu from '../component/AppMenu';
import MainCalendar from '../component/mainCalendar'
import FooterNav from '../component/footerNav'
import WeatherCard from '../component/weatherCard'
import Todolist from '../component/todolist'
import AddCalendar from '../component/addCalendar'
import Search from '../component/search'
import Setting from '../component/setting'
import {AuthContext} from './account/AuthContext';


//firebase
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import {config} from '../settings/firebaseConfig';

function App(props) {
  const auth = getAuth();

  console.log(auth)
  //Drawer
  const [drawer,setDra]=useState('CloseSidenav')
  const [drawerNumber,setDraNum]=useState(0)
  function updateDrawer(drawerNum){
    setDra('OpenSidenav')
    setDraNum(drawerNum)
  }
  function closeDrawer(){
    setDra('CloseSidenav')
  }
  
  //Logout
  if (getApps().length===0) {

    initializeApp(config);

  }

  const logout = async function(e){
    try {
      console.log(e)
      const auth = getAuth();
      await signOut(auth);
      props.setStatus("signIn");
    }
    catch(error){
      console.log('err')
    }
  }

  


  return (
    <div className='body'>
      <AppMenu />
      <div className='main'>
        <MainCalendar/>
      </div>
      
      <div className={drawer}>
        <span className="closebtn" onClick={() => closeDrawer()}>&times;</span>
        { drawerNumber===1?<div><span className='sidenav'>今日天氣</span><WeatherCard/></div>:
          drawerNumber===2?<div><span className='sidenav'>備忘錄</span><Todolist/></div>:
          drawerNumber===3?<div><span className='sidenav'>行事曆建立</span><AddCalendar close={() => closeDrawer()}/></div>:
          drawerNumber===4?<div><span className='sidenav'>搜尋</span><Search/></div>:
          drawerNumber===5?<div><span className='sidenav'>設定</span><Setting logout={logout}/></div>:<span></span>}    
      </div>
      <div className='footer'>
        <FooterNav drawer={updateDrawer}/>
      </div>
    </div>
  );
}

export default App;
