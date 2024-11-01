import React from 'react'
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import BooksCollection from '@/components/ui/BooksCollection';
import BooksPopUp from '@/components/popup/BooksPopUp';

function Books() {
  return (
    <>
      <SidebarContainer>
        <BooksCollection />
        <BooksPopUp />
      </SidebarContainer>
    </>
  )
}

export default Books