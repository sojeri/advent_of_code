/**
 * --- Day 4: High-Entropy Passphrases ---
A new system policy has been put in place that requires all accounts to use a passphrase instead of simply a password. A passphrase consists of a series of words (lowercase letters) separated by spaces.

To ensure security, a valid passphrase must contain no duplicate words.

For example:

aa bb cc dd ee is valid.
aa bb cc dd aa is not valid - the word aa appears more than once.
aa bb cc dd aaa is valid - aa and aaa count as different words.
The system's full passphrase list is available as your puzzle input. How many passphrases are valid?
 */

/**
 * returns the count of valid passphrases from a given list
 * @param {*} passphraseList an array of passphrases
 * @param isValidCb an optional callback to use to validate the passphrases
 */
function countValidPassphrases(passphraseList, isValidCb = areWordsUnique) {
    let count = 0
    passphraseList.forEach(p => {
        if (isValidCb(p)) count++
    })
    return count
}

/**
 * returns true if a passphrase is comprised of unique words and false otherwise
 */
function areWordsUnique(passphraseString) {
    let unverifiedWords = passphraseString.split(' ')
    let alreadyContains = {}
    for (let w = 0; w < unverifiedWords.length; w++) {
        let word = unverifiedWords[w]
        if (alreadyContains[word]) {
            return false
        } else {
            alreadyContains[word] = true
        }
    }
    return true
}

module.exports = {
    areWordsUnique,
    countValidPassphrases,
}
