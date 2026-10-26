const solution = require('./03-1-solution')

/**
 * calculate the multiplier based how many trees we hit on the way down the hill
 * over several runs. I think it's safe to say we're not good at sledding. I hope
 * we're not carrying any presents! 🤣
 * @param {*} inputArray the tree matrix, eg rows of symbols like ..#.#...#.#
 */
function pt2solution(inputArray) {
    let treesHitMultiplier = 1
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]

    slopes.forEach(slope => {
        treesHitMultiplier *= solution(inputArray, slope)
    })

    return treesHitMultiplier
}

module.exports = pt2solution
