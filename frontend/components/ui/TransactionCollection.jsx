import React from 'react'
// Components
import TransactionRenderer from '../renderer/TransactionsRenderer'

function TransactionCollection() {
  return (
    <>
        <main className='min-h-screen w-11/12 text-start'>
          <div className='w-full flex justify-center items-center relative h-[10vh]'>
            <header className='text-center text-2xl font-bold'>Transactions</header>
          </div>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-auto flex justify-around items-center py-4 shadow-2xl'>
              <span className='w-[10%] font-bold'>Book Id</span>
              <span className='w-[10%] font-bold'>Member Id</span>
              <span className='w-[30%] font-bold'>Issue Date</span>
              <span className='w-[30%] font-bold'>Return Date</span>
              <span className='w-[20%] font-bold'>Returned</span>
            </div>
            <TransactionRenderer />
          </div>
        </main>
    </>
  )
}

export default TransactionCollection