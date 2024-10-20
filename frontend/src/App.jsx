import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
// Import Routes
import Home from '@/routes/Home'
import Members from '@/routes/Members'
import Books from '@/routes/Books'
import Transactions from '@/routes/Transactions'
// Error handler
import FallbackComponent from '@/components/error/FallBackComponent'

function App() {
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
        </ErrorBoundary>
      </div>
    </>
  )
}

export default App
