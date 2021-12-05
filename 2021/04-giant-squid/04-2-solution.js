let { parse, NUMBER_MAPPER } = require('./04-2-solution')

const DEBUG = false

class Board {
    constructor(data) {
        const [parsedData, rawBoard, numbers] = parse(data)
        this.data = parsedData
        this.visual = rawBoard
        this.numbers = numbers
        this.rows = [0, 0, 0, 0, 0]
        this.columns = [0, 0, 0, 0, 0]
        this.called = []
        this.hasAlreadyWon = false
    }

    has(number) {
        return this.data[number]
    }

    mark(number) {
        const rowToUpdate = this.data[number].row
        this.rows[rowToUpdate] += 1

        const columnToUpdate = this.data[number].column
        this.columns[columnToUpdate] += 1

        this.visual[rowToUpdate][columnToUpdate] = 'X'

        if (this.rows[rowToUpdate] === 5 || this.columns[columnToUpdate] === 5) {
            this.hasAlreadyWon = true
            throw new Error(`BINGO when calling ${number}`)
        }
    }

    call(number) {
        if (!this.has(number) || this.hasAlreadyWon) return
        this.called.push(number)
        this.mark(number)
    }

    score(initial) {
        let remainingSum = 0
        if (DEBUG) console.log('scoring board that won at', initial)
        if (DEBUG) console.log(this.visual)

        this.numbers.forEach(num => {
            if (!this.called.includes(num)) {
                remainingSum += num
                if (DEBUG) console.log(`adding ${num} to sum. now it's ${remainingSum}`)
            }
        })

        return initial * remainingSum
    }
}

function solution(rawInput) {
    // pull bingo numbers
    const bingoNumbers = rawInput[0].split(',').map(NUMBER_MAPPER)

    // pull bingo boards
    const boards = []
    for (let lineNo = 2; lineNo < rawInput.length; lineNo += 6) {
        const nextBoardInput = rawInput.slice(lineNo, lineNo + 5)
        boards.push(new Board(nextBoardInput))
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

module.exports = { solution, Board }
