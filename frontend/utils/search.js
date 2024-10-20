const search = ({ original, searchText}) => {
    let searchResults = [];
    if (searchText !== "") {
        searchResults = original.filter(book => {
            return book.title.toLowerCase().includes(searchText.toLowerCase())
        });
    } else searchResults = original;
    return searchResults
}

export {
    search
}