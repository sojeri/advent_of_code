/**
 * https://adventofcode.com/2022/day/8#part2
 * find most scenic tree in grid
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
    let max = -1
    const yMax = trees.length - 1
    const xMax = trees[0].length - 1

    const above = getVisibleFromAbove(trees, xMax, yMax)
    const below = getVisibleFromBelow(trees, xMax, yMax)
    const left = getVisibleFromLeft(trees, xMax, yMax)
    const right = getVisibleFromRight(trees, xMax, yMax)

    for (let y = 0; y <= yMax; y++) {
        for (let x = 0; x <= xMax; x++) {
            const visibleScore = above[y][x] * below[y][x] * left[y][x] * right[y][x]
            if (visibleScore > max) {
                max = visibleScore
            }
        }
    }
    return max
}

const HEIGHTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function getVisibleFromAbove(grid, xMax, yMax) {
    const visibility = grid.map(() => [])
    const potentialViews = {}

    const updatePotentials = value => {
        HEIGHTS.forEach(h => {
            if (h > value) potentialViews[h] += 1
            if (h <= value) potentialViews[h] = 1
        })
    }

    // for current col, starting from edge
    for (let x = 0; x <= xMax; x++) {
        let prevHeight
        HEIGHTS.forEach(h => (potentialViews[h] = 0))
        for (let y = 0; y <= yMax; y++) {
            const height = Number.parseInt(grid[y][x])
            if (y === 0) {
                visibility[y][x] = 0
            } else {
                updatePotentials(prevHeight)
                visibility[y][x] = potentialViews[height]
            }
            prevHeight = height
        }
    }
    return visibility
}

function getVisibleFromBelow(grid, xMax, yMax) {
    const visibility = grid.map(() => [])
    const potentialViews = {}

    const updatePotentials = value => {
        HEIGHTS.forEach(h => {
            if (h > value) potentialViews[h] += 1
            if (h <= value) potentialViews[h] = 1
        })
    }

    // for current col, starting from edge
    for (let x = 0; x <= xMax; x++) {
        let prevHeight
        HEIGHTS.forEach(h => (potentialViews[h] = 0))
        for (let y = yMax; y >= 0; y--) {
            const height = Number.parseInt(grid[y][x])
            if (y === yMax) {
                visibility[y][x] = 0
            } else {
                updatePotentials(prevHeight)
                visibility[y][x] = potentialViews[height]
            }
            prevHeight = height
        }
    }
    return visibility
}

function getVisibleFromRight(grid, xMax, yMax) {
    const visibility = grid.map(() => [])
    const potentialViews = {}

    const updatePotentials = value => {
        HEIGHTS.forEach(h => {
            if (h > value) potentialViews[h] += 1
            if (h <= value) potentialViews[h] = 1
        })
    }

    for (let y = 0; y <= yMax; y++) {
        let prevHeight
        HEIGHTS.forEach(h => (potentialViews[h] = 0))
        for (let x = xMax; x >= 0; x--) {
            const height = Number.parseInt(grid[y][x])
            if (x === xMax) {
                visibility[y][x] = 0
            } else {
                updatePotentials(prevHeight)
                visibility[y][x] = potentialViews[height]
            }
            prevHeight = height
        }
    }
    return visibility
}

function getVisibleFromLeft(grid, xMax, yMax) {
    const visibility = grid.map(() => [])
    const potentialViews = {}

    const updatePotentials = value => {
        HEIGHTS.forEach(h => {
            if (h > value) potentialViews[h] += 1
            if (h <= value) potentialViews[h] = 1
        })
    }
    for (let y = 0; y <= yMax; y++) {
        let prevHeight
        HEIGHTS.forEach(h => (potentialViews[h] = 0))
        for (let x = 0; x <= xMax; x++) {
            const height = Number.parseInt(grid[y][x])
            if (x === 0) {
                visibility[y][x] = 0
            } else {
                updatePotentials(prevHeight)
                visibility[y][x] = potentialViews[height]
            }
            prevHeight = height
        }
    }
    return visibility
}

module.exports = {
    solution,
    getVisibleFromLeft,
    getVisibleFromRight,
    getVisibleFromAbove,
    getVisibleFromBelow,
}
