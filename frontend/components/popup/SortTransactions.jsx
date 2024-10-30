import { Checkbox, FormControlLabel, FormGroup, FormControl, FormLabel } from '@mui/material';
import { useAtom } from 'jotai';
import React from 'react'
// Icons
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { IoCloseSharp } from "react-icons/io5";
// Global States
import { 
    openSortPopupState, 
    transactionCompletedState } from '@/store/store';

export default function SortTransactions() {
    const [openSortPopup,setOpenSortPopup] = useAtom(openSortPopupState);

    const [transactionCompleted,setTransactionCompleted] = useAtom(transactionCompletedState);

    const popUpToggle = () => setOpenSortPopup(prev => !prev);

    const handleCheckboxChange = () => setTransactionCompleted(prev => !prev);

  return (
    <>
        <span className='ml-5'>
            <HiOutlineAdjustmentsHorizontal
                onClick={popUpToggle}
                className='cursor-pointer size-7'
            />
        </span>
        {
            openSortPopup && (
            <div className='absolute left-[60%] border-2 p-2 rounded-2xl'>
                <FormControl component="fieldset">
                    <FormLabel component="legend" sx={{
                        display:'inline-flex',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        Sort Transactions
                        <IoCloseSharp
                            className='cursor-pointer size-7'
                            onClick={popUpToggle}
                        />
                    </FormLabel>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value={transactionCompleted}
                        onChange={handleCheckboxChange}
                        control={<Checkbox />}
                        label="Completed"
                        labelPlacement="end"
                      />
                    </FormGroup>
                </FormControl>
            </div>
        )}
    </>
  )
}