import React,{useState} from 'react';
import './css/main.css';
import AppMenu from './component/AppMenu';
import MainCalendar from './component/mainCalendar'
import FooterNav from './component/footerNav'
import WeatherCard from './component/weatherCard'

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
      <AppMenu />
      <div className='main'>
        <MainCalendar/>
      </div>
      
      <div className={drawer}>
        <span  className="closebtn" onClick={() => closeDrawer()}>&times;</span>
        <span className='drawerLink'>今日天氣</span>
        <WeatherCard/>
      </div>
      <div className='footer'>
        <FooterNav drawer={updateDrawer}/>
      </div>
    </div>
  );
}

export default App;
