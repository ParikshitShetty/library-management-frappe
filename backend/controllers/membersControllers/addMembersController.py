from fastapi import APIRouter
from pydantic import BaseModel

from db.database import get_db
from db.models import Members

class RequestData(BaseModel):
    name : str
    email : str
    phone : str

add_members_router = APIRouter()

@add_members_router.post("/add_members")
async def add_memebers(request:RequestData):
    db_generator = get_db()
    db = next(db_generator)
    
    try:
        membersData = db.query(Members).where(Members.name == request.name).all() 
        if len(membersData) > 0 : 
            return { "message":"Member already Present" }

        members = [
            Members(name=request.name, email=request.email, phone=request.phone)
        ]

        db.add_all(members)
        db.commit()
        return { "message":"Member added successfully", "members":members }
    except Exception as e:
        print("Error while adding users to Members:",e)
        return { "message":members, "error":str(e) }