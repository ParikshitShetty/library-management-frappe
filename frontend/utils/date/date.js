const getDate = (date) => {
    if (!date) return 'N.A'
    const dateArray = date.split('T')
    return dateArray[0]
}

export {
    getDate
}