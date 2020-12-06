const { getSeatLocation, getSeatId } = require('./05-1-solution')
const { ascendingSort } = require('../../utils/js/sorts')

function solution(inputArray) {
    const knownSeatIds = []
    inputArray.forEach(boardingPass => {
        const seatLocation = getSeatLocation(boardingPass)
        const seatId = getSeatId(seatLocation)
        knownSeatIds.push(seatId)
    })
    knownSeatIds.sort(ascendingSort)
    for (let i = 0; i + 1 < knownSeatIds.length; i++) {
        const leftSeatId = knownSeatIds[i]
        const rightSeatId = knownSeatIds[i + 1]
        if (leftSeatId + 2 === rightSeatId) {
            return leftSeatId + 1
        }
    }
    return -1
}

module.exports = solution
