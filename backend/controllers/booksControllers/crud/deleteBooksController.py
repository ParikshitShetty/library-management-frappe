from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from db.database import get_db
from db.models import Books

class RequestData(BaseModel):
    id : int
    
delete_books_router = APIRouter()

@delete_books_router.post("/delete_books")
async def delete_books(request:RequestData):
    try:
        
        db_generator = get_db()
        db = next(db_generator)

        member = db.query(Books).filter(Books.id == request.id).first()
        
        print("member",member)
        if not member:
            raise HTTPException(status_code=404, detail="Member not found")
        
        db.delete(member)
        db.commit()

        return { "message":"Deleted book Successfully" }
    except Exception as e:
        print("Error while deleting member:",e)
        return JSONResponse(
            status_code=500,
            content={
                "error": True,
                "message": "Error while deleting books books",
                "details": str(e)
            }
        )