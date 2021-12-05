// https://adventofcode.com/2021/day/3

function solution(input) {
    let bitData = []

    // hydrate bitData
    for (let c = 0; c < input[0].length; c++) {
        bitData.push(0)
    }

    // calculate bitData
    input.forEach(word => {
        for (let c = 0; c < word.length; c++) {
            const char = word[c]
            switch (char) {
                case '0':
                    bitData[c] = bitData[c] - 1
                    break
                case '1':
                    bitData[c] = bitData[c] + 1
                    break
            }
        }
    })

    // parse bitData
    let gammaRate = ''
    let epsilonRate = ''
    bitData.forEach(calc => {
        if (calc > 0) {
            gammaRate += '1'
            epsilonRate += '0'
        } else {
            gammaRate += '0'
            epsilonRate += '1'
        }
    })
    gammaRate = parseInt(gammaRate, 2)
    epsilonRate = parseInt(epsilonRate, 2)

    return gammaRate * epsilonRate
}

module.exports = solution
