from fastapi import APIRouter

from db.database import get_db
from db.models import Members

list_members_router = APIRouter()

@list_members_router.get("/members")
async def get_books():
    db_generator = get_db()
    db = next(db_generator)
    members = db.query(Members).all()
    return { "members":members }