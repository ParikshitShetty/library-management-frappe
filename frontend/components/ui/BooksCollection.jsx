import React from 'react'
import BooksRenderer from '../renderer/BooksRenderer'
import Search from '../reusable/Search'

function BooksCollection() {
  return (
    <>
        <main className='min-h-screen w-11/12 text-start'>
          <div className='w-full flex justify-center items-center relative h-[10vh]'>
            <div className='w-1/6 absolute left-10'>
              <Search placeholderText={'Search Books'} />
            </div>
            <header className='text-center text-2xl font-bold'>Books List</header>
          </div>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-auto flex justify-around items-center py-4 shadow-2xl'>
              <span className='w-[40%] font-bold'>Title</span>
              <span className='w-[15%] font-bold'>Average Rating</span>
              <span className='w-[15%] font-bold'>Authors</span>
              <span className='w-[20%] font-bold'>Publisher</span>
              <span className='w-[10%] font-bold'>Copies Available</span>
            </div>
            <BooksRenderer />
          </div>
        </main>
    </>
  )
}

export default BooksCollection