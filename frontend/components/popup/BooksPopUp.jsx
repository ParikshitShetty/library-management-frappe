import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
// Components
import AddBooksForm from '../forms/AddBooksForm';
// Constants
import { endpoints } from '@/constants/endpoints';
// Services
import getBooksService from '@/services/api/getBooksService';
// Global States
import { 
  booksArrayAtom,
  editBookAtom,
  openBookPopUpAtom,  
  selectedBookObjAtom,} from '@/store/store';
  
const textFeildStyle = {
  width:'40%',
  m : 1
}

const booksIntialValue = {
  copies_available : 0, 
  title:'',
  authors:'',
  average_rating:0.0,
  isbn:0,
  isbn13:0,
  language_code:'',
  num_pages:0,
  ratings_count:0,
  text_reviews_count:0,
  publication_date:'', // date
  publisher:'',
}

const convertString_to_Number = (booksData) => {
  return {
    ...booksData,
    copies_available : Number(booksData.copies_available),
    average_rating : Number(booksData.average_rating),
    isbn : Number(booksData.isbn),
    isbn13 : Number(booksData.isbn13),
    num_pages : Number(booksData.num_pages),
    ratings_count : Number(booksData.ratings_count),
    text_reviews_count : Number(booksData.text_reviews_count),
  }
}
   

export default function BooksPopUp() {
  const [booksData,setBooksData] = useState(booksIntialValue); 
  
  const setBooks = useSetAtom(booksArrayAtom);
  
  const [openBookPopUp,setOpenBookPopUp] = useAtom(openBookPopUpAtom);
  
  const editbook = useAtomValue(editBookAtom);
  
  const selectedBookObj = useAtomValue(selectedBookObjAtom);

  const handleClose = () => {
    setOpenBookPopUp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooksData(prev => {
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const addBookFormSubmit = (e) => {
    e.preventDefault();
    
    const body = convertString_to_Number(booksData);
    console.log("booksdata body",body)
    const url = endpoints.books.add_books;
    console.log("url",url)
    axios.post(url,body).then(async(response) => {
      console.log('reponse add members',response);
      toast.success(response.data.message);
      const updated_books = await getBooksService();
      setBooks(updated_books);
      setBooksData(booksIntialValue);
      handleClose();
    }).catch((error) => {
      toast.error(error.response.data.message);
      console.error("Error while adding memebers",error);
    })
  }
  
  const updateBookFormSubmit = (e) => {
    e.preventDefault();
    if (!booksData.copies_available) return toast.error('Book count is not present');
     
    if(!selectedBookObj?.id) return toast.error('Book id is not present');
  
    const body = {
      id:selectedBookObj.id,
      count : booksData.copies_available
    };
    const url = endpoints.books.update_books;

    axios.post(url,body).then(async(response) => {
      toast.success(response.data.message);
      const updated_books = await getBooksService();
      setBooks(updated_books);
      setBooksData(booksIntialValue);
      handleClose();
    }).catch((error) => {
      console.error("Error while adding memebers",error);
    })
  }

  useEffect(()=>{
    if (selectedBookObj.id && editbook) {
      setBooksData({...selectedBookObj});
    } else {
      setBooksData(booksIntialValue);
    }
  },[selectedBookObj])

  console.log("booksData",booksData)

  return (
    <>
      <Box>
        <Dialog onClose={handleClose} open={openBookPopUp}>
          <DialogTitle sx={{
            textAlign:'center'
          }}>
            { editbook ? `Edit Book` : `Add Book`}
          </DialogTitle>
          <Box component='form' onSubmit={ editbook ? updateBookFormSubmit : addBookFormSubmit } 
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
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:'center',
                flexWrap: 'wrap',
                width: 800,
              }}>
                {editbook ? (
                  <Typography sx={{
                    display:'flex',

                  }}>
                    <span className='h-full w-[20%] font-bold'>Book Name: </span>
                    <span>
                      {booksData?.title}
                    </span>
                  </Typography>
                ) : (
                  <>
                    <AddBooksForm booksData={booksData} handleChange={handleChange} textFeildStyle={textFeildStyle} />
                  </>
                )}
                <TextField 
                  label="Copies Available" 
                  variant="outlined" 
                  name='copies_available'
                  type='number'
                  required
                  value={booksData.copies_available}
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
              { editbook ? `Update Book` : `Create Book` }
            </Button>
          </Box>
        </Dialog>
      </Box>
    </>
  )
}