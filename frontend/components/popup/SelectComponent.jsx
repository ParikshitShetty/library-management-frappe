import React, { useEffect, useState } from 'react'
import { FormControl, Box, Select, MenuItem, InputLabel } from '@mui/material';

export default function SelectComponent({ menu_items, label, intitalIndex }) {
    const [dropdownValue, setDropdownValue] = useState(intitalIndex);

    useEffect(() => {
      if (intitalIndex) {
        setDropdownValue(intitalIndex);
        // const eventValueObj = menu_items[intitalIndex] ?? {};
        // const val = label === 'Books' ? eventValueObj.title : eventValueObj.name;
      }
    },[])
  
    const handleChange = (event) => {
      setDropdownValue(event.target.value);
      const eventValueObj = menu_items[event.target.value];
      const val = label === 'Books' ? eventValueObj.title : eventValueObj.name;
      console.log("val",val)
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