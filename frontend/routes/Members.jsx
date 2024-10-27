import React from 'react';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import MembersCollection from '@/components/ui/MembersCollection';

function Members() {
  return (
    <>
      < SidebarContainer>
        <MembersCollection />
      </SidebarContainer>
    </>
  )
}

export default Members