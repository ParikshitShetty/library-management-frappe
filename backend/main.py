from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests
from datetime import datetime
import os
from dotenv import load_dotenv

# Load Environment variable
load_dotenv()

from db.database import engine, SessionLocal
from db.models import Base, Books
from db.schema import BookSchema

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/books")
async def get_books(db: Session = Depends(get_db)):
    books = db.query(Books).all()
    return { "books":books }

@app.get("/import_books")
async def import_books(db: Session = Depends(get_db)):
    try:
        url = os.getenv('DATA_IMPORT_URL')
        response = requests.get(url)
        books = response.json()['message']
    
        for book_data in books:
            date_str = book_data['publication_date']
            date_object = datetime.strptime(date_str, '%m/%d/%Y').date()
            print(date_object) 
            
            book = Books(
                id = book_data['bookID'],
                title = book_data['title'],
                authors = book_data['authors'],
                average_rating = book_data['average_rating'],
                isbn = book_data['isbn'],
                isbn13 = book_data['isbn13'],
                language_code = book_data['language_code'],
                num_pages = book_data['  num_pages'],
                ratings_count = book_data['ratings_count'],
                text_reviews_count = book_data['text_reviews_count'],
                publication_date = date_object,
                publisher = book_data['publisher'],
                # copies_available = book_data.get('copies',0)
            )
            db.add(book)
        db.commit()
        return {"message": "Books imported successfully", "books": books}
    except Exception as e:
        print("Exception while inserting database:",e)
        return { "error":str(e) }