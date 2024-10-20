import React, { useEffect, useState } from 'react'
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
// Services
import getBooksService from '@/services/api/getBooksService'

function Books() {
  const [books,setBooks] = useState([]);

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
        Books
        {books?.map((book) => (
          <>
            {book.title} <br />
          </>
        ))}
      </SidebarContainer>
    </>
  )
}

export default Books