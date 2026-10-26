function solution(inputArray) {
    let group = {}
    let customsAnswers = 0
    inputArray.forEach(line => {
        if (!line.length) {
            customsAnswers += Object.keys(group).length
            group = {}
        } else {
            line.split('').forEach(char => {
                group[char] = true
            })
        }
    })

    customsAnswers += Object.keys(group).length
    return customsAnswers
}

module.exports = solution
