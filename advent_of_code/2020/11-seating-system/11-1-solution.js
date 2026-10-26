const { cloneDeep, clone } = require('lodash')

const EMPTY = 'L'
const OCCUPIED = '#'
const FLOOR = '.'

/**
 *
 * @param {*} initialArr the starting seating arrangement, eg rows like #.LL.LL.L#
 * @param {*} initialAdjMtx the starting adjacency deets, eg 1.00.00.25
 * @param {*} initialOccupiedCount the starting number of occupied seats, eg 25
 */
function processRound(initialArr, initialAdjMtx, initialOccupiedCount = 0) {
    const nextArr = cloneDeep(initialArr)
    const nextAdjMtx = cloneDeep(initialAdjMtx)
    const rowMax = nextArr.length - 1
    const colMax = nextArr[0].length - 1
    let hasAnythingChanged = false

    /**
     * updates adjacency counts in the adjacency matrix
     * eg U U U,
     *    U X U,
     *    U U U, where the Us are the adjacency counts to be updated.
     * so when X becomes empty, they all lose one.
     * if x becomes occupied, they all gain one.
     * except if any U is FLOOR it remains FLOOR.
     * @param {*} rowIndex the row of X
     * @param {*} colIndex the col of X
     * @param {*} valueChange what value adjacent seats must gain or lose (1 or -1)
     */
    function updateSeatAdjacency(rowIndex, colIndex, valueChange) {
        hasAnythingChanged = true

        const rowStart = rowIndex - 1 >= 0 ? rowIndex - 1 : rowIndex
        const colStart = colIndex - 1 >= 0 ? colIndex - 1 : colIndex
        const rowStop = rowIndex + 1 > rowMax ? rowMax : rowIndex + 1
        const colStop = colIndex + 1 > colMax ? colMax : colIndex + 1
        for (let r = rowStart; r <= rowStop; r++) {
            for (let c = colStart; c <= colStop; c++) {
                if (r === rowIndex && c === colIndex) {
                    continue // don't update X
                }

                const currentValue = nextAdjMtx[r][c]
                if (currentValue === FLOOR) {
                    continue // don't update floor, either
                }

                // if we make it this far, we should update
                const newValue = currentValue + valueChange
                if (newValue < 0 || newValue > 8) {
                    // unless it's an invalid value
                    throw new Error(
                        `attempting to change adjacency count to an illegal value: ${nextAdjMtx[r][c]} + ${valueChange} = ${newValue} @ r${r},c${c}`
                    )
                }
                nextAdjMtx[r][c] = newValue
            }
        }
    }

    let occupiedCount = initialOccupiedCount
    for (let rowIndex = 0; rowIndex < initialArr.length; rowIndex++) {
        const row = initialArr[rowIndex]
        for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
            const seat = initialArr[rowIndex][seatIndex]
            const adjacencyCount = initialAdjMtx[rowIndex][seatIndex]
            if (seat === FLOOR) {
                continue
            }

            if (seat === OCCUPIED) {
                if (adjacencyCount >= 4) {
                    nextArr[rowIndex][seatIndex] = EMPTY
                    occupiedCount--
                    updateSeatAdjacency(rowIndex, seatIndex, -1)
                }
            } else if (seat === EMPTY) {
                if (adjacencyCount === 0) {
                    nextArr[rowIndex][seatIndex] = OCCUPIED
                    occupiedCount++
                    updateSeatAdjacency(rowIndex, seatIndex, 1)
                }
            }
        }
    }

    return { nextArr, nextAdjMtx, occupiedCount, hasAnythingChanged }
}

function log(matrix, roundMarker) {
    console.log('\n\n\nround', roundMarker, '\n')
    matrix.forEach(row => {
        console.log(row.join(''))
    })
}

function solution(inputArray) {
    let currentSeatingArrangement = []
    let currentAdjacencyMatrix = inputArray.map(row => {
        const rowArray = row.split('')
        currentSeatingArrangement.push(rowArray)
        return rowArray.map(seat => {
            switch (seat) {
                case EMPTY:
                    return 0
                case FLOOR:
                    return FLOOR
                case OCCUPIED:
                    throw new Error('initial setup should be only empty seats and floor')
            }
        })
    })

    let occupiedCount = 0
    while (true) {
        // log(currentSeatingArrangement, rounds)
        // log(currentAdjacencyMatrix, rounds)

        const results = processRound(currentSeatingArrangement, currentAdjacencyMatrix, occupiedCount)
        if (!results.hasAnythingChanged) {
            return occupiedCount
        }

        currentSeatingArrangement = results.nextArr
        currentAdjacencyMatrix = results.nextAdjMtx
        occupiedCount = results.occupiedCount
    }
}

module.exports = solution
