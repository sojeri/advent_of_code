const { takeHalf, getSeatLocation, getSeatId } = require('./05-1-solution')

function solution(inputArray) {
    const knownSeatIds = []
    inputArray.forEach(boardingPass => {
        const seatLocation = getSeatLocation(boardingPass)
        const seatId = getSeatId(seatLocation)
        knownSeatIds.push(seatId)
    })
    knownSeatIds.sort().forEach(seatId => {
        console.log(seatId)
    })
    return 'lolsob'
}

module.exports = solution
