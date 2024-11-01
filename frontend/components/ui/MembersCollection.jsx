import React from 'react'
import { Button } from '@mui/material'
import { useSetAtom } from 'jotai';
// Components
import Search from '../reusable/Search'
import MembersRenderer from '../renderer/MembersRenderer'
// Global States
import { 
  editMemberState, 
  openMemberPopUpState,
  selectedMemberObjState, } from '@/store/store';


function MembersCollection() {
  const setOpenMemberPopUp = useSetAtom(openMemberPopUpState);
  const setEditMember = useSetAtom(editMemberState);

  const setSelectedMemberObj = useSetAtom(selectedMemberObjState);

  const openAddMember = () => {
    setSelectedMemberObj({});
    setOpenMemberPopUp(true);
    setEditMember(false);
  }

  return (
    <>
        <main className='min-h-screen w-11/12 text-start'>
          <div className='w-full flex justify-center items-center relative h-[10vh]'>
            <div className='w-1/6 absolute left-10'>
              <Search placeholderText={'Search Members'} />
            </div>
            <header className='text-center text-2xl font-bold w-full'>Members</header>

            <div className='w-[20%] flex items-center justify-center'>
              <Button
              variant='contained'
              onClick={openAddMember}
              >
                Add Members
              </Button>
            </div>
          </div>
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-auto flex justify-around items-center py-4 shadow-2xl'>
              <span className='w-[10%] font-bold ml-4'>Id</span>
              <span className='w-[20%] font-bold'>Name</span>
              <span className='w-[25%] font-bold'>Email</span>
              <span className='w-[15%] font-bold'>Outstanding Debt</span>
              <span className='w-[10%] font-bold'>Issue Book</span>
              <span className='w-[10%] font-bold'>Return Book</span>
              <span className='w-[10%] font-bold'></span>
            </div>
            <MembersRenderer />
          </div>
        </main>
    </>
  )
}

export default MembersCollection