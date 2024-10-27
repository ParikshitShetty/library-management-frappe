import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
// Components
import SelectComponent from './SelectComponent';
// Global States
import { 
  booksArrayState, 
  membersArrayState, 
  popUpState, } from '@/store/store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function PopupComponent() {
  const [open, setOpen] = useAtom(popUpState);

  const books = useAtomValue(booksArrayState);

  const members = useAtomValue(membersArrayState);

  const handleClose = (value) => {
    setOpen(false);
  };

  console.log("books",books,"members",members);

  return (
    <>
      <Box>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Issue Book</DialogTitle>
            <SelectComponent label={'Books'} menu_items={books} />
            <SelectComponent label={'Members'} menu_items={members} />
            <Button
              variant='outlined'
              sx={{
                m:1,
              }}
            >
              Issue Book
            </Button>
        </Dialog>
      </Box>
    </>
  )
}