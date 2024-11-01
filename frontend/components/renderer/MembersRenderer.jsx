import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Button } from '@mui/material';
// Global States
import { 
  editMemberAtom,
  issueBookAtom,
    membersArrayAtom, 
    openMemberPopUpAtom, 
    popUpAtom, 
    returnBooksAtom, 
    searchTextAtom, 
    selectedBookObjAtom, 
    selectedMemberObjAtom} from '@/store/store';
// Utils
import { searchMembers } from '@/utils/search/search';
// Icons
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from 'react-icons/io5';
import { MdDelete, MdEdit } from "react-icons/md";
// Constants
import { endpoints } from '@/constants/endpoints';
// Services
import getMembersService from '@/services/api/getMembersService';


function MembersRenderer() {
    const [members,setMembers] = useAtom(membersArrayAtom);

    const searchText = useAtomValue(searchTextAtom);

    const renderRef = useRef(false);

    const [filteredMembers,setFilteredMembers] = useState([]);

    const setOpen = useSetAtom(popUpAtom);

    const setSelectedBookObj = useSetAtom(selectedBookObjAtom);

    const setSelectedMemberObj = useSetAtom(selectedMemberObjAtom);

    const setReturnBooksArray = useSetAtom(returnBooksAtom);

    const setIssueType = useSetAtom(issueBookAtom);

    const setOpenMemberPopUp = useSetAtom(openMemberPopUpAtom);

    const setEditMember = useSetAtom(editMemberAtom);

    const [deleteLoading,setDeleteLoading] = useState(false);

    useEffect(() => {
        if (!renderRef.current) {
            renderRef.current = true;
            return
        }
        const searchResults = searchMembers({ members, searchText })
        setFilteredMembers(searchResults)
    },[searchText,members])

    const getUserInfo = async(member) => {
      try {
        const url = endpoints.transactions.get_member_transactions;
        const body = {
          "member_id" : member.id
        }
        const response = await axios.post(url,body);
        setReturnBooksArray(response.data.books);
      } catch (error) {
        console.error('Error while getting User Info:',error);
      }
    }

    const handleClickOpen = (member,issueType) => {
      if(member.books_issued <= 0 && !issueType){
        return toast('No books have been issued to this member'); 
      }
      setIssueType(issueType);
      getUserInfo(member)
      setSelectedMemberObj(member);
      setSelectedBookObj({});
      setOpen(true);
    };

    const deleteMember = (member) => {
      const url = endpoints.members.delete_members;
      const body = {
        id : member.id
      }
      setDeleteLoading(true);
      axios.post(url,body).then(async(response) => {
        console.log("response user deleted",response);
        const updated_members = await getMembersService();
        setMembers(updated_members);
      }).catch((error) => {
        console.error("Error while deleting member:",error)
      }).finally(() => {
        setDeleteLoading(false);
      })
    }

    const editMember = (memberObj) => {
      setSelectedMemberObj(memberObj);
      setOpenMemberPopUp(true);
      setEditMember(true);
    }

  return (
    <>
        <div className='h-auto max-h-[80vh] w-full overflow-hidden overflow-y-auto'> 
            {filteredMembers?.map((member,index) => (
              <div className='w-full h-auto flex justify-around items-center my-1 py-1 border-t-2'
              key={index}
              >
                <span className='w-[10%] text-wrap ml-2'>{member.id}</span>
                <span className='w-[30%] text-wrap'>{member.name}</span>
                <span className='w-[25%] text-wrap mx-2'>{member.email}</span>
                <span className='w-[15%] text-wrap mx-2'>{member.outstanding_debt}</span>
                <span className='w-[10%] font-bold cursor-pointer'
                  onClick={() => handleClickOpen(member,true)}
                >
                  <IoArrowForwardCircleOutline className='size-7' />
                </span>
                <span className='w-[10vw] font-bold cursor-pointer'
                  onClick={() => handleClickOpen(member,false)}
                >
                  <IoArrowBackCircleOutline className='size-7' />
                </span>
                <Button onClick={() => deleteMember(member)}
                disabled={deleteLoading}  
                >
                  <MdDelete
                    className='size-7 cursor-pointer'
                  />
                </Button>
                <Button 
                onClick={() => editMember(member)}
                >
                  <MdEdit
                    className='size-7 cursor-pointer'
                  />
                </Button>
              </div>      
            ))}  
        </div>
    </>
  )
}

export default MembersRenderer