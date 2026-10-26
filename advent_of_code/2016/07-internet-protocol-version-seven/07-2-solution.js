//

/*
--- Part Two ---

You would also like to know which IPs support SSL (super-secret listening).

An IP supports SSL if it has an Area-Broadcast Accessor, or ABA, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or BAB, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as xyx or aba. A corresponding BAB is the same characters but in reversed positions: yxy and bab, respectively.

For example:

    aba[bab]xyz supports SSL (aba outside square brackets with corresponding bab within square brackets).
    xyx[xyx]xyx does not support SSL (xyx, but no corresponding yxy).
    aaa[kek]eke supports SSL (eke in supernet with corresponding kek in hypernet; the aaa sequence is not related, because the interior character must be different).
    zazbz[bzb]cdb supports SSL (zaz has no corresponding aza, but zbz has a corresponding bzb, even though zaz and zbz overlap).

How many IPs in your puzzle input support SSL?
*/

/**
 * checks if a word matches the defined pattern, eg ABA
 * - returns isValid true if so
 *
 * & whether its inverse, eg BAB, has been seen
 * - returns isMatched true if so
 */
function getStatus(word, seen) {
    if (word.length !== 3) return { isValid: false, isMatched: false }

    const isValid = word[0] === word[2] && word[0] !== word[1]
    if (!isValid) return { isValid, isMatched: false }

    const [a, b] = word
    const isMatched = seen[`${b}${a}${b}`] === true
    return { isValid, isMatched }
}

/** returns true if a phrase meets the defined ssl guidelines */
function hasSslSupport(phrase) {
    const seenABAs = {}
    const seenBABs = {}
    let isBeforeHypernet = true
    let isAfterHypernet = false
    const lastHypernetStart = phrase.lastIndexOf('[')
    for (let a = 0; a < phrase.length; a++) {
        const b = a + 3
        if (b > phrase.length) return false

        const word = phrase.slice(a, b)
        const first = word[0]
        if (first === '[') {
            isBeforeHypernet = false
            continue
        }

        if (first === ']') {
            if (a >= lastHypernetStart && lastHypernetStart > -1) {
                isAfterHypernet = true
            } else {
                isBeforeHypernet = true
            }
            continue
        }

        // placeholders to reduce duplicate code
        let compare, contrast

        // aka if in hypernet
        if (!isBeforeHypernet && !isAfterHypernet) {
            // inside hypernet is BAB (compare)
            // needs to crosscheck against ABA (contrast)
            compare = seenBABs
            contrast = seenABAs
        }

        if (isBeforeHypernet || isAfterHypernet) {
            // outside hypernet is ABA (compare)
            // needs to crosscheck against BAB (contrast)
            compare = seenABAs
            contrast = seenBABs
        }

        const status = getStatus(word, contrast)
        if (status.isMatched) {
            return true
        }
        if (status.isValid) {
            compare[word] = true
            continue
        }
    }
}

function solution(words) {
    let sum = 0
    words.forEach(word => {
        if (hasSslSupport(word)) {
            sum += 1
        }
    })
    return sum
}

module.exports = {
    getStatus,
    hasSslSupport,
    solution,
}
