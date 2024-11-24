const baseUrl = import.meta.env.VITE_BASE_URL;

export const endpoints = {
    search : baseUrl + import.meta.env.VITE_SEARCH_URL,
    get_books_from_api : baseUrl + import.meta.env.VITE_GET_BOOKS_FROM_API_URL,
    books : {
        get_books : baseUrl + import.meta.env.VITE_GET_BOOKS_URL,
        issue_book : baseUrl + import.meta.env.VITE_ISSUE_BOOK_URL,
        return_book : baseUrl + import.meta.env.VITE_RETURN_BOOK_URL,
        delete_books : baseUrl + import.meta.env.VITE_DELETE_BOOKS_URL,
        update_books : baseUrl + import.meta.env.VITE_UPDATE_BOOKS_URL,
        add_books : baseUrl + import.meta.env.VITE_ADD_BOOKS_URL,
    },
    members : {
        get_members : baseUrl + import.meta.env.VITE_GET_MEMBERS_URL,
        add_members : baseUrl + import.meta.env.VITE_ADD_MEMBERS_URL,
        update_members : baseUrl + import.meta.env.VITE_UPDATE_MEMBERS_URL,
        delete_members : baseUrl + import.meta.env.VITE_DELETE_MEMBERS_URL,
    },
    transactions : {
        get_transactions : baseUrl + import.meta.env.VITE_GET_TRANSACTION_URL,
        get_member_transactions : baseUrl +import.meta.env.VITE_GET_MEMBER_TRANSACTION_URL,
    },
}