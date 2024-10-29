import React, { useEffect, useState } from 'react'
import { FormControl, Box, Select, MenuItem, InputLabel } from '@mui/material';
import toast from 'react-hot-toast';

export default function SelectComponent({ menu_items, label, intitalIndex, setSelectedObj }) {
    const [dropdownValue, setDropdownValue] = useState(intitalIndex);

    useEffect(() => {
      if (intitalIndex) setDropdownValue(intitalIndex);
    },[])
  
    const handleChange = (event) => {
      setDropdownValue(event.target.value);
      const eventValueObj = menu_items[event.target.value];
      if (label === 'Books' && eventValueObj.copies_available <= 0) {
        toast('Book is out of stock please select another');
        setDropdownValue(intitalIndex);
        setSelectedObj({});
        return;
      }

      if (label === 'Members' && eventValueObj.outstanding_debt >= 500){
        toast('Please clear the outstanding debt to proceed');
        setDropdownValue(intitalIndex);
        setSelectedObj({});
        return;
      }
      setSelectedObj(eventValueObj);
    };
  
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
                onChange={handleChange}
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