// https://adventofcode.com/2021/day/10#part2
const { ascendingSort } = require('../../utils/js/sorts')
const { OPENERS, CLOSERS, isOpen } = require('./10-1-solution')

// ordered lists using position as ID to represent different brace info
// eg 0 for all three is about round braces
const SCORES = [1, 2, 3, 4]

/**
 * scores a single line
 * @param {*} line a line of braces, eg [({(<(())[]>[[{[]{<()<>>
 * @returns a score for incomplete lines based on missing characters -- or 0 for anything else
 */
function getSyntaxScore(line) {
    let seen = []
    for (let c = 0; c < line.length; c++) {
        const char = line[c]

        if (isOpen(char)) {
            seen.push(char)
            continue
        }

        const braceId = CLOSERS.indexOf(char)
        if (braceId === -1) {
            throw new Error(`and who is this shady character???? @_@ '${char}'`)
        }

        const lastSeenId = OPENERS.indexOf(seen[seen.length - 1])
        if (lastSeenId !== braceId) {
            return [0, null]
        }

        seen.pop()
    }

    let score = 0
    const completionString = []
    for (let s = seen.length - 1; s >= 0; s--) {
        const char = seen[s]
        score *= 5

        const charId = OPENERS.indexOf(char)
        if (charId === -1) {
            throw new Error(`and who is this shady character???? @_@ '${char}'`)
        }

        score += SCORES[charId]
        completionString.push(CLOSERS[charId])
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

module.exports = {
    getSyntaxScore,
    solution,
}
