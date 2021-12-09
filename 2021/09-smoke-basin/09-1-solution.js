// https://adventofcode.com/2021/day/9

// literally the ASCII char after 9
// https://www.asciitable.com/
const AFTER_NINE = ':'

function findLowPoints(numbersGrid) {
    const min = 0
    const rowMax = numbersGrid.length
    const itemMax = numbersGrid[0].length
    const lowPoints = []
    let sum = 0

    for (let r = min; r < rowMax; r++) {
        const row = numbersGrid[r]

        for (let i = min; i < itemMax; i++) {
            const item = row[i]
            const up = r === min ? AFTER_NINE : numbersGrid[r - 1][i]
            if (up <= item) continue

            const left = i === min ? AFTER_NINE : numbersGrid[r][i - 1]
            if (left <= item) continue

            const down = r < rowMax - 1 ? numbersGrid[r + 1][i] : AFTER_NINE
            if (down <= item) continue

            const right = i < itemMax - 1 ? numbersGrid[r][i + 1] : AFTER_NINE
            if (right <= item) continue

            const numItem = Number(item)
            lowPoints.push(numItem)
            sum += numItem + 1
        }
    }

    return [sum, lowPoints]
}

function solution(input) {
    return findLowPoints(input)[0]
}

module.exports = { findLowPoints, solution }
