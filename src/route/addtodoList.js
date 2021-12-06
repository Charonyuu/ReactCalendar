import React,{useState} from 'react';
import '../css/todoListContent.css';
import { AiOutlineLeft } from "react-icons/ai";
import {Link} from 'react-router-dom';

//database
import {config} from '../settings/firebaseConfig';
import { getFirestore,doc, setDoc,serverTimestamp} from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
getApps().length === 0 ? initializeApp(config) : getApp();
    
function AddTodoList(props) {
  const db = getFirestore();

  const [titleText,setTitleText]=useState('標題');
  const [contentText,setContentText]=useState('內容');
  const [todoID,settodoID]=useState(titleText);
  // console.log(todoID)
  // console.log(titleText)
  // console.log(contentText)

  function handleTitle(e) {
    setTitleText(e.target.value)
    settodoID(e.target.value)
  }

  async function addTodoList() {
    if(titleText === '標題' && contentText === '內容'){
      console.log('nothing')
    }else{
      await setDoc(doc(db, "todolist", todoID), {
        id:todoID,
        title:titleText,
        content:contentText,
        time: serverTimestamp(),
      });
    }
  }

  return (
    <div className='TodoListContentBody'>
      <div className='Header'>
        <Link to="/" style={{textDecoration: 'none',color:'#fff'}}><AiOutlineLeft size={20} onClick={addTodoList}/></Link>
        <div className='Title'>備忘錄</div>
      </div>
      <div className='Body'>
        <div><input type="text" placeholder={titleText}  value={titleText} onChange={handleTitle}/></div>
        <div><textarea placeholder={contentText} value={contentText} onChange={e => setContentText(e.target.value)}></textarea></div>
      </div>
    </div>
  );
}

export default AddTodoList;
