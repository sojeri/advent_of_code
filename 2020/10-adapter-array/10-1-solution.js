let { ascendingSort } = require('../../utils/js/sorts')

function solution(inputArray) {
    const theNumbers = inputArray.map(s => Number(s))
    theNumbers.sort(ascendingSort)

    let ones = 0
    let threes = 1 // from highest rated to my own device
    let prev = 0
    for (let i = 0; i < theNumbers.length; i++) {
        const current = theNumbers[i]
        if (prev + 1 === current) {
            ones++
        } else if (prev + 3 === current) {
            threes++
        } else {
            console.log(prev, current, i, theNumbers)
            throw new Error('invalid adapter coonfiguration')
        }

        prev = current
    }

    return ones * threes
}

module.exports = solution
