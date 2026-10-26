const solution = require('./02-1-solution')

function findSolution(instructions) {
    for (let n = 0; n <= 99; n++) {
        for (let v = 0; v <= 99; v++) {
            let result = solution(instructions, n, v)
            if (result == 19690720) {
                return 100 * n + v
            }
        }
    }
}

module.exports = findSolution
