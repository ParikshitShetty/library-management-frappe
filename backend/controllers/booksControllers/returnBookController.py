from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime

from db.database import get_db
from db.models import Books, Members, Transactions

class RequestData(BaseModel):
    book_id : int
    member_id : int
    return_date : str
    
return_book_router = APIRouter()

@return_book_router.post("/return_book")
async def issue_Book(request: RequestData):
    db_generator = get_db()
    db = next(db_generator)
    try:
        dateArray = str(request.return_date).split('-')
        year, month, day = int(dateArray[0]), int(dateArray[1]), int(dateArray[2])
        return_date = datetime(year,month,day)            

        books = db.query(Books).where(Books.id == request.book_id).all()
        
        transactions = db.query(Transactions).where(Transactions.book_id == request.book_id, Transactions.member_id == request.member_id,Transactions.is_returned == False).all()
        
        if (len(transactions) == 0):
            return { "message":"Book is not issued" }
        
        db.query(Books).where(Books.id == request.book_id).update({
            "copies_available" : books[0].to_dict()['copies_available'] + 1
        })
        
        issue_date_str = str(transactions[0].to_dict()['issue_date']).split(' ')[0]
        issue_date = datetime.strptime(issue_date_str, "%Y-%m-%d") 
        # Calculate the difference in days.
        days_difference = (return_date - issue_date).days

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
            "outstanding_debt" : outstanding_debt,
            "books_issued" : members[0].books_issued - 1
        }) 

        db.commit()

        return { "message":"books returned" }
    except Exception as e:
        db.rollback()
        print(f"Error Returning book: {e}")
        return { "message":"Error while returning books", "error":str(e) }