import React, { useState, useContext } from 'react';
import '../css/mainCalendar.css';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { AuthContext, STATUS } from '../route/account/AuthContext';

function MainCalendar(props) {
  const authContext = useContext(AuthContext);
  const db = getFirestore();
  //設定月與日
  const MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const WEEKS = ["日", "一", "二", "三", "四", "五", "六"];

  //紀錄時間
  const [today] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [notes, setNotes] = useState('')
  //設定下一個月
  function setNextMonth(params) {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  //設定上一個月
  function setPrevMonth(params) {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  //weekNum計算
  const dayInMonth = (year, month) => {
    //當月第一天
    const FirstDay = new Date(year, month).getDay()
    //算當月有幾天
    const Days = 32 - new Date(year, month, 32).getDate()
    let date = 1;
    let daysInMonth = [];
    let weekNum = Days => {
      return Math.ceil((Days + FirstDay) / 7);
    };

    for (let i = 0; i < weekNum(Days); i++) {
      let week = [];
      let day = {
        date: '',
        count: 0
      }
      for (let j = 0; j < 7; j++) {
        // let counter = 0;
        // const q = query(collection(db, "user/UJaIJMxKE4O4h0BbCjLl1YCXZAI3/calendar"), where("date", "==", "2021/12/11"));

        // const querySnapshot = getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   counter++
        // });


        if (i === 0 && j < FirstDay) {
          day.count = date
          week.push(day);

        } else if (date > Days) {
          day.count = date
          week.push(day);
        } else {
          day.count = date
          week.push({ ...day, date });
          date++;
        }

      }

      daysInMonth.push(week);
    }
    console.log(daysInMonth)
    return daysInMonth;
  };




  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  console.log(firstDay + "    " + lastDay)





  //顯示畫面
  const days = dayInMonth(currentYear, currentMonth);
  const displayMonth = MONTHS[currentMonth]

  return (
    <div className='Calendarbody'>
      <table cellPadding="8">
        <thead>
          <tr >
            <td colSpan="100%" className='titleCalendar'>
              <div>
                <span onClick={() => setPrevMonth()}><AiOutlineLeft /></span>
                <span className='titleText'> {displayMonth}{currentYear} </span>
                <span onClick={() => setNextMonth()}><AiOutlineRight /></span>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>

            {WEEKS.map((title, i) => {
              return <td key={i} className='weekContent'>{title}</td>;
            })}
          </tr>

          {days.map((week, i) => {
            const days = week.map((day, i) => {
              let data = { Year: currentYear, Month: displayMonth, Day: day.date }
              return (

                <td key={i} valign="top">
                  {/*console.log(currentYear+"/"+displayMonth+"/"+day.date)*/}
                  <Link to={{
                    pathname: "/CalendarContent",
                    state: data
                  }} style={{ color: '#212121' }}>
                    {day.date}
                  </Link>
                  {(Number.isInteger(day.date)) ? <p>{day.count}個行程</p> : <p></p>}
                </td>

              );
            });
            return <tr key={i} className='CalendarContent'>{days}</tr>;
          })}
        </tbody>
        <tfoot>
          <tr ><td colSpan="100%" className='footerCalendar' ></td></tr>
        </tfoot>
      </table>
    </div>
  );
}

export default MainCalendar;