// https://adventofcode.com/2021/day/5#part2
const { NUMBER_MAPPER } = require('../04-giant-squid/04-1-solution')

/**
 *
 * An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
 * An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
 * For now, only consider horizontal and vertical lines:
 *   lines where either x1 = x2 or y1 = y2.
 */

const createGrid = (size = 1000) => {
    const column = []
    for (let c = 0; c < size; c++) {
        column.push(0)
    }

    const grid = []
    for (let r = 0; r < size; r++) {
        grid.push([...column])
    }

    return grid
}

const printg = grid => {
    console.log('printing grid!')
    grid.forEach(row => {
        console.log(
            row
                .map(v => {
                    return v === 0 ? '.' : v
                })
                .join(' ')
        )
    })
}

const parseLine = line => {
    const parts = line.split(' -> ')
    const firstCoord = parts[0].split(',').map(NUMBER_MAPPER)
    const secondCoord = parts[1].split(',').map(NUMBER_MAPPER)
    return [...firstCoord, ...secondCoord]
}

function solution(rawInput, debug = false) {
    const grid = createGrid()
    if (debug) printg(grid)
    rawInput.forEach(rawLine => {
        // pull coords
        const [x1, y1, x2, y2] = parseLine(rawLine)

        // process vertical line
        if (x1 === x2) {
            const isOneStart = y2 > y1
            let start = isOneStart ? y1 : y2
            const stop = isOneStart ? y2 : y1
            if (debug) {
                console.log(
                    `found vertical line ${x1}, ${y1} => ${x2}, ${y2}; drawing line ${x1} from ${start} to ${stop}`
                )
            }
            while (start <= stop) {
                grid[start][x1] += 1
                start++
            }
            if (debug) printg(grid)

            // process horizontal line
        } else if (y1 === y2) {
            const isOneStart = x2 > x1
            let start = isOneStart ? x1 : x2
            const stop = isOneStart ? x2 : x1
            if (debug) {
                console.log(
                    `found horizontal line ${x1}, ${y1} => ${x2}, ${y2}; drawing line ${y1} from ${start} to ${stop}`
                )
            }
            while (start <= stop) {
                grid[y1][start] += 1
                start++
            }
            if (debug) printg(grid)

            // process diagonal line
        } else {
            const shouldDecrementX = x2 < x1
            const shouldDecrementY = y2 < y1
            const shouldContinue = (name, isDown, iterator, compareVal) => {
                if (isDown) {
                    if (debug) {
                        console.log(`${name} going down`, iterator, compareVal, iterator >= compareVal)
                    }
                    return iterator >= compareVal
                } else {
                    if (debug) {
                        console.log(`${name} going up`, iterator, compareVal, iterator <= compareVal)
                    }
                    return iterator <= compareVal
                }
            }
            let xStart = x1
            let yStart = y1
            if (debug) {
                console.log(`found diagonal line ${x1}, ${y1} => ${x2}, ${y2}`)
            }
            while (
                shouldContinue('x', shouldDecrementX, xStart, x2) &&
                shouldContinue('y', shouldDecrementY, yStart, y2)
            ) {
                if (debug) console.log(`drawing point ${xStart},${yStart}`)
                grid[yStart][xStart] += 1
                xStart = shouldDecrementX ? xStart - 1 : xStart + 1
                yStart = shouldDecrementY ? yStart - 1 : yStart + 1
            }
            if (debug) printg(grid)
        }
    })

    let multipleLinePixels = 0
    grid.forEach(row => {
        row.forEach(item => {
            if (item > 1) multipleLinePixels += 1
        })
    })

    return multipleLinePixels
}

module.exports = solution
