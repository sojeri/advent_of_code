/**
 * https://adventofcode.com/2022/day/6
 * find start of packet marker
 */
function findMarker(str, size = 4) {
    const chars = []
    let uniqueChars

    for (let i = 0; i < str.length; i++) {
        const char = str[i]
        chars.push(char)
        uniqueChars = new Set(chars)

        if (uniqueChars.size === size) return i + 1
        if (chars.length === size) chars.shift()
    }

    return -1
}

module.exports = findMarker
