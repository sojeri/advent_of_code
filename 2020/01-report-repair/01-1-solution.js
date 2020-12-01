function solution(inputArray) {
    let knownValues = {}
    let theAnswer = -1

    inputArray.forEach(n => {
        const have = Number(n)
        knownValues[have] = true
        const want = 2020 - have
        if (knownValues[want]) {
            theAnswer = have * want
        }
    })

    return theAnswer // and then cry
}

module.exports = solution
