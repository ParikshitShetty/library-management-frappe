from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta

from db.database import get_db
from db.models import Books, Members, Transactions

class RequestData(BaseModel):
    book_id : int
    member_id : int
    
return_book_router = APIRouter()

@return_book_router.post("/return_book")
async def issue_Book(request: RequestData):
    db_generator = get_db()
    db = next(db_generator)
    try:
        return_date = datetime.now()

        books = db.query(Books).where(Books.id == request.book_id).all()
        
        transactions = db.query(Transactions).where(Transactions.book_id == request.book_id, Transactions.member_id == request.member_id).all()
        
        db.query(Books).where(Books.id == request.book_id).update({
            "copies_available" : books[0].to_dict()['copies_available'] + 1
        })
        
        print(return_date,transactions[0].to_dict()['issue_date'])
        # Calculate the difference in days.
        days_difference = (return_date - transactions[0].to_dict()['issue_date']).days

        # Ensure that if the difference is 0, we return at least 1.
        days_difference = max(days_difference, 1)
        charge_per_day = 10

        print(f"Days difference: {days_difference}")
        
        rent_fee = days_difference * charge_per_day
        db.query(Transactions).where(Transactions.book_id == request.book_id, Transactions.member_id == request.member_id).update({
            "return_date" : return_date,
            "rent_fee" : rent_fee,
            "is_returned" : True
        })
        
        members = db.query(Members).where(Members.id == request.member_id).all()
        
        outstanding_debt = members[0].to_dict()['outstanding_debt'] + rent_fee
        db.query(Members).where(Members.id == request.member_id).update({
            "outstanding_debt" : outstanding_debt
        })

        db.commit()

        return { "message":"books returned" }
    except Exception as e:
        db.rollback()
        print(f"Error Returning book: {e}")
        return { "message":"Error while issuing books", "error":e }