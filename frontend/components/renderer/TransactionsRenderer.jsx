import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
// Global States
import { 
  openSortPopupState, 
  transactionArrayState, 
  transactionCompletedState } from '@/store/store';
// Utils
import { getDate } from '@/utils/date/date';

function TransactionRenderer() {
  const [filteredTransactions,setFilteredTransactions] = useState([]);

  const openSortPopup = useAtomValue(openSortPopupState);

  const transactions = useAtomValue(transactionArrayState);

  const transactionCompleted = useAtomValue(transactionCompletedState);

  useEffect(() => {
    if (openSortPopup) {
      const updatedArray = transactions.filter(transaction => {
        return transaction.is_returned === transactionCompleted
      });
      setFilteredTransactions(updatedArray);
    } else setFilteredTransactions(transactions);
  },[openSortPopup,transactionCompleted,transactions])
  return (
    <>
        <div className='h-auto max-h-[80vh] w-full overflow-hidden overflow-y-auto'> 
            {filteredTransactions?.map((transaction,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2'
              key={index}
              >
                <span className='w-[10%] text-wrap ml-2'>{transaction.book_id}</span>
                <span className='w-[10%] text-wrap'>{transaction.member_id}</span>
                <span className='w-[30%] text-wrap mx-2'>{getDate(transaction.issue_date)}</span>
                <span className='w-[30%] text-wrap'>{getDate(transaction.return_date)}</span>
                <span className='w-[20%] text-wrap mx-2'>{transaction.is_returned ? 'Yes' : 'No'}</span>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default TransactionRenderer