import React from 'react'
import Button from '@mui/material/Button';
import { useAtom } from 'jotai';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer';
// Global States
import { popUpState } from '@/store/store';

function Home() {
  const [open, setOpen] = useAtom(popUpState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  return (
    <>
        <SidebarContainer>
          <main className='min-h-screen w-full flex flex-col justify-start items-center'>
            <div className='w-full h-auto flex'>
              <Button className='shadow-2xl p-2'
              onClick={handleClickOpen}
              >
                Issue a Book
              </Button>
              <Button className='shadow-2xl p-2'
              onClick={handleClickOpen}
              >
                Return a Book
              </Button>
            </div>
          </main>
        </SidebarContainer>
    </>
  )
}

export default Home