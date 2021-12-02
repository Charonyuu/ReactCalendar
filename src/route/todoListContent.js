import React,{useState} from 'react';
import '../css/todoListContent.css';
import { AiOutlineLeft } from "react-icons/ai";
import {Link} from 'react-router-dom';


function TodoListContent(props) {
  const ListTitle = props.location.state;
  const [titleText,setTitleText]=useState(ListTitle.title);
  const [contentText,setContentText]=useState(ListTitle.content);
  console.log(titleText)
   
  return (
    <div className='TodoListContentBody'>
      <div className='Header'>
        <Link to="/" style={{textDecoration: 'none',color:'#fff'}}><AiOutlineLeft size={20} /></Link>
        <div className='Title'>備忘錄</div>
      </div>
      <div className='Body'>
        <div><input type="text" placeholder={titleText} /></div>
        <div><textarea>{contentText}</textarea></div>
      </div>
    </div>
  );
}

export default TodoListContent;
