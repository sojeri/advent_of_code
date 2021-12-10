// https://adventofcode.com/2021/day/10

const round = {
    open: '(',
    close: ')',
    score: 3,
}
const square = {
    open: '[',
    close: ']',
    score: 57,
}
const curly = {
    open: '{',
    close: '}',
    score: 1197,
}
const pointed = {
    open: '<',
    close: '>',
    score: 25137,
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
            case round.open:
                seen.push(round.open)
                continue
            case square.open:
                seen.push(square.open)
                continue
            case curly.open:
                seen.push(curly.open)
                continue
            case pointed.open:
                seen.push(pointed.open)
                continue
            case round.close:
                if (lastSeen !== round.open) {
                    return round.score
                } else {
                    seen.pop()
                    continue
                }
            case square.close:
                if (lastSeen !== square.open) {
                    return square.score
                } else {
                    seen.pop()
                    continue
                }
            case curly.close:
                if (lastSeen !== curly.open) {
                    return curly.score
                } else {
                    seen.pop()
                    continue
                }
            case pointed.close:
                if (lastSeen !== pointed.open) {
                    return pointed.score
                } else {
                    seen.pop()
                    continue
                }
            default:
                throw new Error('and who is this shady character???? @_@')
        }
    }

    return 0
}

function solution(input) {
    let syntaxScore = 0
    input.forEach(line => {
        syntaxScore += getSyntaxScore(line)
    })
    return syntaxScore
}

module.exports = { getSyntaxScore, solution }
