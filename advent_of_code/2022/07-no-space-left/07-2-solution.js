let { calcDirSizes } = require('./07-1-solution')

/**
 * https://adventofcode.com/2022/day/7#part2
 * find smallest eligible dir to delete
 */
function solution(input) {
    const dirs = calcDirSizes(input)
    const diskSize = 70_000_000
    const spaceNeeded = 30_000_000
    const spaceFree = diskSize - dirs['/']
    const spaceNeedToClear = spaceNeeded - spaceFree

    let min = diskSize
    Object.keys(dirs).forEach(dir => {
        const dirSize = dirs[dir]
        if (dirSize > spaceNeedToClear && dirSize < min) {
            min = dirSize
        }
    })
    return min
}

module.exports = solution
