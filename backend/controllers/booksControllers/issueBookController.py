from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

from db.database import get_db
from db.models import Books, Members, Transactions

class RequestData(BaseModel):
    book_id : int
    member_id : int
    
issue_book_router = APIRouter()

@issue_book_router.post("/issue_book")
async def issue_Book(request: RequestData):
    db_generator = get_db()
    db = next(db_generator)
    try:
        issue_date = datetime.now().date()

        books = db.query(Books).where(Books.id == request.book_id).all()

        if len(books) > 0 and books[0].to_dict()['copies_available'] == 0:
            return { "message" : "Book is out of stock" }
    
        members = db.query(Members).where(Members.id == request.member_id).all()
        
        if len(members) > 0 and members[0].to_dict()['outstanding_debt'] > 500:
            return { "message" : "Please clear the outstanding debt first" }

        transaction = Transactions(member_id = request.member_id, book_id = request.book_id, issue_date=issue_date)

        # Reduce the count as well in books table
        db.query(Books).where(Books.id == request.book_id).update({
            "copies_available" : books[0].to_dict()['copies_available'] - 1
        })

        db.add(transaction)
        db.commit()

        return { "message":"Issued books to member" }
    except Exception as e:
        db.rollback()
        print(f"Error Issuing book: {e}")
        return { "message":"Error while issuing books", "error":e }