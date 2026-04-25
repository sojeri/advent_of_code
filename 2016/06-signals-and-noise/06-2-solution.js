//

/**
--- Part Two ---

Of course, that would be the message - if you hadn't agreed to use a modified repetition code instead.

In this modified code, the sender instead transmits what looks like random data, but for each character, the character they actually want to send is slightly less likely than the others. Even after signal-jamming noise, you can look at the letter distributions in each column and choose the least common letter to reconstruct the original message.

In the above example, the least common character in the first column is a; in the second, d, and so on. Repeating this process for the remaining characters produces the original message, advent.

Given the recording in your puzzle input and this new decoding methodology, what is the original message that Santa is trying to send?
 */

function solution(words) {
    /** array storing per-column charCount dict and max */
    const data = []
    const wordSize = words[0].length
    for (const word of words) {
        for (let column = 0; column < wordSize; column++) {
            const char = word[column]
            if (data[column] === undefined) {
                data[column] = {}
            }

            if (data[column][char] === undefined) {
                data[column][char] = 1
            } else {
                data[column][char] += 1
            }
        }
    }

    let output = ''
    const defaultMax = words.length + 1
    for (let column = 0; column < wordSize; column++) {
        let min = defaultMax
        let minChar = '🐍'
        Object.entries(data[column]).forEach(entry => {
            const [char, count] = entry
            if (count < min) {
                min = count
                minChar = char
            }
        })
        output += minChar
    }
    return output
}

module.exports = solution
