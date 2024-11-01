from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from db.database import get_db
from db.models import Members

class RequestData(BaseModel):
    id : int
    
delete_members_router = APIRouter()

@delete_members_router.post("/delete_members")
async def delete_members(request:RequestData):
    try:
        
        db_generator = get_db()
        db = next(db_generator)

        member = db.query(Members).filter(Members.id == request.id).first()
        
        print("member",member)
        if not member:
            raise HTTPException(status_code=404, detail="Member not found")
        
        db.delete(member)
        db.commit()

        return { "message":"Deleted Member Successfully" }
    except Exception as e:
        print("Error while deleting member:",e)
        return {"message":"", "error":str(e)}