import React, { useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { useSetAtom } from 'jotai'
// Import Routes
import Home from '@/routes/Home'
import Members from '@/routes/Members'
import Books from '@/routes/Books'
import Transactions from '@/routes/Transactions'
// Import Components
import PopupComponent from '@/components/popup/PopupComponent'
// Error handler
import FallbackComponent from '@/components/error/FallBackComponent'
// Services
import getMembersService from '@/services/api/getMembersService'
import getBooksService from '@/services/api/getBooksService'
// Global States
import { 
  booksArrayState, 
  membersArrayState } from '@/store/store';

function App() {
  const setMembers = useSetAtom(membersArrayState);
  const setBooks = useSetAtom(booksArrayState);

  const renderRef = useRef(true);

  async function getMembers() {
    const membersArray = await getMembersService();
    setMembers(membersArray)
  }

  async function getBooks () {
    const booksArray = await getBooksService();
    setBooks(booksArray)
  }

  useEffect(() => {
    if (renderRef.current) {
      getBooks();
      getMembers();
      renderRef.current = false;
    }
  },[]);
  return (
    <>
      <div>
        <ErrorBoundary 
         FallbackComponent={FallbackComponent}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/members' element={<Members />} />
            <Route path='/books' element={<Books />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='*' element={<div>Route Not Found</div>} />
          </Routes>
          <PopupComponent/>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default App
