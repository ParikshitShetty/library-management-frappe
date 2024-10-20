import React, { useEffect } from 'react'
import { useSetAtom } from 'jotai';
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
import MembersCollection from '@/components/ui/MembersCollection';
// Services
import getMembersService from '@/services/api/getMembersService'
// Global States
import { membersArrayState } from '@/store/store';

function Members() {
  const setMembers = useSetAtom(membersArrayState);

  async function getMembers() {
    const membersArray = await getMembersService();
    setMembers(membersArray)
  }
  useEffect(() => {
    getMembers();
  },[]);

  return (
    <>
      < SidebarContainer>
        <MembersCollection />
      </SidebarContainer>
    </>
  )
}

export default Members