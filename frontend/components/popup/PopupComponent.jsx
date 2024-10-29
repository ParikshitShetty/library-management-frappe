import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import toast from 'react-hot-toast';
import axios from 'axios';
// Components
import SelectComponent from './SelectComponent';
// Global States
import { 
  booksArrayState, 
  issueBookState, 
  membersArrayState, 
  popUpState,
  selectedBookObjState,
  selectedMemberObjState, } from '@/store/store';
// Custom Hooks
import useGetBookIndex from '@/hooks/memo/useGetBookIndex';
import useGetMemberIndex from '@/hooks/memo/useGetMemberIndex';
// Constants
import { endpoints } from '@/constants/endpoints';

export default function PopupComponent() {
  const [open, setOpen] = useAtom(popUpState);

  const books = useAtomValue(booksArrayState);

  const issueType = useAtomValue(issueBookState);

  const members = useAtomValue(membersArrayState);

  const [selectedBookObj, setSelectedBookObj] = useAtom(selectedBookObjState);

  const [selectedMemberObj, setSelectedMemberObj] = useAtom(selectedMemberObjState);

  const handleClose = (value) => {
    setOpen(false);
  };

  const bookIndex = useGetBookIndex({ books, selectedBookObj });

  const memberIndex = useGetMemberIndex({ members, selectedMemberObj });

  const IssueBook = async() => {
    try {
      if (!selectedBookObj.id) return toast("Please select book");
      if (!selectedMemberObj.id) return toast("Please select member");

      const url = endpoints.issue_book;
      const data = {
        "book_id": selectedBookObj.id,
        "member_id": selectedMemberObj.id
      }
      const response = await axios.post(url,data);
      toast(response.data?.message)
      console.log("response",response)
      handleClose()
    } catch (error) {
      console.error("Error while issuing books:",error)
    }
  }

  const ReturnBook = async() => {
    try {
      if (!selectedBookObj.id) return toast("Please select book");
      if (!selectedMemberObj.id) return toast("Please select member");

      const url = endpoints.return_book;
      const data = {
        "book_id": selectedBookObj.id,
        "member_id": selectedMemberObj.id
      }
      const response = await axios.post(url,data);
      toast(response.data?.message)
      console.log("response returning",response)
    } catch (error) {
      console.error("Error while returning books:",error)
    }
  }

  return (
    <>
      <Box>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>{issueType ? `Issue Book` : `Return Book`}</DialogTitle>
            <SelectComponent 
             label={'Books'} 
             intitalIndex={bookIndex} 
             menu_items={books} 
             setSelectedObj={setSelectedBookObj} 
            />
            <SelectComponent 
             label={'Members'} 
             intitalIndex={memberIndex} 
             menu_items={members} 
             setSelectedObj={setSelectedMemberObj} 
            />
            <Button
              variant='outlined'
              onClick={issueType ? IssueBook : ReturnBook}
              sx={{
                m:1,
              }}
            >
              {issueType 
              ?
                `Issue Book`
              :
                `Return Book`
              }
            </Button>
        </Dialog>
      </Box>
    </>
  )
}