import React, { useState,useEffect } from 'react';
import '../css/todolist.css';
import { BsPencilSquare,BsTrash } from "react-icons/bs";
import moment from 'moment'
import {Link} from 'react-router-dom';


//database
import {config} from '../settings/firebaseConfig';
import { getFirestore, collection, getDocs,deleteDoc,doc } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
getApps().length === 0 ? initializeApp(config) : getApp();

function Todolist(props) {
    const db = getFirestore();
    
      async function deleteTodo(ID) {
        await deleteDoc(doc(db, "todolist", ID));
        setShowBtn('hideDeleteBtn')
      }
      
    //deleteBtn
    const [showBtn,setShowBtn] = useState('hideDeleteBtn')
    function toggleBtn(params) {
      if(showBtn === 'hideDeleteBtn'){
        setShowBtn('showDeleteBtn')
      }else{
        setShowBtn('hideDeleteBtn')
      }
    }

    //listData
    const [listData,setlistData]=useState([]);
    useEffect(()=>{
        async function readData() {
          const querySnapshot = await getDocs(collection(db, "todolist"));
          const temp = [];
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            temp.push({id:doc.data().id,title:doc.data().title, content:doc.data().content,time:moment(doc.data().time.toDate()).format("YYYY/MM/DD h:mm")});
          });
          console.log(temp);
          setlistData([...temp]);
        }
        readData();
        // console.log(listData)
    
      },[db,showBtn]); 
    return (
        <div className='TodoListMenu'>
            {listData.map((list, index)=>
              <div className='todolistBar' key={index}>
                <Link to={{
                  pathname: "/TodoListContent",
                  state: list
                  }} className='todolist'  >
                    <span className='Bigtitle'>{list.title}</span> 
                    <span className='time'>{list.time}</span>
                </Link>
                <div className={showBtn} onClick={() =>{deleteTodo(list.id)}}><BsTrash className='icon' size={20}/></div>
              </div>
            )}
            <Link to={{
              pathname: "/AddTodoList",
              }} style={{color:'#fff'}}><div className='AddIcon'><BsPencilSquare size={25}/></div>
              </Link>
            <div className='DeleteIcon' onClick={toggleBtn}><BsTrash size={25}/></div>
        </div>
    );
}

export default Todolist;