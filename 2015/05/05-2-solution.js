/**
 * given a string, returns true if the string is nice and false if the string is naughty (not nice)
 * @param {*} str the string to validate
 * @returns a boolean indicating whether a string is nice or not
 * full spec: https://adventofcode.com/2015/day/5#part2
 */
function isNiceString(str) {
    let charPairs = []
    let containsCharPairTwice = false
    let containsCharSandwich = false

    let prevChar = str[0]
    let prevPrevChar = ''
    for (let i = 1; i < str.length; i++) {
        let char = str[i]

        if (!containsCharPairTwice) {
            let charPair = char + prevChar
            let charPairIndex = charPairs.indexOf(charPair)
            let isCharPairSeenBefore = charPairIndex > -1
            if (isCharPairSeenBefore) {
                /**
                 * firstValidCharPairIndex explanation:
                 * aaa has aa and aa in a row, but it's not valid.
                 * (per spec, it must be aa|aa / two _separate_ pairs to be valid.)
                 * 
                 * aaa calculation example:
                 * first pass (i = 1), prevChar is a and char is a.
                 *    no match. aa goes into charPairs at index 0.
                 * second pass (i = 2), still a & a.
                 *    match at index 0, but we know aaa isn't valid. firstValidCharPairIndex can't be 2 less than i.
                 * 
                 * baaaa (b+aa|aa) calculation example:
                 * first pass (i = 1), prevChar is b and char is a. (|ba|aaa)
                 *    no match. ba goes into pairs at index 0.
                 * second pass (i = 2), a & a. (b|aa|aa)
                 *    no match. aa goes into pairs at index 1.
                 * third pass (i = 3), a & a again. (ba|aa|a)
                 *    match at index 1, which isn't valid. aa goes into pairs at index 2.
                 * fourth pass (i = 4), a & a again. (baa|aa|)
                 *    match at index 1. we know b|aa|aa| is valid, so firstValidCharPairIndex is 3 less than i.
                 */
                let firstValidCharPairIndex = i - 3

                containsCharPairTwice = charPairIndex <= firstValidCharPairIndex
            }

            charPairs.push(charPair)
        }

        if (!containsCharSandwich) {
            containsCharSandwich = prevPrevChar == char
        }

        prevPrevChar = prevChar
        prevChar = char
    }

    return containsCharPairTwice && containsCharSandwich
}

module.exports = isNiceString