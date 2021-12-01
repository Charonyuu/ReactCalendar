import React from 'react';
import { BsTextLeft } from "react-icons/bs";
import '../css/Appmenu.css';

function AppMenu(props) {


    

  return (
    <div className='Menubody'>
        <div><BsTextLeft size={20}/></div>
        <div className='Logo'>行事曆</div>
    </div>
  );
}

export default AppMenu;