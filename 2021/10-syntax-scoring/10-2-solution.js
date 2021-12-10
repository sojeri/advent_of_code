// https://adventofcode.com/2021/day/10#part2
const { ascendingSort } = require('../../utils/js/sorts')

const round = {
    open: '(',
    close: ')',
    score: 1,
}
const square = {
    open: '[',
    close: ']',
    score: 2,
}
const curly = {
    open: '{',
    close: '}',
    score: 3,
}
const pointed = {
    open: '<',
    close: '>',
    score: 4,
}

/**
 * scores a single line
 * @param {*} line a line of braces, eg [({(<(())[]>[[{[]{<()<>>
 * @returns a score based on first illegal character found -- or 0 if none
 */
function getSyntaxScore(line) {
    let seen = []
    for (let c = 0; c < line.length; c++) {
        const char = line[c]
        const lastSeen = seen[seen.length - 1]

        switch (char) {
            case round.close:
                if (lastSeen !== round.open) return [0, null]
                seen.pop()
                continue
            case square.close:
                if (lastSeen !== square.open) return [0, null]
                seen.pop()
                continue
            case curly.close:
                if (lastSeen !== curly.open) return [0, null]
                seen.pop()
                continue
            case pointed.close:
                if (lastSeen !== pointed.open) return [0, null]
                seen.pop()
                continue
            default:
                seen.push(char)
                continue
        }
    }

    let score = 0
    const completionString = []
    for (let s = seen.length - 1; s >= 0; s--) {
        const char = seen[s]
        score *= 5

        switch (char) {
            case round.open:
                score += round.score
                completionString.push(round.close)
                break
            case square.open:
                score += square.score
                completionString.push(square.close)
                break
            case curly.open:
                score += curly.score
                completionString.push(curly.close)
                break
            case pointed.open:
                score += pointed.score
                completionString.push(pointed.close)
                break
        }
    }

    return [score, completionString.join('')]
}

function solution(input) {
    const scores = []
    input.forEach(line => {
        const score = getSyntaxScore(line)[0]
        if (score > 0) scores.push(score)
    })
    scores.sort(ascendingSort)

    const midpoint = Math.floor(scores.length / 2)

    return scores[midpoint]
}

module.exports = { getSyntaxScore, solution }
