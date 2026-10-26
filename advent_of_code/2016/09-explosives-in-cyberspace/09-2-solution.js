//

/*
--- Part Two ---

Apparently, the file actually uses version two of the format.

In version two, the only difference is that markers within decompressed data are decompressed. This, the documentation explains, provides much more substantial compression capabilities, allowing many-gigabyte files to be stored in only a few kilobytes.

For example:

    (3x3)XYZ still becomes XYZXYZXYZ, as the decompressed section contains no markers.
    X(8x2)(3x3)ABCY becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.
    (27x12)(20x12)(13x14)(7x10)(1x12)A decompresses into a string of A repeated 241920 times.
    (25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN becomes 445 characters long.

Unfortunately, the computer you brought probably doesn't have enough memory to actually decompress the file; you'll have to come up with another way to get its decompressed length.

What is the decompressed length of the file using this improved format?
*/

/**
 * recursive decode substring. loose notes from my figuring out the logic below:

    ==== RECURSIVE ====

    // 000000000011111    0.........1.........2
    // 012345678901234    01234567890123456789 [0:19]
    // X(8x2)(3x3)ABCY => XABCABCABCABCABCABCY (len 20)

    first pass:
    - beginning 'X'
        - has no subsequence
        - return substr length (X=1)
    - sequence (8x2) (size x multiples)
    - repeater (3x3)ABC
        - repeaterName [6:13]
        - data[6:13] not found
        - has subsequence
        - return 2 * decodeSubstring(str, 6, 13, data)
    - end 'Y'
        - has no subsequence
        - return substr length (Y=1)
    - return 1 + 2 * decodeSubstring(str, 6, 13, data) + 1;

    inner pass:
    - beginning ''
    - sequence (3x3) (size x multiples)
    - repeater ABC
    - end ''
    - return 0 + 3 * decodeSubstring(str, 11, 13, data) + 0;

    inner inner pass:
    - word = 'ABC'
    - no subsequence
    - return 3

    inner pass result:
    0 + 3 * 3 + 0 = 9

    first pass final result:
    1 + 2 * 9 + 1 = 20
*/
function decodeString(phrase, start, end, data = {}) {
    const word = phrase.slice(start, end)
    const phraseName = `${start}:${end}`
    const sequenceStart = word.indexOf('(')
    if (sequenceStart === -1 || word === '') {
        data[phraseName] = word.length
        return data[phraseName]
    }

    const sequenceName = `${start}:${end}`
    if (data[sequenceName]) return data[sequenceName]

    const sequenceEnd = word.indexOf(')')
    const rule = word.slice(sequenceStart + 1, sequenceEnd)
    const [size, multiples] = rule.split('x').map(s => Number(s))

    const before = decodeString(phrase, start, start + sequenceStart, data)

    const repeater = decodeString(phrase, start + sequenceEnd + 1, start + sequenceEnd + 1 + size, data)

    const after = decodeString(phrase, start + sequenceEnd + 1 + size, start + word.length, data)

    data[sequenceName] = before + repeater * multiples + after
    return data[sequenceName]
}

function lazyArgsDecode(phrase) {
    return decodeString(phrase, 0, phrase.length)
}

function solution(words) {
    let sum = 0
    words.forEach(word => {
        sum += decodeString(word, 0, word.length)
    })

    return sum
}

module.exports = {
    solution,
    decodeString,
    lazyArgsDecode,
}
