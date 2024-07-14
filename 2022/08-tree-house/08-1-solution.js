/**
 * https://adventofcode.com/2022/day/8
 * count visible trees in grid
 * @param {*} treeGrid
``` 
30373
25512
65332
33549
35390
```
 */
function solution(trees) {
    let visible = 0
    const yMax = trees.length - 1
    const xMax = trees[0].length - 1

    const above = getVisibleFromAbove(trees, xMax, yMax)
    const below = getVisibleFromBelow(trees, xMax, yMax)
    const left = getVisibleFromLeft(trees, xMax, yMax)
    const right = getVisibleFromRight(trees, xMax, yMax)

    const output = trees.map(() => [])
    for (let y = 0; y <= yMax; y++) {
        for (let x = 0; x <= xMax; x++) {
            const isVisible = above[y][x] || below[y][x] || left[y][x] || right[y][x]
            output[y][x] = isVisible
            if (isVisible) visible++
        }
    }
    return visible
}

const log = ({ trees, visible }) => {
    if (trees) trees.forEach(r => console.log(r))

    if (visible) {
        visible.forEach(row => {
            let output = ''
            row.forEach(tree => {
                output += tree ? 'V' : '.'
            })
            console.log(output)
        })
    }
}

function getVisibleFromAbove(grid, xMax, yMax) {
    const trees = grid.map(() => [])
    const max = grid.map((_, x) => Number.parseInt(grid[0][x]))
    for (let x = 0; x <= xMax; x++) {
        for (let y = 0; y <= yMax; y++) {
            if (max[x] === 9) continue

            const current = Number.parseInt(grid[y][x])
            if (y === 0 || x === 0 || y === yMax || x === xMax) {
                trees[y][x] = true
            } else {
                trees[y][x] = max[x] < current
            }
            max[x] = Math.max(current, max[x])
        }
    }
    return trees
}

function getVisibleFromBelow(grid, xMax, yMax) {
    const trees = grid.map(() => [])
    const max = grid.map((_, x) => Number.parseInt(grid[yMax][x]))
    for (let x = 0; x <= xMax; x++) {
        for (let y = yMax; y >= 0; y--) {
            if (max[x] === 9) continue

            const current = Number.parseInt(grid[y][x])
            if (y === 0 || x === 0 || y === yMax || x === xMax) {
                trees[y][x] = true
            } else {
                trees[y][x] = max[x] < current
            }
            max[x] = Math.max(current, max[x])
        }
    }
    return trees
}

function getVisibleFromRight(grid, xMax, yMax) {
    const trees = grid.map(() => [])
    const max = grid.map(y => Number.parseInt(y[xMax]))
    for (let x = xMax; x >= 0; x--) {
        for (let y = 0; y <= yMax; y++) {
            if (max[y] === 9) continue

            const current = Number.parseInt(grid[y][x])
            if (y === 0 || x === 0 || y === yMax || x === xMax) {
                trees[y][x] = true
            } else {
                trees[y][x] = max[y] < current
            }
            max[y] = Math.max(current, max[y])
        }
    }
    return trees
}

function getVisibleFromLeft(grid, xMax, yMax) {
    const trees = grid.map(() => [])
    const max = grid.map(y => Number.parseInt(y[0]))
    for (let x = 0; x <= xMax; x++) {
        for (let y = 0; y <= yMax; y++) {
            if (max[y] === 9) continue

            const current = Number.parseInt(grid[y][x])
            if (y === 0 || x === 0 || y === yMax || x === xMax) {
                trees[y][x] = true
            } else {
                trees[y][x] = max[y] < current
            }
            max[y] = Math.max(current, max[y])
        }
    }
    return trees
}

module.exports = solution
