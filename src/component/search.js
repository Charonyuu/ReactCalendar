import React from 'react';
import { BsSearch } from "react-icons/bs";
import '../css/search.css';


function Search(props) {
    
    return (
        <div className='SearchingMenu'>
            <div className='Bar'>
                <input type="text" placeholder='關鍵字' />
                <BsSearch className='Icon' size={20}/>
            </div>
        </div>
    );
}

export default Search;