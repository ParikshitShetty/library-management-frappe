import React, { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';
// Icons
import { IoArrowForwardCircleOutline } from "react-icons/io5";
// Global States
import { 
    booksArrayState, 
    issueBookState, 
    popUpState, 
    searchTextState, 
    selectedBookObjState,
    selectedMemberObjState,} from '@/store/store'
//Utils 
import { searchBooks } from '@/utils/search/search';

function BooksRenderer() {
    const books = useAtomValue(booksArrayState);

    const searchText = useAtomValue(searchTextState);

    const [filteredBooks,setFilteredBooks] = useState([]);

    const setOpen = useSetAtom(popUpState);

    const setSelectedBookObj = useSetAtom(selectedBookObjState);

    const setSelectedMemberObj = useSetAtom(selectedMemberObjState);

    const setIssueType = useSetAtom(issueBookState);

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
  return (
    <>
        <div className='h-auto max-h-[80vh] w-full overflow-hidden overflow-y-auto'> 
            {filteredBooks?.map((book,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2 '
              key={index}
              >
                <span className='w-[35vw] text-wrap ml-2 mr-2'>{book.title}</span>
                <span className='w-[10vw] text-wrap'>{book.average_rating}</span>
                <span className='w-[20vw] text-wrap mx-2'>{book.authors}</span>
                <span className='w-[15vw] text-wrap mx-2'>{book.publisher}</span>
                <span className='w-[10vw] text-wrap'>{book.copies_available}</span>
                <span className='w-[10vw] font-bold cursor-pointer'
                  onClick={() => handleClickOpen(book)}
                >
                  <IoArrowForwardCircleOutline className='size-7' />
                </span>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default BooksRenderer