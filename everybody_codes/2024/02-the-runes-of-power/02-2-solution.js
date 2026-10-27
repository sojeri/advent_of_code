//

/**

Part II

Congratulations! Your correct answer allows you to advance to the next chamber. This time, your challenge centers around a colossal shield, worn down over time and scarred from countless battles. Yet, despite its age, the runic symbols etched upon it remain as vivid and clear as ever.

The list of potential runic words is still at your disposal, but it has grown considerably longer. However, the objective of the task has changed. This time, your focus is not on counting the runic words, but rather on counting the runic symbols that make up those words inscribed on the shield.

The inscription sprawls across the shield in many individual lines, each demanding careful interpretation. Moreover, these inscriptions can be read from left to right or from right to left, meaning you must search for runic words in both directions.

Example based on the following notes:

WORDS:THE,OWE,MES,ROD,HER,QAQ

AWAKEN THE POWE ADORNED WITH THE FLAMES BRIGHT IRE
THE FLAME SHIELDED THE HEART OF THE KINGS
POWE PO WER P OWE R
THERE IS THE END
QAQAQ

For this inscription, counting the runic symbols proceeds as follows:

    AWAKEN THE POWE ADORNED WITH THE FLAMES BRIGHT IRE: 15 runic symbols
    THE FLAME SHIELDED THE HEART OF THE KINGS: 9 runic symbols
    POWE PO WER P OWE R: 6 runic symbols
    THERE IS THE END: 7 runic symbols
    QAQAQ: 5 runic symbols (two QAQ words overlap each other)

Thus, the final count is: 15 + 9 + 6 + 7 + 5 = 42 runic symbols

What is the number of runic symbols engraved on the shield that form runic words?
 */
function solution(inputs) {
    const rawWords = inputs[0]
    const inscription = inputs.slice(2)
    const halfWords = rawWords.split(':')[1].split(',')
    const words = [...halfWords]

    // add reversed words so no special handling needed for reverse lookups
    halfWords.forEach(word => {
        const reverse = []
        for (let i = word.length - 1; i >= 0; i--) {
            reverse.push(word[i])
        }
        const reversed = reverse.join('')
        // guard for anything the same reversed,
        // ie, single letter or palindrome words.
        // does not guard against duplicate words!
        // (halfWords would still contain dupes.)
        if (words.indexOf(reversed) == -1) {
            words.push(reversed)
        }
    })

    let matches = 0
    inscription.forEach(line => {
        const runicChars = {}
        let runicScore = 0
        for (let i = 0; i < line.length; i++) {
            runicChars[i] = 0
        }
        words.forEach(word => {
            const wordLineMatches = Array.from(customMatchAll(line, word))
            wordLineMatches.forEach(match => {
                const start = match.index
                const stop = start + word.length
                for (let i = start; i < stop; i++) {
                    if (runicChars[i] == 0) {
                        runicScore += 1
                        runicChars[i] = 1
                    }
                }
            })
        })
        matches += runicScore
    })
    return matches
}

/**
 * js default string.matchAll behavior returns non overlapping matches
 *
 * - eg qaq index 0 from qaqaq matching /qaq/g
 *   rather than qaq index 0 and qaq index 2.
 *
 * it does that because it resets the search index
 * when it finds a match:
 *
 * - eg match qaq index 0 is size 3
 *   so it updates to search next from 0 + 3
 *   thus missing the match that starts at 2
 *
 * this method implements the overlap search
 * by manually resetting the search index
 * to current match index + 1.
 */
function customMatchAll(stringToMatch, glob) {
    const matcher = new RegExp(glob, 'g')
    const matches = []
    let match

    while ((match = matcher.exec(stringToMatch))) {
        // handle match the same way as default JS
        matches.push(match)

        // then manually adjust search index
        matcher.lastIndex = match.index + 1
    }

    return matches
}

module.exports = {
    solution,
}
