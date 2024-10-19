from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests
from datetime import datetime
import os
from dotenv import load_dotenv

# Load Environment variable
load_dotenv()

from db.database import create_database, get_db
from db.models import Books, Members, Transactions

# Import Services
from services.booksServices.importBooks import importBooks

# Import Controllers
from controllers.booksControllers.searchBooks import search_router

create_database()

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

# Import the files 
importBooks()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/books")
async def get_books(db: Session = Depends(get_db)):
    books = db.query(Books).all()
    return { "books":books }

# Endpoint to Search
app.include_router(search_router)