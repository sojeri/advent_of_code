function solution(inputArray, preambleSize = 25) {
    const preamble = []
    for (let i = 0; i < inputArray.length; i++) {
        const currentValue = Number(inputArray[i])
        if (i >= preambleSize) {
            let isCurrentValueValid = false
            for (let j = 0; j < preamble.length; j++) {
                const have = preamble[j]
                const want = currentValue - have
                const wantIndex = preamble.indexOf(want)
                if (wantIndex > -1 && wantIndex !== j) {
                    isCurrentValueValid = true
                    break
                }
            }
            if (!isCurrentValueValid) {
                return currentValue
            }
        }

        preamble.push(currentValue)
        if (preamble.length > preambleSize) {
            preamble.shift() // pop oldest entry
        }
    }

    return -1
}

module.exports = solution
