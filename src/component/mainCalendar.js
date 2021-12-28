import React, { useState, useContext, useEffect } from 'react';
import '../css/mainCalendar.css';
// import MainCalendarOrigin from './mainCalendarOrigin'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { AuthContext, STATUS } from '../route/account/AuthContext';
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, updatePassword } from "firebase/auth";
import { config } from '../settings/firebaseConfig';
getApps().length === 0 ? initializeApp(config) : getApp();

function MainCalendar(props) {
  const auth = getAuth();
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
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [daysArray, setDaysArray] = useState([])

  //設定下一個月
  function setNextMonth(params) {
    if (currentMonth >= 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  //設定上一個月
  function setPrevMonth(params) {
    if (currentMonth <= 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  //rerender
  const [render,setRender] = useState(0)

  const readData = async () => {

    const FirstDay = new Date(currentYear, currentMonth - 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
    console.log(currentYear + "   and" + currentMonth)
    console.log(FirstDay)
    console.log(daysInMonth)


    let date = 1;
    let everydays = [];
    let weekNum = daysInMonth => {
      return Math.ceil((daysInMonth + FirstDay) / 7);
    };

    for (let i = 0; i < weekNum(daysInMonth); i++) {
      let week = [];
      let day = {
        date: '',
        count: 0
      }
      for (let j = 0; j < 7; j++) {
        let counter = 0;
        let displayMonth = currentMonth > 9 ? currentMonth : String("0" + currentMonth)
        const q = query(collection(db, "user/" + auth.currentUser.uid + "/calendar"), where("date", "==", currentYear + "/" + displayMonth + "/" + date));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          counter++
        });


        if (i === 0 && j < FirstDay) {
          day.count = counter
          week.push(day);

        } else if (date > daysInMonth) {
          day.count = counter
          week.push(day);
        } else {
          day.count = counter
          week.push({ ...day, date });
          date++;
        }

      }

      everydays.push(week);

    }

    setDaysArray([...everydays])
    setRender(1)
  }



  useEffect(() => {

    readData()
  }, [currentMonth]);




  return (
    // {render === 0?<MainCalendarOrigin/>:
      <div className='Calendarbody'>
        <table cellPadding="8">
          <thead>
            <tr >
              <td colSpan="100%" className='titleCalendar'>
                <div>
                  <span onClick={() => setPrevMonth()}><AiOutlineLeft /></span>
                  <span className='titleText'> {currentMonth}月{currentYear}年 </span>
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
            {console.log(daysArray)}
            {daysArray.map((week, i) => {
              const days = week.map((day, i) => {
                let data = { Year: currentYear, Month: currentMonth, Day: day.date }
                return (

                  <td key={i} valign="top">
                    {/*console.log(currentYear+"/"+displayMonth+"/"+day.date)*/}
                    <Link to={{
                      pathname: "/CalendarContent",
                      state: data
                    }} style={{ color: '#212121' }}>
                      {day.date}
                    </Link>
                    {day.count > 0 ? <p className='round'>{day.count}</p> : <p></p>}
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
    // }
  );
}

export default MainCalendar;