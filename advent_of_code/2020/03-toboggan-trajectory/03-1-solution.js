const TREE = '#'

/**
 * calculate how many trees we hit on the way down the hill. oops?
 * @param {*} inputArray the tree matrix, eg rows of symbols like ..#.#...#.#
 */
function solution(inputArray, slope = [3, 1]) {
    const [rightMv, downMv] = slope
    const rightLimit = inputArray[0].length

    // in both the example and the input, the origin is empty.
    // if it might not be empty, it'd be better to initialize this
    // by checking the value. eg,
    // let treesHit = inputArray[0][0] === TREE ? 1 : 0
    let treesHit = 0

    let down = 0
    let right = 0
    while (true) {
        down += downMv
        right = (right + rightMv) % rightLimit

        if (down >= inputArray.length) {
            break
        }

        if (inputArray[down][right] === TREE) {
            treesHit++
        }
    }

    return treesHit
}

module.exports = solution
