const NUMBERS_MATCHER = /\d+/g
const NUMBER_MAPPER = s => Number(s)

function parseLine(rawRow) {
    ;/\d+/g
    return rawRow.match(NUMBERS_MATCHER).map(NUMBER_MAPPER)
}

function parse(data) {
    const output = {}
    const visualBoard = []
    const numbers = []
    data.forEach((rawRowData, rowIndex) => {
        const row = parseLine(rawRowData)
        visualBoard.push([...row])
        row.forEach((item, itemIndex) => {
            numbers.push(item)
            output[item] = {
                row: rowIndex,
                column: itemIndex,
            }
        })
    })
    return [output, visualBoard, numbers]
}

class Board {
    constructor(data, debug = false) {
        const [parsedData, rawBoard, numbers] = parse(data)
        this.debug = debug
        this.data = parsedData
        this.visual = rawBoard
        this.numbers = numbers
        this.rows = [0, 0, 0, 0, 0]
        this.columns = [0, 0, 0, 0, 0]
        this.called = []
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
            throw new Error(`BINGO when calling ${number}`)
        }
    }

    call(number) {
        if (!this.has(number)) return
        this.called.push(number)
        this.mark(number)
    }

    score(initial) {
        let remainingSum = 0
        if (this.debug) console.log('scoring board that won at', initial)
        if (this.debug) console.log(this.visual)

        this.numbers.forEach(num => {
            if (!this.called.includes(num)) {
                remainingSum += num
                if (this.debug) console.log(`adding ${num} to sum. now it's ${remainingSum}`)
            }
        })

        return initial * remainingSum
    }
}

function solution(rawInput, debug = false) {
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
    let winningScore = -1
    for (let step = 0; step < bingoNumbers.length; step++) {
        const currentNumber = bingoNumbers[step]
        if (debug) console.log('calling', currentNumber)

        boards.forEach((board, boardIndex) => {
            try {
                board.call(currentNumber)
            } catch {
                let currentWinningScore = board.score(currentNumber)
                winners.push({
                    currentNumber,
                    boardIndex,
                    currentWinningScore,
                })
                winningScore = currentWinningScore > winningScore ? currentWinningScore : winningScore
            }
        })

        if (winners.length) break
    }

    if (debug)
        winners.forEach(w => {
            console.log(w)
        })

    return winners[0].currentWinningScore
}

module.exports = { solution, Board }
