import React,{useState} from 'react';
import '../css/addCalendar.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddCalendar(props) {
    const [date, setDate] = useState(new Date());
    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");

    //判定單日還是多日
    const [selected1,setSelected1] = useState(0)
    const typeoOptions = ["單日", "多日"];
    function changeOption1(index) {
        console.log(index)
    }
    return (
        <div className='AddCalendarMenu'>
            <div>
                <input type="text" placeholder='標題'/>
            </div>
            <div className='typeOptionList'>
            {typeoOptions.map((option,i) => {
                {selected1 }
                return <span className='typeoption' key={i} onClick={() =>changeOption1(i)}>{option}</span>
            })}
            </div>
            <div>選擇日期:</div>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
            />
            <div>選擇顏色</div>
            <div className="ColourBox">
                <div className='Colour'/><div className='Colour'/><div className='Colour'/><div className='Colour'/><div className='Colour'/>
            </div>
            
            
        </div> 
    );
}

export default AddCalendar;