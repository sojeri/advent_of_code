function ascendingSort(a, b) {
    return a - b
}

function descendingSort(a, b) {
    return b - a
}

function ascendingFieldSort(a, b, field) {
    return a[field] - b[field]
}

function descendingFieldSort(a, b, field) {
    return b[field] - a[field]
}

module.exports = {
    ascendingSort,
    ascendingFieldSort,
    descendingSort,
    descendingFieldSort,
}
