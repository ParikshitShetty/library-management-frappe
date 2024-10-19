from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class BookSchema(BaseModel):
    id: int
    title: str
    authors: str
    average_rating: Optional[float] = None
    isbn: Optional[int] = None
    isbn13: Optional[int] = None
    language_code: Optional[str] = None
    num_pages: Optional[int] = None
    ratings_count: int
    text_reviews_count: int
    publication_date: Optional[date] = None
    publisher: Optional[str] = None
    copies_available: int
    
class MemberSchema(BaseModel):
    id: int
    name: Optional[str] = None
    email: str
    phone: Optional[str] = None
    outstanding_debt: float

class TransactionSchema(BaseModel):
    id: int
    member_id: int
    book_id: int
    issue_date: datetime
    return_date: Optional[datetime] = None
    rent_fee: float
    is_returned: bool