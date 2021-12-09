// https://adventofcode.com/2021/day/9#part2
const { descendingSort } = require('../../utils/js/sorts')

const NINE = 9
const SEEN = -1

function findBasins(grid) {
    // normalize data
    const numbersGrid = []
    grid.forEach(row => {
        numbersGrid.push(row.split('').map(s => Number(s)))
    })

    const min = 0
    const rowMax = numbersGrid.length
    const itemMax = numbersGrid[0].length
    const basins = []
    const basinSizes = []

    const fillBasin = (rowIndex, itemIndex, basin = {}) => {
        // early exit for grid edge
        if (rowIndex < min || itemIndex < min || rowIndex >= rowMax || itemIndex >= itemMax) {
            return
        }

        // early exit for walls & visited
        const item = numbersGrid[rowIndex][itemIndex]
        if (item === NINE || item === SEEN) return

        // now finally calculate / fill basin
        if (!basin.id) {
            basin.id = basins.length
            basin.size = 1
            basin.sum = item
        } else {
            basin.size += 1
            basin.sum += item
        }
        numbersGrid[rowIndex][itemIndex] = SEEN

        fillBasin(rowIndex - 1, itemIndex, basin) // up
        fillBasin(rowIndex + 1, itemIndex, basin) // down
        fillBasin(rowIndex, itemIndex - 1, basin) // left
        fillBasin(rowIndex, itemIndex + 1, basin) // right

        return basin
    }

    // find starting pixels
    numbersGrid.forEach((row, rowIndex) => {
        row.forEach((item, itemIndex) => {
            if (item !== NINE && item !== SEEN) {
                const newBasin = fillBasin(rowIndex, itemIndex)
                basinSizes.push(newBasin.size)
                basins.push(newBasin)
            }
        })
    })

    // find largest basins
    basinSizes.sort(descendingSort)

    return basinSizes[0] * basinSizes[1] * basinSizes[2]
}

module.exports = { findBasins }
