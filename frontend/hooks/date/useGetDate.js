

import React, { useEffect, useRef } from 'react'
import { useAtom } from 'jotai';
// Global state
import { currentDateAtom } from '@/store/store';

function useGetDate() {
    const [ currentDate, setCurrentDate] = useAtom(currentDateAtom);
    const renderRef = useRef(true);

    useEffect(()=>{
        if (renderRef.current && currentDate !== '') {       
            const dateObj = new Date();
            const paddedDay = dateObj.getDate().toString().padStart(2, "0");
            const paddedMonth = (dateObj.getMonth() + 1).toString().padStart(2,"0")
            const date = dateObj.getFullYear() + '-' + paddedMonth + '-' + paddedDay;
            
            setCurrentDate(date);
            // setCurrentMonthDate(date);
            renderRef.current = false;
        }
    },[]);
    return null
}

export default useGetDate