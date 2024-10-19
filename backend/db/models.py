from sqlalchemy import Column, Integer, String, Float, Date, DateTime, Boolean, ForeignKey

from db.database import Base

class Books(Base):
    __tablename__ = "books"
    
    id = Column(Integer, primary_key=True, index=False)
    title = Column(String, nullable=False)
    authors = Column(String, nullable=False)
    average_rating = Column(Float, nullable=True)
    isbn = Column(Integer, nullable=True)
    isbn13 = Column(Integer, nullable=True)
    language_code = Column(String, nullable=True)
    num_pages = Column(Integer, nullable=True)
    ratings_count = Column(Integer, default=0)
    text_reviews_count = Column(Integer, default=0)
    publication_date = Column(Date, nullable=True)
    publisher = Column(String, nullable=True)
    copies_available = Column(Integer, nullable=False, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "authors": self.authors,
            "average_rating": self.average_rating,
            "isbn": self.isbn,
            "isbn13": self.isbn13,
            "language_code": self.language_code,
            "num_pages": self.num_pages,
            "ratings_count": self.ratings_count,
            "text_reviews_count": self.text_reviews_count,
            "publication_date": self.publication_date,
            "publisher": self.publisher,
            "copies_available": self.copies_available,
        }
class Members(Base):
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=True)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, unique=True, nullable=True)
    outstanding_debt = Column(Float, default=0.0)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "outstanding_debt": self.outstanding_debt,
        }
        
class Transactions(Base):
    __tablename__ = "tranasction"

    id = Column(Integer, primary_key=True, autoincrement=True)
    member_id = Column(Integer, ForeignKey('members.id'), nullable=False)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    issue_date = Column(DateTime, nullable=False)
    return_date = Column(DateTime, nullable=True)
    rent_fee =  Column(Float, default=0.0)
    is_returned = Column(Boolean, default=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "member_id": self.member_id,
            "book_id": self.book_id,
            "issue_date": self.issue_date,
            "return_date": self.return_date,
            "rent_fee": self.rent_fee,
            "is_returned": self.is_returned
        }