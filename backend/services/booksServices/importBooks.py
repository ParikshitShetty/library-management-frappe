import os
from datetime import datetime
import requests

from db.models import Books
from db.database import get_db

def importBooks():
    try:
        db_generator = get_db()
        db = next(db_generator)
        
        booksData = db.query(Books).all()
        
        if len(booksData) > 0 : 
            print("Books already imported")
            return
        
        url = os.getenv('DATA_IMPORT_URL')
        response = requests.get(url)
        books = response.json()['message']

        for book_data in books:
            date_str = book_data['publication_date']
            date_object = datetime.strptime(date_str, '%m/%d/%Y').date()
            print(date_object) 
            
            book = Books(
                id = book_data['bookID'],
                title = book_data['title'],
                authors = book_data['authors'],
                average_rating = book_data['average_rating'],
                isbn = book_data['isbn'],
                isbn13 = book_data['isbn13'],
                language_code = book_data['language_code'],
                num_pages = book_data['  num_pages'],
                ratings_count = book_data['ratings_count'],
                text_reviews_count = book_data['text_reviews_count'],
                publication_date = date_object,
                publisher = book_data['publisher'],
                copies_available = book_data.get('copies',1)
            )
            db.add(book)
        db.commit()
        print("Books imported successfully")
        return
    except Exception as e:
        print("Exception while inserting database:",e)
        return { "error":str(e) }
    finally:
        db_generator.close()