/**
 * given a string, returns true if the string is nice and false if the string is naughty (not nice)
 * @param {*} str the string to validate
 * @returns a boolean indicating whether a string is nice or not
 * full spec: https://adventofcode.com/2015/day/5
 */
function isNiceString(str) {
    let vowels = ['a', 'e', 'i', 'o', 'u']

    let vowelsSeen = 0
    let prevChar = ''
    let containsThreeVowels = false
    let containsDoubleLetter = false

    for (let i = 0; i < str.length; i++) {
        let char = str[i]

        if (!containsThreeVowels && vowels.indexOf(char) > -1) {
            vowelsSeen++
            containsThreeVowels = vowelsSeen >= 3
        }

        if (!containsDoubleLetter) {
            containsDoubleLetter = prevChar == char
        }

        switch (prevChar) {
            case 'a':
                if (char == 'b') {
                    return false
                }
                break
            case 'c':
                if (char == 'd') {
                    return false
                }
                break
            case 'p':
                if (char == 'q') {
                    return false
                }
                break
            case 'x':
                if (char == 'y') {
                    return false
                }
                break
        }

        prevChar = char
    }

    return containsThreeVowels && containsDoubleLetter
}

module.exports = isNiceString
