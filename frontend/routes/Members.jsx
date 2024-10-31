import React from 'react';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import MembersCollection from '@/components/ui/MembersCollection';
import MembersPopUp from '@/components/popup/MembersPopUp';

function Members() {
  return (
    <>
      < SidebarContainer>
        <MembersCollection />
        <MembersPopUp />
      </SidebarContainer>
    </>
  )
}

export default Members