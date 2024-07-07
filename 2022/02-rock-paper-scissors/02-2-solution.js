/**
 * https://adventofcode.com/2022/day/2#part2
 * calculate rock/paper/scissors scores to determine winner
 * @param {*} rounds
 */
function solution(rounds) {
    let total = 0
    rounds.forEach(r => (total += getScore(r)))
    return total
}

const win = 6
const draw = 3
const lose = 0
const rock = 1
const paper = 2
const scissors = 3
const oppRock = 'A'
const oppPaper = 'B'
const oppScissors = 'C'
const plyLose = 'X'
// const plyDraw = 'Y';
const plyWin = 'Z'

function getScore(round) {
    const opponent = round[0]
    const player = round[2]
    switch (opponent) {
        case oppRock:
            if (player === plyWin) {
                return win + paper
            }
            if (player === plyLose) {
                return lose + scissors
            }
            return draw + rock
        case oppPaper:
            if (player === plyWin) {
                return win + scissors
            }
            if (player === plyLose) {
                return lose + rock
            }
            return draw + paper
        case oppScissors:
            if (player === plyWin) {
                return win + rock
            }
            if (player === plyLose) {
                return lose + paper
            }
            return draw + scissors
    }
}

module.exports = solution
