function createTracker(size) {
    let tracker = []
    for (let i = 0; i < size; i++) {
        tracker.push(i)
    }
    return tracker
}

function takeHalf(collection, instr, keepLower, keepHigher) {
    const halfies = Math.round(collection.length / 2)

    if (instr === keepLower) {
        return collection.slice(0, halfies)
    } else if (instr === keepHigher) {
        return collection.slice(halfies)
    }

    throw new Error('oh noes bad instruction')
}

function getSeatLocation(instructions) {
    let row = createTracker(128)
    let column = createTracker(8)

    let i = 0
    while (row.length > 1) {
        row = takeHalf(row, instructions[i], 'F', 'B')
        i++
    }

    while (column.length > 1) {
        column = takeHalf(column, instructions[i], 'L', 'R')
        i++
    }

    row = row.pop()
    column = column.pop()

    return { row, column }
}

function getSeatId({ row, column }) {
    return row * 8 + column
}

function solution(inputArray) {
    let maxSeatId = -1
    inputArray.forEach(boardingPass => {
        const seatLocation = getSeatLocation(boardingPass)
        const seatId = getSeatId(seatLocation)
        maxSeatId = seatId > maxSeatId ? seatId : maxSeatId
    })
    return maxSeatId
}

module.exports = {
    solution,
    takeHalf,
    getSeatLocation,
    getSeatId,
}
