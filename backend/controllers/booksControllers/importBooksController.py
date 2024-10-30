from fastapi import APIRouter
from pydantic import BaseModel

from db.database import get_db
from db.models import Books

class RequestData(BaseModel):
    book_name: str
    count: int
    
import_books_router = APIRouter()

@import_books_router.post("/import_books")
async def import_books(request:RequestData):
    db_generator = get_db()
    db = next(db_generator)
    
    results = []
    print(results)
    return { "results" : results }