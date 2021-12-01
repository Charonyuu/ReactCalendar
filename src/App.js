import React,{useState} from 'react';
import './css/main.css';
import AppMenu from './component/AppMenu';
import FooterNav from './component/footerNav'

function App() {
  const [drawer,setDra]=useState('CloseSidenav')
  function updateDrawer(){
    setDra('OpenSidenav')
  }
  function closeDrawer(){
    setDra('CloseSidenav')
  }

  return (
    <div className='body'>
      <AppMenu drawer={updateDrawer}/>
   
      <div className={drawer}>
        <span  className="closebtn" onClick={() => closeDrawer()}>&times;</span>
        <span className='drawerLink'>今日天氣</span>
      </div>
      <div className='footer'>
        <FooterNav/>
      </div>
    </div>
  );
}

export default App;
