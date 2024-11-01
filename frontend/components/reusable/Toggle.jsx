import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

export default function Toggle({searchParams,handleChange}) {
  return (
    <>
        <ToggleButtonGroup
            color="primary"
            value={searchParams}
            exclusive
            onChange={handleChange}
            aria-label="Search Toggle"
        >
            <ToggleButton value="Title">Title</ToggleButton>
            <ToggleButton value="Authors">Authors</ToggleButton>
        </ToggleButtonGroup>
    </>
    
  )
} 