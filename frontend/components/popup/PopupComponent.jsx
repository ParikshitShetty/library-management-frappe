import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';
import axios from 'axios';
// Components
import SelectComponent from './SelectComponent';
import DatePicker from '../date/DatePicker';
// Global States
import { 
  booksArrayState, 
  currentDateState, 
  issueBookState, 
  membersArrayState, 
  popUpState,
  returnBooksState,
  selectedBookObjState,
  selectedMemberObjState,
  transactionArrayState, } from '@/store/store';
// Custom Hooks
import useGetBookIndex from '@/hooks/memo/useGetBookIndex';
import useGetMemberIndex from '@/hooks/memo/useGetMemberIndex';
// Constants
import { endpoints } from '@/constants/endpoints';
// Services
import getBooksService from '@/services/api/getBooksService';
import getTransactionsService from '@/services/api/getTransactionsService';
import getMembersService from '@/services/api/getMembersService';

export default function PopupComponent() {
  const [booksArray,setBooksArray] = useState([]);

  const [open, setOpen] = useAtom(popUpState);

  const [books,setBooks] = useAtom(booksArrayState);

  const issueType = useAtomValue(issueBookState);

  const [members,setMembers] = useAtom(membersArrayState);

  const returnBooksArray = useAtomValue(returnBooksState);

  const setTransactions = useSetAtom(transactionArrayState);

  const [selectedBookObj, setSelectedBookObj] = useAtom(selectedBookObjState);

  const [selectedMemberObj, setSelectedMemberObj] = useAtom(selectedMemberObjState);

  const currentDate = useAtomValue(currentDateState);

  const handleClose = () => setOpen(false);

  const bookIndex = useGetBookIndex({ books:booksArray, selectedBookObj });

  const memberIndex = useGetMemberIndex({ members, selectedMemberObj });

  const updateArrays = async() =>{
    const booksArray = await getBooksService();
    setBooks(booksArray);
    const membersArray = await getMembersService();
    setMembers(membersArray);
    const transactionsArray = await getTransactionsService();
    setTransactions(transactionsArray)
  }

  const IssueBook = async() => {
    try {
      if (!selectedBookObj.id) return toast("Please select book");
      if (!selectedMemberObj.id) return toast("Please select member");

      if(selectedMemberObj.books_issued <= 0) return toast('No books have been issued'); 

      const url = endpoints.issue_book;
      const data = {
        "book_id": selectedBookObj.id,
        "member_id": selectedMemberObj.id
      }
      const response = await axios.post(url,data);
      toast(response.data?.message)
      console.log("response",response)
      handleClose()
      await updateArrays();
    } catch (error) {
      console.error("Error while issuing books:",error)
    }
  }

  const ReturnBook = async() => {
    try {
      if (!selectedBookObj.id) return toast("Please select book");
      if (!selectedMemberObj.id) return toast("Please select member");
      if (currentDate === '') return toast("Date is empty");

      const url = endpoints.return_book;
      const data = {
        "book_id": selectedBookObj.id,
        "member_id": selectedMemberObj.id,
        "return_date": currentDate
      }
      const response = await axios.post(url,data);
      toast(response.data?.message);
      console.log("response returning",response)
      handleClose();
      await updateArrays();
    } catch (error) {
      console.error("Error while returning books:",error)
    }
  }

  useEffect(() => {
    if (issueType) setBooksArray(books);
    else setBooksArray(returnBooksArray);
  },[issueType])

  return (
    <>
      <Box>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>{issueType ? `Issue Book` : `Return Book`}</DialogTitle>
            <SelectComponent 
             label={'Books'} 
             intitalIndex={bookIndex} 
             menu_items={returnBooksArray} 
             setSelectedObj={setSelectedBookObj} 
            />
            <SelectComponent 
             label={'Members'} 
             intitalIndex={memberIndex} 
             menu_items={members} 
             setSelectedObj={setSelectedMemberObj} 
            />
            { !issueType && 
              <>
                <DatePicker />
              </>
            }
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