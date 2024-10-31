import React, { useEffect, useState } from 'react'
import { useAtomValue, useSetAtom } from 'jotai';
import { FormControl, Box, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { issueBookState, returnBooksState } from '@/store/store';
import { endpoints } from '@/constants/endpoints';

export default function SelectComponent({ menu_items, label, intitalIndex, setSelectedObj }) {
    const [dropdownValue, setDropdownValue] = useState(intitalIndex);

    const issueType = useAtomValue(issueBookState);

    const setReturnBooksArray = useSetAtom(returnBooksState);

    const getUserInfo = async(member) => {
      try {
        const url = endpoints.transactions.get_member_transactions;
        const body = {
          "member_id" : member.id
        }
        const response = await axios.post(url,body);
        setReturnBooksArray(response.data.books);
      } catch (error) {
        console.error('Error while getting User Info:',error);
      }
    }

    useEffect(() => {
      if (intitalIndex) setDropdownValue(intitalIndex);
    },[])
  
    const issueHandleChange = (event) => {
      setDropdownValue(event.target.value);
      const eventValueObj = menu_items[event.target.value];
      if (label === 'Books' && eventValueObj.copies_available <= 0) {
        toast.error('Book is out of stock please select another');
        setDropdownValue(intitalIndex);
        setSelectedObj({});
        return;
      }

      if (label === 'Members' && eventValueObj.outstanding_debt >= 500){
        toast.error('Please clear the outstanding debt to proceed');
        setDropdownValue(intitalIndex);
        setSelectedObj({});
        return;
      }
      setSelectedObj(eventValueObj);
    };

    const returnHandleChange = (event) => {
      setDropdownValue(event.target.value);
      const eventValueObj = menu_items[event.target.value];
      
      if (label === 'Members' && !issueType) getUserInfo(eventValueObj);
      console.log("returnBooksArray issueType")
      setSelectedObj(eventValueObj);
    }
  
    return (
        <Box sx={{ 
            minWidth: 400,
            m:2
        }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{label}</InputLabel>
              <Select
                value={dropdownValue}
                label={label}
                onChange={issueType ? issueHandleChange : returnHandleChange}
              >
                {menu_items.map((menu,index) => (
                  <MenuItem key={index} value={index}>
                    {label === 'Books' ? menu.title : menu.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </Box>
    );
}