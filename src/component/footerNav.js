import React from 'react';
import { BsSearch,BsPlus,BsCloudSun,BsPencilSquare } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import '../css/footerNav.css';

function FooterNav(props) {
  const drawer1 = 1
  const drawer2 = 2
  const drawer3 = 3
  const drawer4 = 4
  const drawer5 = 5
  return (
    <div className='footerMenu'>
        <div className='footerObj' onClick={()=>props.drawer(drawer1)}><span><BsCloudSun size={15}/></span><p>天氣</p></div>
        <div className='footerObj' onClick={()=>props.drawer(drawer2)}><span><BsPencilSquare size={15}/></span><p>備忘錄</p></div>
        <div className='footerObj' onClick={()=>props.drawer(drawer3)}><span><BsPlus size={18}/></span><p>建立</p></div>
        <div className='footerObj' onClick={()=>props.drawer(drawer4)}><span><BsSearch size={13}/></span><p>搜尋</p></div>
        <div className='footerObj' onClick={()=>props.drawer(drawer5)}><span><FiSettings size={15}/></span><p>設定</p></div>
    </div>
  );
}

export default FooterNav;