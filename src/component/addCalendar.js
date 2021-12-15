import React from 'react';
import '../css/addCalendar.css'


function addCalendar(props) {
    
    return (
        <div className='AddCalendarMenu'>
            <input type="text" placeholder='標題'/>
            <div>單日/多日</div>
            <div>選擇日期:</div>
            <div>選擇顏色</div>
            <div className="ColourBox">
                <div className='Colour'/><div className='Colour'/><div className='Colour'/><div className='Colour'/><div className='Colour'/>
            </div>
            
            
        </div> 
    );
}

export default addCalendar;