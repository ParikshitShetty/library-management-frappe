from fastapi import APIRouter

from db.database import get_db
from db.models import Books

search_router = APIRouter()

@search_router.get("/search/{title}")
async def search_Books(title:str):
    db_generator = get_db()
    db = next(db_generator)
    
    results = db.query(Books).filter(Books.title.ilike(f"%{title}%")).all()
    
    return { "results" : results }