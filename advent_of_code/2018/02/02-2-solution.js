// TODO: research better solutions than this terrible brute force

function isDiffSmallEnough(firstString, secondString) {
    let diff = 0
    for (let i = 0; i < firstString.length; i++) {
        if (firstString[i] != secondString[i]) {
            diff++
        }
        if (diff > 1) {
            return false
        }
    }
    return true
}

function findSimilarBoxIds(arrayOfIds) {
    for (let i = 0; i < arrayOfIds.length; i++) {
        let firstId = arrayOfIds[i]
        for (let j = i + 1; j < arrayOfIds.length; j++) {
            let secondId = arrayOfIds[j]
            if (isDiffSmallEnough(firstId, secondId)) {
                return findCommonLetters(firstId, secondId)
            }
        }
    }
}

function findCommonLetters(firstString, secondString) {
    let commonLetters = []
    for (let i = 0; i < firstString.length; i++) {
        let char = firstString[i]
        if (char == secondString[i]) {
            commonLetters.push(char)
        }
    }

    return commonLetters.join('')
}

module.exports = findSimilarBoxIds
