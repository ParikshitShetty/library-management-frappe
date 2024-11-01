import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
// Icons
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
// Hooks
import useGetDate from '@/hooks/date/useGetDate';
// Global States
import { currentDateAtom } from '@/store/store';
// Import Json
import calendar from '@/public/calendar.json'
// Import Common Js Functions
import { currentDayGetter , dateUpdater } from '@/utils/date/dateGetter';

function DatePicker() {
  // Call the custom hook
  useGetDate();
  
  const [currentDate,setCurrentDate] = useAtom(currentDateAtom);

  const [dateObj,setDateObj] = useState({});

  // Change Handler For Input
  const dateChangeHandler = (e) => {
    setCurrentDate(e.target.value);
  }

  // Function to update the next date
  const nextDate = (updateParam) => {
    const {day,nextDay} = currentDayGetter(currentDate);

    if(updateParam === 'add'){
      nextDay.setDate(day.getDate() + 1);
    }else{
      nextDay.setDate(day.getDate() - 1);
    }

    dateUpdater(nextDay,setCurrentDate);
  } 

  // Function to open date picker
  const dateInputClickHandler = (event) =>{
    try {
      const element = document.getElementById('date-picker');
      element.showPicker();
    } catch (error) {
      alert("error opening date prompt:",error);
    }
  };

  useEffect(()=>{
    if (currentDate === '') return;
    const currentMonthObj = new Date(currentDate);
    const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
    setDateObj((prev) =>{
        return {...prev,...object,year:currentMonthObj.getFullYear(),date:currentMonthObj.getDate()}
    });
},[currentDate])

console.log("currentDate",currentDate)
  return (
    <>
      <div className="relative w-full h-full ">
        <div className=' flex justify-around items-center '>
          <span>
            <TiArrowBack 
              onClick={() =>nextDate('sub')}
              className='w-7 h-7 cursor-pointer text-black'/>
          </span> 

          <button
            className="text-gray-900 bg-white border-2 border-gray-800 w-3/5 h-12 rounded font-semibold"
            onClick={dateInputClickHandler}
            >
              {dateObj.date ?
                <>
                 {dateObj.date}&nbsp;
                 {dateObj.month}&nbsp;
                 {dateObj.year}
                </>
                :
                <>
                    Select Return Date
                </>
              }
          </button>
          <input id='date-picker' datepicker="true" type="date" value={currentDate} placeholder="Select date"
          onChange={dateChangeHandler} onClick={dateInputClickHandler}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none border border-gray-800 text-gray-900 text-sm rounded-lg ps-10 p-2.5 w-3/5 h-12 cursor-pointer"/>
          <span >
            <TiArrowForward 
              onClick={() => nextDate('add')}
              className='w-7 h-7 cursor-pointer'/>
          </span>
        </div>
      </div>
    </>
  )
}

export default DatePicker