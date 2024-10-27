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
            <div className='w-full h-auto flex justify-around items-center py-4 shadow-2xl text-start'>
              <span className='w-[35vw] font-bold'>Title</span>
              <span className='w-[10vw] font-bold'>Average Rating</span>
              <span className='w-[20vw] font-bold'>Authors</span>
              <span className='w-[15vw] font-bold'>Publisher</span>
              <span className='w-[10vw] font-bold'>Copies Available</span>
              <span className='w-[10vw] font-bold'>Issue Book</span>
            </div>
            <BooksRenderer />
          </div>
        </main>
    </>
  )
}

export default BooksCollection