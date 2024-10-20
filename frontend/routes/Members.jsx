import React, { useEffect, useState } from 'react'
// Components
import SidebarContainer from '@/components/layout/SidebarContainer'
// Services
import getMembersService from '@/services/api/getMembersService'

function Members() {
  const [members, setMembers] = useState([]);

  async function getMembers() {
    const membersArray = await getMembersService();
    setMembers(membersArray)
    console.log("membersArray",membersArray)
  }
  useEffect(() => {
    getMembers();
  },[]);

  return (
    <>
      < SidebarContainer>
            Members
        {members?.map((member) => (
          <>
            {member.name} <br />
          </>
        ))}
      </SidebarContainer>
    </>
  )
}

export default Members