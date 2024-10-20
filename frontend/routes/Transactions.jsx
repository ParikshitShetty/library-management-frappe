import React, { useEffect, useState } from 'react'
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
// Services
import getTransactionsService from '@/services/api/getTransactionsService'
function Transactions() {
  const [transactions,setTransactions] = useState([]);

  async function getTransactions () {
    const transactionsArray = await getTransactionsService();
    setTransactions(transactionsArray)
    console.log("transactionsArray",transactionsArray)
  }
  useEffect(() => {
    getTransactions()
  },[])

  return (
    <>
        <SidebarContainer>
            Transactions
            {transactions?.map((transaction) => (
          <>
            {transaction.book_id} <br />
          </>
        ))}
        </SidebarContainer>
    </>
  )
}

export default Transactions