import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
// Constants
import { endpoints } from '@/constants/endpoints';
// Global States
import { openImportPopUpState } from '@/store/store';

export default function ImportPopUp({handleClose}) {
    const [openImportPopUp,setOpenImportPopUp] = useAtom(openImportPopUpState);

    const [searchText,setSearchText] = useState('');
    const [count,setCount] = useState(0);

    const [loading,setLoading] = useState(false);

    const [searchResults,setSearchResults] = useState([]);

    const handleChange = (e) => {
        if (e.target.name === 'book'){
            if (e.target.value === '') setSearchResults([]);
            setSearchText(e.target.value);
        } else {
            setCount(e.target.value)
        }
    };


    async function FetchData(){
        if (searchText === '' && count === 0) {
            setSearchResults([]);
            return toast('fields are empty');
        }

        const url = endpoints.get_books_from_api;
        const body = {
            "book_name": searchText,
            "count": count
        }
        setLoading(true);
        axios.post(url,body).then(function (response) {
            console.log("response",response.data?.response);
            setSearchResults(response.data.response ?? [])
        }).catch(function (error) {
            setSearchResults([])
            console.log("Error while fetching data",error);
        }).finally(function () {
            setLoading(false);
        });
    }
  return (
    <>
        <Box>
            <Dialog onClose={handleClose} open={openImportPopUp}>
                <DialogTitle>Import Books</DialogTitle>
                <Box
                    component="form"
                    sx={{ 
                        '& > :not(style)': { 
                            m: 1 
                        }, 
                        width: '100%',
                        display: 'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-evenly',
                        paddingX:1
                    }}
                    >
                        <TextField 
                            label="Search Books" 
                            variant="outlined" 
                            name='book'
                            value={searchText}
                            onChange={handleChange}
                            sx={{
                                width:'50%'
                            }}
                        />
                        <TextField 
                            label="Count" 
                            variant="outlined" 
                            name='count'
                            type='number'
                            value={count}
                            onChange={handleChange}
                            sx={{
                                width:'50%',
                                marginLeft:1
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                paddingY:1.7,
                                marginLeft:1,
                                width: 300
                                
                            }}
                            disabled={loading}
                            onClick={FetchData}
                        >
                            Import Books
                        </Button>
                    </Box>
                    
                    <Box
                    sx={{
                        width: '100%'
                    }}
                    >
                        {
                            searchResults.map((res,index) => (
                                <span 
                                key={index}
                                className='w-full h-full py-2'>
                                    {res.title}<br />
                                </span>
                            ))
                        }
                    </Box>
                </Box>
            </Dialog>
        </Box>
    </>
  )
}