from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load Environment variable
load_dotenv()

from db.database import create_database

# Import Services
from services.booksServices.importBooks import importBooks
from services.membersServices.addInitMembers import add_members

# Import Controllers
from controllers.booksControllers.searchBooksController import search_router
from controllers.booksControllers.issueBookController import issue_book_router
from controllers.booksControllers.returnBookController import return_book_router
from controllers.booksControllers.api.getBooksFromApiController import getBooksFromApi_router
# Books CRUD
from controllers.booksControllers.crud.listBooksController import list_books_router
from controllers.booksControllers.crud.deleteBooksController import delete_books_router
from controllers.booksControllers.crud.updateBooksController import update_books_router
from controllers.booksControllers.crud.addBooksController import add_books_router

from controllers.transactionsControllers.listTransactionsController import list_transactions_router

from controllers.membersControllers.membersWithIssuedBooks import member_with_issued_books_router
# Members CRUD
from controllers.membersControllers.crud.listMembersController import list_members_router
from controllers.membersControllers.crud.addMembersController import add_members_router
from controllers.membersControllers.crud.deleteMembersController import delete_members_router
from controllers.membersControllers.crud.updateMembersController import update_members_router

create_database()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://library-management-frappe.vercel.app",
    "https://library-manageme-git-24ed74-parikshit-shettys-projects-7026150a.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import the books and add members 
importBooks()
add_members()

@app.get("/")
async def root():
    return {"message": "Api is working"}

# Endpoint to Search
app.include_router(search_router)

# Books Controllers
app.include_router(issue_book_router)
app.include_router(return_book_router)
app.include_router(getBooksFromApi_router)
app.include_router(list_books_router)
app.include_router(add_books_router)
app.include_router(delete_books_router)
app.include_router(update_books_router)

# Transactions Controllers
app.include_router(list_transactions_router)

# Members Controllers
app.include_router(list_members_router)
app.include_router(member_with_issued_books_router)
app.include_router(add_members_router)
app.include_router(delete_members_router)
app.include_router(update_members_router)