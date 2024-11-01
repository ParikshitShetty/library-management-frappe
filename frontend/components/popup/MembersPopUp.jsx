import axios from 'axios';
import React, { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
// Constants
import { endpoints } from '@/constants/endpoints';
// Services
import getMembersService from '@/services/api/getMembersService';
// Global States
import { 
  editMemberAtom,
  membersArrayAtom, 
  openMemberPopUpAtom, 
  selectedMemberObjAtom} from '@/store/store';
import { useEffect } from 'react';

const textFeildStyle = {
  width:'40%',
  m : 1
}
export default function MembersPopUp() {
  const [membersData,setMembersData] = useState({
    name : '',
    email : '',
    phone : ''
  });

  const setMembers = useSetAtom(membersArrayAtom);

  const [openMemberPopUp,setOpenMemberPopUp] = useAtom(openMemberPopUpAtom);

  const editMember = useAtomValue(editMemberAtom);

  const selectedMemberObj = useAtomValue(selectedMemberObjAtom);

  const handleClose = () => {
    setOpenMemberPopUp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMembersData(prev => {
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const addMemberFormSubmit = (e) => {
    e.preventDefault();
    if (membersData.phone.length !== 10) {
      toast.error('Phone number should have 10 digits');
      return;
    }
    const body = membersData;
    const url = endpoints.members.add_members;
    console.log("url",url)
    axios.post(url,body).then(async(response) => {
      console.log('reponse add members',response);
      toast.success(response.data.message);
      const updated_members = await getMembersService();
      setMembers(updated_members);
      setMembersData({
        name:'',
        email:'',
        phone:'',
      });
      handleClose();
    }).catch((error) => {
      console.error("Error while adding memebers",error);
    })
  }
  
  const updateMemberFormSubmit = (e) => {
    e.preventDefault();
    if (membersData.phone.length !== 10) return toast.error('Phone number should have 10 digits');
     
    if(!selectedMemberObj?.id) return toast.error('Member id is not present');
    
    const body = {
      id:selectedMemberObj.id,
      ...membersData
    };
    const url = endpoints.members.update_members;
    console.log("url",url)
    axios.post(url,body).then(async(response) => {
      toast.success(response.data.message);
      const updated_members = await getMembersService();
      setMembers(updated_members);
      setMembersData({
        name:'',
        email:'',
        phone:'',
      });
      handleClose();
    }).catch((error) => {
      console.error("Error while adding memebers",error);
    })
  }

  useEffect(()=>{
    if (selectedMemberObj.id && editMember) {
      setMembersData({
        name : selectedMemberObj.name,
        email : selectedMemberObj.email,
        phone : selectedMemberObj.phone
      })
    } else {
      setMembersData({
        name : '',
        email : '',
        phone : ''
      })
    }
  },[selectedMemberObj])

  return (
    <>
      <Box>
        <Dialog onClose={handleClose} open={openMemberPopUp}>
          <DialogTitle sx={{
            textAlign:'center'
          }}>
            { editMember ? `Edit Member` : `Add Members`}
          </DialogTitle>
          <Box component='form' onSubmit={ editMember ? updateMemberFormSubmit : addMemberFormSubmit } 
            sx={{
              display:'flex',
              justifyContent:'space-evenly',
              alignItems:'center',
              flexWrap: 'wrap',
              width: '100%'
            }}
          >
            <Box sx={{
                display:'flex',
                justifyContent:'space-evenly',
                alignItems:'center',
                flexWrap: 'wrap',
                width: '100%'
              }}>
                <TextField
                  label="Member Name" 
                  variant="outlined" 
                  name='name'
                  required
                  value={membersData.name}
                  onChange={handleChange}
                  sx={textFeildStyle}
                />
                <TextField 
                  label="Email" 
                  variant="outlined" 
                  name='email'
                  type='email'
                  required
                  value={membersData.email}
                  onChange={handleChange}
                  sx={textFeildStyle}
                />
                <TextField 
                  label="Phone" 
                  variant="outlined" 
                  name='phone'
                  type='number'
                  required
                  value={membersData.phone}
                  onChange={handleChange}
                  sx={textFeildStyle}
                />
              </Box>
            
            <Button
              variant='outlined'
              type='submit'
              sx={{
                m:1,
              }}
            >
              { editMember ? `Update Member` : `Create Member` }
            </Button>
          </Box>
        </Dialog>
      </Box>
    </>
  )
}