from fastapi import APIRouter

from db.database import get_db
from db.models import Books

list_books_router = APIRouter()

@list_books_router.get("/books")
async def get_books():
    db_generator = get_db()
    db = next(db_generator)
    books = db.query(Books).all()
    return { "books":books }