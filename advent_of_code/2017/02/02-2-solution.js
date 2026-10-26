function getEvenlyDivisible(row) {
    let numbers = row.split('	').map(v => Number(v))
    for (let n = 0; n < numbers.length; n++) {
        let first = numbers[n]
        for (let m = n + 1; m < numbers.length; m++) {
            let second = numbers[m]
            let quotientNM = first / second
            let quotientMN = second / first
            if (Math.floor(quotientNM) == quotientNM) return quotientNM
            if (Math.floor(quotientMN) == quotientMN) return quotientMN
        }
    }

    throw new Error('should have found a passing quotient by now ;_;')
}

function getTotal(rows) {
    let sum = 0
    rows.forEach(r => (sum += getEvenlyDivisible(r)))
    return sum
}

module.exports = {
    getEvenlyDivisible: getEvenlyDivisible,
    getTotal: getTotal,
}
