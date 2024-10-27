import React, { useMemo } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
// Components
import SelectComponent from './SelectComponent';
// Global States
import { 
  booksArrayState, 
  membersArrayState, 
  popUpState,
  selectedBookObjState,
  selectedMemberObjState, } from '@/store/store';
// Custom Hooks
import useGetBookIndex from '@/hooks/memo/useGetBookIndex';
import useGetMemberIndex from '@/hooks/memo/useGetMemberIndex';

export default function PopupComponent() {
  const [open, setOpen] = useAtom(popUpState);

  const books = useAtomValue(booksArrayState);

  const members = useAtomValue(membersArrayState);

  const selectedBookObj = useAtomValue(selectedBookObjState);

  const selectedMemberObj = useAtomValue(selectedMemberObjState);

  const handleClose = (value) => {
    setOpen(false);
  };

  const bookIndex = useGetBookIndex({ books, selectedBookObj });

  const memberIndex = useGetMemberIndex({ members, selectedMemberObj });

  console.log("bookIndex",bookIndex);
  console.log("memberIndex",memberIndex);

  return (
    <>
      <Box>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Issue Book</DialogTitle>
            <SelectComponent label={'Books'} intitalIndex={bookIndex} menu_items={books} />
            <SelectComponent label={'Members'} intitalIndex={memberIndex} menu_items={members} />
            <Button
              variant='outlined'
              sx={{
                m:1,
              }}
            >
              Issue Book
            </Button>
        </Dialog>
      </Box>
    </>
  )
}