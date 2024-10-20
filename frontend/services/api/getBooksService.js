import axios from 'axios'
import React from 'react'
import { endpoints } from '@/constants/endpoints';

export default async function getBooksService() {
    try {
        const data = await axios.get(endpoints.get_books);        
        return data.data.books;
    } catch (error) {
        console.error("Error while getting books:",error)
    }
}