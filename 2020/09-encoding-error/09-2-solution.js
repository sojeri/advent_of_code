function findMinMax(array) {
    let min = array[0]
    let max = array[0]
    array.forEach(n => {
        min = n < min ? n : min
        max = n > max ? n : max
    })

    return { min, max }
}

function solution(inputArray, desiredSum = 373803594) {
    const theNumbers = inputArray.map(s => Number(s))
    for (let i = 0; i < theNumbers.length; i++) {
        let sum = theNumbers[i]
        for (let j = i + 1; sum <= desiredSum && j < theNumbers.length; j++) {
            if (sum === desiredSum) {
                const sumParts = theNumbers.slice(i, j)
                const { min, max } = findMinMax(sumParts)
                return min + max
            }
            sum += theNumbers[j]
        }
    }

    return -1
}

module.exports = solution
