import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import BooksCollection from '@/components/ui/BooksCollection';
// Services
import getBooksService from '@/services/api/getBooksService'
// Global States
import { booksArrayState } from '@/store/store';

function Books() {
  const [books,setBooks] = useAtom(booksArrayState);

  async function getBooks () {
    const booksArray = await getBooksService();
    setBooks(booksArray)
    console.log("books",booksArray)
  }
  useEffect(() => {
    getBooks()
  },[])
  return (
    <>
      <SidebarContainer>
        <BooksCollection />
      </SidebarContainer>
    </>
  )
}

export default Books