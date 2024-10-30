from fastapi import APIRouter

from db.database import get_db
from db.models import Transactions

list_transactions_router = APIRouter()

@list_transactions_router.get("/transactions")
async def get_books():
    db_generator = get_db()
    db = next(db_generator)
    transactions = db.query(Transactions).all()
    return { "transactions":transactions }