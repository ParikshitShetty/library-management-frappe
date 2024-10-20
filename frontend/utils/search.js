const searchBooks = ({ books, searchText}) => {
    let searchResults = [];
    if (searchText !== "") {
        searchResults = books.filter(book => {
            return book.title.toLowerCase().includes(searchText.toLowerCase())
        });
    } else searchResults = books;
    return searchResults
}

const searchMembers = ({ members, searchText}) => {
    let searchResults = [];
    if (searchText !== "") {
        searchResults = members.filter(member => {
            return member.name.toLowerCase().includes(searchText.toLowerCase())
        });
    } else searchResults = members;
    return searchResults
}

export {
    searchBooks,
    searchMembers
}