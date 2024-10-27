const getDate = (date) => {
    const dateArray = date.split('T')
    return dateArray[0]
}

export {
    getDate
}