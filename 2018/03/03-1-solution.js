const xyMarker = '@ '
const xyDivider = ','
const sizeMarker = ': '
const sizeDivider = 'x'

let grid

function findOverlappingClaims(string) {
    // "#45 @ 711,780: 19x23"
    let xyStart = string.indexOf(xyMarker) + xyMarker.length
    let xyEnd = string.indexOf(sizeMarker)
    let sizeStart = xyEnd + sizeMarker.length
    let xy = string.slice(xyStart, xyEnd).split(xyDivider)
    let xStart = Number(xy[0])
    let yStart = Number(xy[1])
    let size = string.slice(sizeStart).split(sizeDivider)
    let xSize = Number(size[0])
    let ySize = Number(size[1])

    let newOverlappingClaims = 0
    for (let i = xStart; i < xStart + xSize; i++) {
        if (!Array.isArray(grid[i])) {
            grid[i] = []
        }

        for (let j = yStart; j < yStart + ySize; j++) {
            let currentVal = grid[i][j]
            if (currentVal == 1) {
                grid[i][j] = 2
                newOverlappingClaims++
            } else if (currentVal != 2) {
                grid[i][j] = 1
            }
        }
    }

    return newOverlappingClaims
}

function countInvalidGridLocations(claims, size = 1000) {
    grid = new Array(size)

    let contestedSpace = 0
    claims.forEach(c => {
        contestedSpace += findOverlappingClaims(c)
    })

    return contestedSpace
}

module.exports = countInvalidGridLocations
