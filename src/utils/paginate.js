exports.getPaginateInfo = (page, size) => {
    const limit = size ? +size: 10
    const offset = page ? page * limit: 0

    return {limit, offset}
}

exports.getPaginatedData = (allData, page, limit) => {
    const { count: totalItems, rows: data} = allData
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)

    return {totalItems, data, currentPage, totalPages}
}