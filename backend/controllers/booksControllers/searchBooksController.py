from fastapi import APIRouter

from db.database import get_db
from db.models import Books

search_router = APIRouter()

@search_router.get("/search/{param}/{query}")
async def search_Books(param:str, query:str):
    db_generator = get_db()
    db = next(db_generator)
    
    results = []
    if param == "name":
        results = db.query(Books).filter(Books.title.ilike(f"%{query}%")).all()
    else:
        results = db.query(Books).filter(Books.authors.ilike(f"%{query}%")).all()
    print(results)
    return { "results" : results }