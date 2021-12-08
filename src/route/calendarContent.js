import React,{useEffect, useState} from 'react';
import '../css/calendarContent.css';
import { AiOutlineLeft } from "react-icons/ai";
import {Link} from 'react-router-dom';

//database
import {config} from '../settings/firebaseConfig';
import { getFirestore,doc, setDoc,serverTimestamp} from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
getApps().length === 0 ? initializeApp(config) : getApp();
    
function CalendarContent(props) {
  const db = getFirestore();
  const List = props.location.state || '無';
  
  return (
    <div className='CalendarContentBody'>
      <div className='Header'>
        <Link to="/" style={{textDecoration: 'none',color:'#fff'}}><AiOutlineLeft size={20}/></Link>
        <div className='Title'>行事曆</div>
      </div>
      <div className='Body'>
        <div>{List.Year} {List.Month} {List.Day}</div>
        
      </div>
    </div>
  );
}

export default CalendarContent;
