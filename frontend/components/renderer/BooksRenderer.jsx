import React, { useEffect, useRef, useState } from 'react'
import { useAtomValue } from 'jotai'
// Global States
import { 
    booksArrayState, 
    searchTextState } from '@/store/store'
//Utils 
import { searchBooks } from '@/utils/search';

function BooksRenderer() {
    const books = useAtomValue(booksArrayState);

    const searchText = useAtomValue(searchTextState);

    const renderRef = useRef(false);

    const [filteredBooks,setFilteredBooks] = useState([]);

    useEffect(() => {
        if (!renderRef.current) {
            renderRef.current = true;
            return
        }
        const searchResults = searchBooks({ books, searchText })
        setFilteredBooks(searchResults)
    },[searchText,books])

  return (
    <>
        <div className='h-auto max-h-[80vh] overflow-hidden overflow-y-auto'> 
            {filteredBooks?.map((book,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2'
              key={index}
              >
                <span className='w-[40%] text-wrap ml-2 mr-'>{book.title}</span>
                <span className='w-[15%] text-wrap'>{book.average_rating}</span>
                <span className='w-[15%] text-wrap mx-2'>{book.authors}</span>
                <span className='w-[20%] text-wrap mx-2'>{book.publisher}</span>
                <span className='w-[10%] text-wrap'>{book.copies_available}</span>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default BooksRenderer