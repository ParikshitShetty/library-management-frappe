import React from 'react'
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import BooksCollection from '@/components/ui/BooksCollection';

function Books() {
  return (
    <>
      <SidebarContainer>
        <BooksCollection />
      </SidebarContainer>
    </>
  )
}

export default Books