# Library Manager

"A library management system built with FastAPI, React and SQLite".

---

## Table of Contents

1. [About the Project](#about-the-project)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Images](#images)

---

## About the Project
  
The Library Management Web Application is designed to streamline the operations of a local library, enabling librarians to efficiently manage books, track member transactions, and maintain overall inventory. This web      application simplifies the process of managing library resources, ensuring that librarians can focus more on serving their members rather than administrative tasks.


## Technologies Used

- **Backend**: Python, FastAPI
- **Database**: SQLite
- **Frontend**: React.js
- **Deployment**: Docker

### Prerequisites

- Python 3.10 or higher
- Docker (optional but recommended)
- Node.js and npm

## Features

### Base Library System

The application provides the following core functionalities:

- ***Book Management***: Maintain a comprehensive list of books, including details such as title, author, and available stock.
- ***Member Management***: Keep track of library members, their contact information, and their borrowing history.
- ***Transaction Management***: Record transactions for books issued to and returned by members.
- Librarians can import books into the system from external sources to easily update and expand the library's inventory.

### Use Cases

The following use cases are implemented within the application:

- ***CRUD Operations***: Perform Create, Read, Update, and Delete operations on both books and members.
- ***Book Issuance***: Issue a book to a member, updating the stock and transaction records accordingly.
- ***Book Returns***: Process the return of a book from a member, updating the stock and charging any applicable fees.
- ***Search Functionality***: Search for books by title or author to quickly locate specific items in the library's inventory.
- ***Fee Management***: Charge a rental fee upon book return and ensure that no member has an outstanding debt exceeding Rs. 500.

## Installation

1. **Clone the Repository**
   ```bash
   https://github.com/ParikshitShetty/library-management-frappe.git
   ```
   ```
   cd library-management-frappe
   ```
2. **Run the Docker Command to run the application**
   ```bash
   docker compose up --build -d
   ```
- Note: Please chnage the volume mapping of the library.db file to to your current_working_directory/backend/library.db in volumes sections of the docker-compose.yml

## Usage

Access the Application using the below links once the docker conatiners are up and running

- Backend API Docs: 
    ``` http://localhost:8000/docs ```
- Frontend:
    ``` http://localhost:5173 ```

## Images

### Books List
![Books List](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/books_list.jpg)

### Add Books
![Add Books](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/add_books.jpg)

### Edit Books
![Edit Books](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/edit_books.jpg)

### Members List
![Books List](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/members_list.jpg)

### Add Members
![Add Members](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/add_members.jpg)

### Edit Members
![Edit Members](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/edit_members.jpg)

### Transactions List
![Transactions List](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/transactions.jpg)

### Issue Book
![Issue Book](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/issue_book.jpg)

### Return Book
![Return Book](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/return_book.jpg)

### Import Books
![Import Books](https://github.com/ParikshitShetty/library-management-frappe/blob/main/images/import_books.jpg)
