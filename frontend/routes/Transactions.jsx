import React, { useEffect, useState } from 'react'
import { useSetAtom } from 'jotai';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import TransactionCollection from '@/components/ui/TransactionCollection';
// Services
import getTransactionsService from '@/services/api/getTransactionsService';
// Global States
import { transactionArrayState } from '@/store/store';

function Transactions() {
  const setTransactions = useSetAtom(transactionArrayState);

  async function getTransactions () {
    const transactionsArray = await getTransactionsService();
    setTransactions(transactionsArray);
  }
  useEffect(() => {
    getTransactions()
  },[])

  return (
    <>
        <SidebarContainer>
          <TransactionCollection />
        </SidebarContainer>
    </>
  )
}

export default Transactions