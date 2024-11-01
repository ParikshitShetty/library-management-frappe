import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useSetAtom } from 'jotai';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer';
import TransactionCollection from '@/components/ui/TransactionCollection';
import ImportPopUp from '@/components/popup/ImportPopUp';
// Services
import getTransactionsService from '@/services/api/getTransactionsService';
// Global States
import { 
  issueBookAtom,
  openImportPopUpAtom,
  popUpAtom, 
  transactionArrayAtom} from '@/store/store';

function Home() {
  const setOpen = useSetAtom(popUpAtom);

  const setIssueType = useSetAtom(issueBookAtom);

  const setTransactions = useSetAtom(transactionArrayAtom);

  const setOpenImportPopUp = useSetAtom(openImportPopUpAtom);

  async function getTransactions () {
    const transactionsArray = await getTransactionsService();
    setTransactions(transactionsArray);
  }
  useEffect(() => {
    getTransactions()
  },[])

  const handleClickOpen = () => setOpen(true);

  const openIssue = () => {
    setIssueType(true);
    handleClickOpen();
  };

  const openReturn = () => {
    setIssueType(false);
    handleClickOpen();
  };

  const openImportPopUp = () => {
    setOpenImportPopUp(true);
  }
  
  const closeImportPopUp = () => {
    setOpenImportPopUp(false);
  };
  return (
    <>
        <SidebarContainer>
          <main className='h-auto w-full flex flex-col justify-start items-center'>
            <div className='w-full h-auto flex justify-center items-center'>

              <Button sx={{
                boxShadow:5,
                padding:1,
                margin:1,
              }}
              variant='contained'
              onClick={openImportPopUp}
              >
                Import Books
              </Button>
              <Button sx={{
                boxShadow:5,
                padding:1,
                margin:1,
              }}
              variant='contained'
              onClick={openIssue}
              >
                Issue a Book
              </Button>
              <Button sx={{
                boxShadow:5,
                padding:1,
                margin:1,
              }}
              variant='contained'
              onClick={openReturn}
              >
                Return a Book
              </Button>
            </div>
            <TransactionCollection />
          </main>
          <ImportPopUp handleClose={closeImportPopUp} />
        </SidebarContainer>
    </>
  )
}

export default Home