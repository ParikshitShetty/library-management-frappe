import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
// Global States
import { 
    membersArrayState, 
    searchTextState } from '@/store/store';
// Utils
import { searchMembers } from '@/utils/search';

function MembersRenderer() {
    const members = useAtomValue(membersArrayState);

    const searchText = useAtomValue(searchTextState);

    const renderRef = useRef(false);

    const [filteredMembers,setFilteredMembers] = useState([]);

    useEffect(() => {
        if (!renderRef.current) {
            renderRef.current = true;
            return
        }
        const searchResults = searchMembers({ members, searchText })
        setFilteredMembers(searchResults)
    },[searchText,members])

  return (
    <>
        <div className='h-auto max-h-[80vh] w-full overflow-hidden overflow-y-auto'> 
            {filteredMembers?.map((member,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2'
              key={index}
              >
                <span className='w-[10%] text-wrap ml-2'>{member.id}</span>
                <span className='w-[30%] text-wrap'>{member.name}</span>
                <span className='w-[30%] text-wrap mx-2'>{member.email}</span>
                <span className='w-[20%] text-wrap mx-2'>{member.outstanding_debt}</span>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default MembersRenderer