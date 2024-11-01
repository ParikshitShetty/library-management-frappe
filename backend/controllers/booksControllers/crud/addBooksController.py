from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from datetime import datetime

from db.database import get_db
from db.models import Books

class RequestData(BaseModel):
    title : str
    authors : str
    average_rating : float
    isbn : int
    isbn13 : int
    language_code : str
    num_pages : int
    ratings_count : int
    text_reviews_count : int
    publication_date : str
    publisher : str
    copies_available : int

add_books_router = APIRouter()

@add_books_router.post("/add_books")
async def add_books(request:RequestData):
    db_generator = get_db()
    db = next(db_generator)
            
    try:
        booksData = db.query(Books).where(Books.title == request.title).all() 
        if len(booksData) > 0 : 
            return { "message":"Book already Present" }
        
        dateArray = str(request.publication_date).split('-')
        year, month, day = int(dateArray[0]), int(dateArray[1]), int(dateArray[2])
        publication_date = datetime(year,month,day)
        
        print("requestData",request)

        book = [
            Books(
                title=request.title, 
                authors=request.authors, 
                average_rating=request.average_rating,
                isbn=request.isbn,
                isbn13=request.isbn13,
                language_code=request.language_code,
                num_pages=request.num_pages,
                ratings_count=request.ratings_count,
                text_reviews_count=request.text_reviews_count,
                publication_date=publication_date,
                publisher=request.publisher,
                copies_available=request.copies_available
            )
        ]

        db.add_all(book)
        db.commit()
        return { "message":"Book added successfully" }
    except Exception as e:
        db.rollback()
        print("Error while adding books:",e)
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": "Error while adding books",
                "details": str(e)
            }
        )