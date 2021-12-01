import React from 'react';
import '../css/todolist.css';
import { BsPencilSquare } from "react-icons/bs";

function todolist(props) {
    
    return (
        <div className='TodoListMenu'>
    
            <div className='AddIcon'><BsPencilSquare size={25}/></div>
        </div>
    );
}

export default todolist;