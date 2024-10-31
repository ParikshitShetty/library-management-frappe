from fastapi import APIRouter
from pydantic import BaseModel

from db.database import get_db
from db.models import Members

class RequestData(BaseModel):
    id : int
    name : str
    email : str
    phone : str

update_members_router = APIRouter()

@update_members_router.post("/update_members")
async def update_member(request:RequestData):
    db_generator = get_db()
    db = next(db_generator)
    
    try:
        membersData = db.query(Members).where(Members.id == request.id).all() 
        if len(membersData) == 0 : 
            return { "message":"Member doesn't Present" }

        db.query(Members).where(Members.id == request.id).update({
            "name" : request.name,
            "email" : request.email,
            "phone": request.phone
        })

        db.commit()
        return { "message":"Member updated successfully" }
    except Exception as e:
        print("Error while updating members",e)
        return { "message":"Error while updating members", "error":str(e) }