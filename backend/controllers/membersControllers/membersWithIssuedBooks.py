from fastapi import APIRouter
from pydantic import BaseModel

from db.database import get_db
from db.models import Transactions, Books

class RequestData(BaseModel):
    member_id : int

member_with_issued_books_router = APIRouter()

@member_with_issued_books_router.post("/member_with_issued_books")
async def member_with_issued_books(request:RequestData):
    try:
        db_generator = get_db()
        db = next(db_generator)
        transactions = db.query(Transactions).where(Transactions.member_id == request.member_id, Transactions.is_returned == False).all()
        
        books = []
        for transaction in transactions:
            book = db.query(Books).filter(Books.id == transaction.book_id).first()
            print(book)
            if book:
                books.append(book)
        return { "books":books }
    except Exception as e:
        print("Error while getting memeber detail:",e)
        return {"error":str(e)}