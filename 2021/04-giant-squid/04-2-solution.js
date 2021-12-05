const { Board, NUMBER_MAPPER } = require('./04-1-solution')

const DEBUG = false

class StopAfterWinningBoard extends Board {
    constructor(data) {
        super(data)
        this.hasAlreadyWon = false
    }

    mark(number) {
        try {
            return super.mark(number)
        } catch (e) {
            this.hasAlreadyWon = true
            throw e
        }
    }

    call(number) {
        if (!this.has(number) || this.hasAlreadyWon) return
        return super.call(number)
    }
}

function solution(rawInput) {
    // pull bingo numbers
    const bingoNumbers = rawInput[0].split(',').map(NUMBER_MAPPER)

    // pull bingo boards
    const boards = []
    for (let lineNo = 2; lineNo < rawInput.length; lineNo += 6) {
        const nextBoardInput = rawInput.slice(lineNo, lineNo + 5)
        boards.push(new StopAfterWinningBoard(nextBoardInput))
    }

    // play game
    let winners = []
    for (let step = 0; step < bingoNumbers.length; step++) {
        const currentNumber = bingoNumbers[step]
        if (DEBUG) console.log('calling', currentNumber)

        boards.forEach((board, boardIndex) => {
            try {
                board.call(currentNumber)
            } catch {
                let winningScore = board.score(currentNumber)
                winners.push({
                    currentNumber,
                    boardIndex,
                    winningScore,
                })
            }
        })
    }

    if (DEBUG)
        winners.forEach(w => {
            console.log(w)
        })

    return winners.pop().winningScore
}

module.exports = { solution, StopAfterWinningBoard }
