export const endpoints = {
    search : import.meta.env.VITE_SEARCH_URL,
    get_books_from_api : import.meta.env.VITE_GET_BOOKS_FROM_API_URL,
    books : {
        get_books : import.meta.env.VITE_GET_BOOKS_URL,
        issue_book : import.meta.env.VITE_ISSUE_BOOK_URL,
        return_book : import.meta.env.VITE_RETURN_BOOK_URL,
        delete_books : import.meta.env.VITE_DELETE_BOOKS_URL,
        update_books : import.meta.env.VITE_UPDATE_BOOKS_URL,
        add_books : import.meta.env.VITE_ADD_BOOKS_URL,
    },
    members : {
        get_members : import.meta.env.VITE_GET_MEMBERS_URL,
        add_members : import.meta.env.VITE_ADD_MEMBERS_URL,
        update_members : import.meta.env.VITE_UPDATE_MEMBERS_URL,
        delete_members : import.meta.env.VITE_DELETE_MEMBERS_URL,
    },
    transactions : {
        get_transactions : import.meta.env.VITE_GET_TRANSACTION_URL,
        get_member_transactions :import.meta.env.VITE_GET_MEMBER_TRANSACTION_URL,
    },
}