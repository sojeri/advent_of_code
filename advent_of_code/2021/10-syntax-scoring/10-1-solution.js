// https://adventofcode.com/2021/day/10

// ordered lists using position as ID to represent different brace info
// eg 0 for all three is about round braces
const OPENERS = ['(', '[', '{', '<']
const CLOSERS = [')', ']', '}', '>']
const SCORES = [3, 57, 1197, 25137]

const isOpen = char => {
    return OPENERS.indexOf(char) > -1
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

        if (isOpen(char)) {
            seen.push(char)
            continue
        }

        const knownChar = CLOSERS.indexOf(char)
        if (knownChar === -1) {
            throw new Error(`and who is this shady character???? @_@ '${char}'`)
        }

        const lastSeen = OPENERS.indexOf(seen[seen.length - 1])
        if (lastSeen !== knownChar) {
            return SCORES[knownChar]
        }

        seen.pop()
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

module.exports = {
    OPENERS,
    CLOSERS,
    isOpen,
    getSyntaxScore,
    solution,
}
