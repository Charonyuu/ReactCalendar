import React,{useEffect, useState} from 'react';
import '../css/calendarContent.css';
import { AiOutlineLeft,AiOutlineSwapRight} from "react-icons/ai";
import {Link} from 'react-router-dom';

//database
import {config} from '../settings/firebaseConfig';
import { getFirestore,getDocs,collection} from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth,} from "firebase/auth";
getApps().length === 0 ? initializeApp(config) : getApp();
    
function CalendarContent(props) {
  const db = getFirestore();
  const List = props.location.state || '無';
  const auth = getAuth();

  //listData
  const [listData,setlistData]=useState([]);
  useEffect(()=>{
      async function readData() {
        var date = List.Year + '/' + List.Month + '/'  + List.Day
        console.log(date)
        const querySnapshot = await getDocs(collection(db, "user" ,auth.currentUser.uid, "calendar"));
        const temp = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          if (doc.data().date === date) {
            temp.push({title:doc.data().title,time:doc.data().time, content:doc.data().content});
          }
          
        });
        console.log(temp);
        setlistData([...temp]);
      }
      readData();
      console.log(listData)
  
    },[db]); 


  return (
    <div className='CalendarContentBody'>
      <div className='Header'>
        <Link to="/" style={{textDecoration: 'none',color:'#fff'}}><AiOutlineLeft size={20}/></Link>
        <div className='Title'>行事曆</div>
      </div>
      <div className='Body'>
        <div className='DateTitle'>{List.Year}/{List.Month}/{List.Day}</div>
        {listData.map((list, index)=>
          <div key={index}>
            <div className='BigTitle'>
              <div>{list.time}</div>
              <div>{list.title}</div>
            </div>
            <div className='content'><AiOutlineSwapRight/>{list.content}</div>
          </div>
        )}
        
        
      </div>
    </div>
  );
}

export default CalendarContent;
