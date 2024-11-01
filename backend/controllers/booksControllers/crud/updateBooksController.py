from fastapi import APIRouter
from pydantic import BaseModel

from db.database import get_db
from db.models import Books

class RequestData(BaseModel):
    id : int
    count : int

update_books_router = APIRouter()

@update_books_router.post("/update_books")
async def update_member(request:RequestData):
    db_generator = get_db()
    db = next(db_generator)
    
    try:
        membersData = db.query(Books).where(Books.id == request.id).all() 
        if len(membersData) == 0 : 
            return { "message":"Book doesn't Exist" }

        db.query(Books).where(Books.id == request.id).update({
            "copies_available" : request.count
        })

        db.commit()
        return { "message":"Book updated successfully" }
    except Exception as e:
        print("Error while updating members",e)
        return { "message":"Error while updating books", "error":str(e) }