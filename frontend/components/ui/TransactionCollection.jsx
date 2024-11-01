import React from 'react'
// Components
import TransactionRenderer from '../renderer/TransactionsRenderer'
import SortTransactions from '../popup/SortTransactions';

function TransactionCollection() {
  return (
    <>
        <main className='h-[90vh] w-11/12 text-start flex flex-col justify-start items-start'>
          <div className='w-full flex justify-center items-center relative h-[10vh]'>
            <header className='text-center text-2xl font-bold'>Transactions</header>
            <SortTransactions />
          </div>
          <div className='w-full h-full flex flex-col justify-start items-center'>
            <div className='w-full h-auto flex justify-around items-center py-4 shadow-2xl'>
              <span className='w-[10%] font-bold ml-4'>Book Id</span>
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