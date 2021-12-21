import React,{useState} from 'react';
import '../css/addCalendar.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

//firebase
import {config} from '../settings/firebaseConfig';
import { getFirestore,collection, addDoc } from "firebase/firestore"; 
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth,} from "firebase/auth";
getApps().length === 0 ? initializeApp(config) : getApp();

function AddCalendar(props) {
    const [date, setDate] = useState(new Date());
    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");

    //判定單日還是多日
    const [selected1,setSelected1] = useState(0)
    const typeoOptions = ["單日", "多日"];
    function changeOption1(index) {
        setSelected1(index)
    }

    const[title,setTitle] = useState('')
    const[time,setTime] = useState('')
    const[content,setContent] = useState('')
    const[warning,setWarning] = useState('')

    //建立
    const auth = getAuth();
    const db = getFirestore();
    async function createCalendar() {
        if(title === '' && time === '' &&  content === ''){
            setWarning('未填寫任何字')
        }else{
            const docRef = await addDoc(collection(db, "user",auth.currentUser.uid,'calendar'), {
                title: title,
                time: time,
                content: content,
                date: moment(date).format("YYYY/MM/DD"),
                
            });  
            setWarning('')
            setTitle('')
            setTime('')
            setContent('')
            props.close()
        }
       
    }

    return (
        <div className='AddCalendarMenu'>
            <div>
                <input type="text" placeholder='標題' value={title} onChange={e => setTitle(e.target.value)}/>
                <input type="text" placeholder='時間' value={time} onChange={e => setTime(e.target.value)}/>
                <input type="text" placeholder='備註' value={content} onChange={e => setContent(e.target.value)}/>
            </div>
            <div className='typeOptionList'>
            {typeoOptions.map((option,i) => {
                return <span className='typeoption' key={i} onClick={() =>changeOption1(i)}>{option}</span>
            })}
            </div>
            {selected1===0?
                <div><br/><div>選擇日期:</div><DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    onCalendarClose={handleCalendarClose}
                    onCalendarOpen={handleCalendarOpen}
                /></div>:
                <div><br/><div>選擇開始日期:</div><DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
            /><div>選擇結束日期:</div><DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
            /></div>}
            
            <div>選擇顏色</div>
            <div className="ColourBox">
                <div className='Colour'/><div className='Colour'/><div className='Colour'/><div className='Colour'/><div className='Colour'/>
            </div>
            <div className='warning'>{warning}</div>
            <div className="createBtn" onClick={createCalendar}>建立</div>
        </div> 
    );
}

export default AddCalendar;