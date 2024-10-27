import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function SelectComponent({ menu_items, label }) {
    const [dropdownValue, setDropdownValue] = useState('');
  
    const handleChange = (event) => {
        const eventValueObj = event.target.value;
        console.log("Change value",eventValueObj)
        const val = label === 'Books' ? eventValueObj.title : eventValueObj.name;
        setDropdownValue(val);
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
                {menu_items.map((menu) => (
                  <MenuItem value={menu}>{label === 'Books' ? menu.title : menu.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
        </Box>
    );
}