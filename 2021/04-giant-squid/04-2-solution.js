const { solution, Board } = require('./04-1-solution')

const DEBUG = false

/**
 * a class representing a standard 5x5 bingo board,
 * one which is finaly smart enough to stop playing after
 * it hits the win condition 😅
 */
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
        return this.hasAlreadyWon ? null : super.call(number)
    }

    score(number) {
        return super.score(number)
    }
}

function shouldStopPlaying(_) {
    return false
}

function getBestWinningScore(winners) {
    return winners.pop().winningScore
}

function solutionV2(rawInput) {
    return solution(rawInput, DEBUG, StopAfterWinningBoard, shouldStopPlaying, getBestWinningScore)
}

module.exports = { solutionV2, StopAfterWinningBoard }
