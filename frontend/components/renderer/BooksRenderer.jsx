import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import axios from 'axios';
// Icons
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from 'react-icons/md';
// Global States
import { 
    booksArrayAtom, 
    editBookAtom, 
    issueBookAtom, 
    openBookPopUpAtom, 
    popUpAtom, 
    searchTextAtom, 
    selectedBookObjAtom,
    selectedMemberObjAtom,} from '@/store/store'
//Utils 
import { searchBooks } from '@/utils/search/search';
// Constants
import { endpoints } from '@/constants/endpoints';
// Services
import getBooksService from '@/services/api/getBooksService';

function BooksRenderer() {
    const [books,setBooks] = useAtom(booksArrayAtom);

    const searchText = useAtomValue(searchTextAtom);

    const [filteredBooks,setFilteredBooks] = useState([]);

    const setOpen = useSetAtom(popUpAtom);

    const setSelectedBookObj = useSetAtom(selectedBookObjAtom);

    const setSelectedMemberObj = useSetAtom(selectedMemberObjAtom);

    const setIssueType = useSetAtom(issueBookAtom);

    const setOpenBookPopUp = useSetAtom(openBookPopUpAtom);

    const setEditBook = useSetAtom(editBookAtom);

    useEffect(() => {
      const searchResults = searchBooks({ books, searchText })
      setFilteredBooks(searchResults)
    },[searchText,books])

    const handleClickOpen = (book) => {
      if ( book.copies_available <= 0) return toast.error('We ran out of books');
      setSelectedBookObj(book);
      setSelectedMemberObj({});
      setOpen(true);
      setIssueType(true);
    };

    const deleteBook = (book) => {
      const url = endpoints.books.delete_books;
      const body = {
        id : book.id
      }
      axios.post(url,body).then(async(response) => {
        console.log("Reponse deleted book",response);
        toast.success(response.data.message);
        const updatedBooks = await getBooksService();
        setBooks(updatedBooks);
      }).catch((error) => {
        console.error("Error while deleting book",error)
        toast.error(error.response.data?.message)
      })
    }

    const openEditBook = (book) => {
      setSelectedBookObj(book);
      setOpenBookPopUp(true);
      setEditBook(true);
    }
  return (
    <>
        <div className='h-auto max-h-[80vh] w-full overflow-hidden overflow-y-auto'> 
            {filteredBooks?.map((book,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2 '
              key={index}
              >
                <span className='w-[35vw] text-wrap ml-2 mr-2'>{book.title}</span>
                <span className='w-[10vw] text-wrap'>{book.average_rating}</span>
                <span className='w-[15vw] text-wrap mx-2'>{book.authors}</span>
                <span className='w-[15vw] text-wrap mx-2'>{book.publisher}</span>
                <span className='w-[10vw] text-wrap'>{book.copies_available}</span>
                <span className='w-[10vw] font-bold cursor-pointer'
                  onClick={() => handleClickOpen(book)}
                >
                  <IoArrowForwardCircleOutline className='size-7' />
                </span>
                <Button onClick={() => deleteBook(book)}  
                >
                  <MdDelete
                    className='size-7 cursor-pointer'
                  />
                </Button>
                <Button 
                onClick={() => openEditBook(book)}
                >
                  <MdEdit
                    className='size-7 cursor-pointer'
                  />
                </Button>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default BooksRenderer