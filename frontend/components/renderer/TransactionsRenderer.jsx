import { useAtomValue } from 'jotai';
import React from 'react';
// Global States
import { transactionArrayState } from '@/store/store';
// Utils
import { getDate } from '@/utils/date/date';

function TransactionRenderer() {
  const transactions = useAtomValue(transactionArrayState);
  return (
    <>
        <div className='h-auto max-h-[80vh] w-full overflow-hidden overflow-y-auto'> 
            {transactions?.map((transaction,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2'
              key={index}
              >
                <span className='w-[10%] text-wrap ml-2'>{transaction.book_id}</span>
                <span className='w-[10%] text-wrap'>{transaction.member_id}</span>
                <span className='w-[30%] text-wrap mx-2'>{getDate(transaction.issue_date)}</span>
                <span className='w-[30%] text-wrap'>{getDate(transaction.return_date)}</span>
                <span className='w-[20%] text-wrap mx-2'>{transaction.is_returned ? 'Yes' : 'Np'}</span>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default TransactionRenderer