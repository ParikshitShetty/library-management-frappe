from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import requests
import math
from datetime import datetime
import os

from db.database import get_db
from db.models import Books

class RequestData(BaseModel):
    book_name: str
    count: int
    
getBooksFromApi_router = APIRouter()

@getBooksFromApi_router.post("/get_books_from_api")
async def getBooksFromApi(request:RequestData):
    db_generator = get_db()
    db = next(db_generator)
    try:
        bookArray = []
        
        num_iter_float = request.count / 20
        num_iter_int = math.ceil(num_iter_float)
        print("request.count",request.count ,"num_iter",num_iter_float,num_iter_int)
        
        for page in range(num_iter_int):
            base_url = os.getenv('DATA_BASE_URL')
            url = f"{base_url}page={page + 1}&title={request.book_name}"
            response = requests.get(url).json()
            
            unique_books = []
            seen_ids = set()
            
            for book in response['message']:
                book_id = book['bookID']
                if book_id not in seen_ids:
                    unique_books.append(book)
                    seen_ids.add(book_id)
            
            bookArray.extend(unique_books)
            
            if (len(response['message']) < 20):
                print('less than needed')
                break
        
        books_length = len(bookArray)
        
        for index in range(request.count):
            book_index = index if index < books_length else index % books_length
            
            book = bookArray[book_index]
            results = db.query(Books).filter(Books.id == book['bookID']).first()
            
            if results:
                db.query(Books).where(Books.id == book['bookID']).update({
                    "copies_available" : results.to_dict()['copies_available'] + 1
                })
                db.commit()
            else:
                date_str = book['publication_date']
                date_object = datetime.strptime(date_str, '%m/%d/%Y').date()
                
                bookObj = Books(
                    id = book['bookID'],
                    title = book['title'],
                    authors = book['authors'],
                    average_rating = book['average_rating'],
                    isbn = book['isbn'],
                    isbn13 = book['isbn13'],
                    language_code = book['language_code'],
                    num_pages = book['  num_pages'],
                    ratings_count = book['ratings_count'],
                    text_reviews_count = book['text_reviews_count'],
                    publication_date = date_object,
                    publisher = book['publisher'],
                    copies_available = book.get('copies',1)
                )
                db.add(bookObj)
                db.commit()

        return { "message":"Imported books successfully" }
    except Exception as e:
        db.rollback()
        print("Error while importing options books:",e)
        # Return a custom JSON error response
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": "Error while importing books",
                "details": str(e)
            }
        )