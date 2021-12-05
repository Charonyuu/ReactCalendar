import React,{useState} from 'react';
import '../css/todoListContent.css';
import { AiOutlineLeft } from "react-icons/ai";
import {Link} from 'react-router-dom';

//database
import {config} from '../settings/firebaseConfig';
import { getFirestore,doc, setDoc,serverTimestamp} from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
getApps().length === 0 ? initializeApp(config) : getApp();
    
function TodoListContent(props) {
  const db = getFirestore();
  const ListTitle = props.location.state || {id:'',title:'',content:'',time:''};
  const [titleText,setTitleText]=useState(ListTitle.title);
  const [contentText,setContentText]=useState(ListTitle.content);
  const [todoID,settodoID]=useState(ListTitle.id);
  if(todoID === ''){
    settodoID(titleText)
  }
  // console.log(todoID)
  // console.log(titleText)
  // console.log(contentText)

  async function addTodoList() {
    await setDoc(doc(db, "todolist", todoID), {
      id:todoID,
      title:titleText,
      content:contentText,
      time: serverTimestamp(),
    });
  }

  return (
    <div className='TodoListContentBody'>
      <div className='Header'>
        <Link to="/main" style={{textDecoration: 'none',color:'#fff'}}><AiOutlineLeft size={20} onClick={addTodoList}/></Link>
        <div className='Title'>備忘錄</div>
      </div>
      <div className='Body'>
        <div><input type="text"  value={titleText} onChange={e => setTitleText(e.target.value)}/></div>
        <div><textarea value={contentText} onChange={e => setContentText(e.target.value)}></textarea></div>
      </div>
    </div>
  );
}

export default TodoListContent;
