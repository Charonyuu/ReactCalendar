import React from 'react';
import { BsSearch,BsTextLeft } from "react-icons/bs";
import '../css/Appmenu.css';

function AppMenu(props) {


    

  return (
    <div className='Menubody'>
        <div><BsTextLeft size={20} onClick={()=>props.drawer()}/></div>
        <div className='Logo'>行事曆</div>
    </div>
  );
}

export default AppMenu;