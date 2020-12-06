function solution(inputArray) {
    let group = {}
    let groupSize = 0
    let customsAnswers = 0
    inputArray.forEach(line => {
        if (!line.length || line === '\r') {
            Object.keys(group).forEach(answer => {
                if (group[answer] === groupSize) {
                    customsAnswers++
                }
            })
            groupSize = 0
            group = {}
        } else {
            line.split('').forEach(char => {
                if (!group[char]) {
                    group[char] = 1
                } else {
                    group[char] += 1
                }
            })
            groupSize++
        }
    })

    Object.keys(group).forEach(answer => {
        if (group[answer] === groupSize) {
            customsAnswers++
        }
    })
    return customsAnswers
}

module.exports = solution
