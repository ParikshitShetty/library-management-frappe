import React from 'react'
// Components
import Search from '../reusable/Search'
import MembersRenderer from '../renderer/MembersRenderer'

function MembersCollection() {
  return (
    <>
        <main className='min-h-screen w-11/12 text-start'>
          <div className='w-full flex justify-center items-center relative h-[10vh]'>
            <div className='w-1/6 absolute left-10'>
              <Search placeholderText={'Search Members'} />
            </div>
            <header className='text-center text-2xl font-bold'>Members</header>
          </div>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-auto flex justify-around items-center py-4 shadow-2xl'>
              <span className='w-[20%] font-bold'>Id</span>
              <span className='w-[30%] font-bold'>Name</span>
              <span className='w-[30%] font-bold'>Email</span>
              <span className='w-[20%] font-bold'>Outstanding Debt</span>
            </div>
            <MembersRenderer />
          </div>
        </main>
    </>
  )
}

export default MembersCollection