export const endpoints = {
    get_books : import.meta.env.VITE_GET_BOOKS_URL,
    get_members : import.meta.env.VITE_GET_MEMBERS_URL,
    get_transactions : import.meta.env.VITE_GET_TRANSACTION_URL,
    search : import.meta.env.VITE_SEARCH_URL,
    issue_book : import.meta.env.VITE_ISSUE_BOOK_URL,
    return_book : import.meta.env.VITE_RETURN_BOOK_URL,
    get_member_trnsactions :import.meta.env.VITE_GET_MEMBER_TRANSACTION_URL
}