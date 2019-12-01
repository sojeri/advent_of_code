function getRowDiff(row) {
    let numbers = row.split('	').map(v => Number(v))
    let min = numbers[0]
    let max = min
    numbers.forEach(n => {
        if (min > n) min = n
        if (max < n) max = n
    })

    return max - min
}

function getTotalDiff(rows) {
    let sum = 0
    rows.forEach(r => (sum += getRowDiff(r)))
    return sum
}

module.exports = {
    getRowDiff: getRowDiff,
    getTotalDiff: getTotalDiff,
}
