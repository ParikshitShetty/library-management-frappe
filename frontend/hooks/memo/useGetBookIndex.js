import React, { useMemo } from 'react';

export default function useGetBookIndex ({ selectedBookObj, books}){
    const bookIndex = useMemo(() => {
        if (selectedBookObj.id){
          const index = books.findIndex(book => book.title === selectedBookObj.title);
          return index;
        } else return books.length;
    },[selectedBookObj,books]);
    return bookIndex;
}