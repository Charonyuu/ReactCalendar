import React,{useState} from 'react';
import './css/main.css';
import AppMenu from './component/AppMenu';
import MainCalendar from './component/mainCalendar'
import FooterNav from './component/footerNav'
import WeatherCard from './component/weatherCard'
import Todolist from './component/todolist'
import AddCalendar from './component/addCalendar'
import Search from './component/search'
import Setting from './component/setting'


function App() {
  const [drawer,setDra]=useState('CloseSidenav')
  const [drawerNumber,setDraNum]=useState(0)
  function updateDrawer(drawerNum){
    setDra('OpenSidenav')
    setDraNum(drawerNum)
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
        { drawerNumber===1?<div><span className='drawerLink'>今日天氣</span><WeatherCard/></div>:
          drawerNumber===2?<div><span className='drawerLink'>備忘錄</span><Todolist/></div>:
          drawerNumber===3?<div><span className='drawerLink'>行事曆建立</span><AddCalendar/></div>:
          drawerNumber===4?<div><span className='drawerLink'>搜尋</span><Search/></div>:
          drawerNumber===5?<div><span className='drawerLink'>設定</span><Setting/></div>:<span></span>}    
      </div>
      <div className='footer'>
        <FooterNav drawer={updateDrawer}/>
      </div>
    </div>
  );
}

export default App;
