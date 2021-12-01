import React from 'react';
import { BsSearch,BsPlus,BsCloudSun,BsPencilSquare } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import '../css/footerNav.css';

function FooterNav(props) {
  return (
    <div className='footerMenu'>
        <div className='footerObj' onClick={()=>props.drawer()}><span><BsCloudSun size={15}/></span><p>天氣</p></div>
        <div className='footerObj'><span><BsPencilSquare size={15}/></span><p>備忘錄</p></div>
        <div className='footerObj'><span><BsPlus size={18}/></span><p>建立</p></div>
        <div className='footerObj'><span><BsSearch size={13}/></span><p>搜尋</p></div>
        <div className='footerObj'><span><FiSettings size={15}/></span><p>設定</p></div>
    </div>
  );
}

export default FooterNav;