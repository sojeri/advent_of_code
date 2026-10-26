function initialParse(rawStringArray) {
    let knownValuesSet = {}
    let knownValuesArray = []

    rawStringArray.forEach(s => {
        const n = Number(s)
        knownValuesSet[n] = true
        knownValuesArray.push(n)
    })

    return { knownValuesSet, knownValuesArray }
}

function solution(inputArray) {
    const { knownValuesSet, knownValuesArray } = initialParse(inputArray)
    let theAnswer = -1

    for (let i = 0; i < knownValuesArray.length; i++) {
        if (theAnswer > -1) {
            break
        }

        for (let j = 1; j < knownValuesArray.length; j++) {
            if (i === j) {
                continue
            }
            const first = knownValuesArray[i]
            const second = knownValuesArray[j]
            const want = 2020 - first - second
            if (knownValuesSet[want]) {
                theAnswer = first * second * want
                break
            }
        }
    }

    return theAnswer
}

module.exports = solution
