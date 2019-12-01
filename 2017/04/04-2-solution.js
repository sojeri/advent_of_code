let { countValidPassphrases } = require('./04-1-solution')

const alphabetically = (a, b) => {
    return a > b
}

/**
 * returns true if a passphrase is comprised of words that aren't anagrams of each other and false otherwise
 */
function areNoWordsAnagrams(passphraseString) {
    let unverifiedWords = passphraseString.split(' ')
    let alreadyContains = {}
    for (let w = 0; w < unverifiedWords.length; w++) {
        let word = unverifiedWords[w]
            .split('')
            .sort(alphabetically)
            .join('')
        if (alreadyContains[word]) {
            return false
        }

        alreadyContains[word] = true
    }
    return true
}

/**
 * returns the count of valid passphrases from a given list
 * @param {*} passphraseList an array of passphrases
 */
function countValidPassphrasesV2(passphraseList) {
    return countValidPassphrases(passphraseList, areNoWordsAnagrams)
}

module.exports = {
    areNoWordsAnagrams,
    countValidPassphrasesV2,
}
