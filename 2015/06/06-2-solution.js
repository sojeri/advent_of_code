let { createGrid, parseCoord } = require('./06-1-solution')

/**
 * with Santa's help, we can finally take down our neighbors in that stupid
 * neighborhood lights contest! however, he was definitely drunk when he wrote
 * the instructions. since they're actually about brightness, we need to ensure
 * we won't go past the neighborhood guidelines for max illumination per house.
 * this method parses Santa's cheat sheet and returns the sum of total brightness
 * in the display.
 * spec: https://adventofcode.com/2015/day/6#part2
 * @param {*} instructions Santa's cheat sheet (a list of coded instructions)
 */
function parseSantasPlan(instructions) {
    let lightGrid = createGrid(1000, 0)
    
    for (let i = 0; i < instructions.length; i++) {
        lightGrid = handleInstruction(lightGrid, instructions[i])
    }

    return countTotalLuminosity(lightGrid)
}

const TOGGLE = 'toggle'
const ON = 'on'
const OFF = 'off'

/**
 * counts total luminosity for a given light grid
 * @param {*} grid an array of arrays containing numeric values (1 = very dim)
 */
function countTotalLuminosity(grid) {
    let howMuchLuminosity = 0
    grid.forEach(row => {
        row.forEach(lumenCount => {
            howMuchLuminosity += lumenCount
        })
    })

    return howMuchLuminosity
}

/**
 * parses and handles a line of instructions from Santa's cheat sheet
 * @param {*} grid the object to apply the instruction to
 * @param {*} instruction a single instruction, eg 'turn on 0,0 through 999,999'
 */
function handleInstruction(grid, instruction) {
    let words = instruction.split(' ')
    if (words[0] != TOGGLE) {
        words.shift() // remove 'turn'
    }

    let from = parseCoord(words[1])
    let to = parseCoord(words[3])

    switch (words[0]) {
        case TOGGLE:
            return applyInstruction(grid, from, to, 2)
        case ON:
            return applyInstruction(grid, from, to, 1)
        case OFF:
            return applyInstruction(grid, from, to, -1)
    }
}

/**
 * for a given grid, attempts to alter values in a rectangle as defined by given
 * start & end coordinates. alteration is done according to a given modifier,
 * and values will never drop below zero.
 * @param {*} grid a grid (array of arrays) containing numeric values
 * @param {*} startCoord the top left corner of the rectangle
 * @param {*} endCoord the bottom right corner of the rectangle
 * @param {*} modifier the numeric amount to add to the current value (eg, -1)
 */
function applyInstruction(grid, startCoord, endCoord, modifier) {
    let iStart = startCoord.x
    let iStop = endCoord.x
    let jStart = startCoord.y
    let jStop = endCoord.y

    let i = iStart
    while (i <= iStop) {
        let j = jStart
        while (j <= jStop) {
            let newVal = grid[i][j] + modifier
            grid[i][j] = newVal < 0 ? 0 : newVal
            j++
        }
        i++
    }

    return grid
}

module.exports = {
    parseSantasPlan,
    countTotalLuminosity,
    handleInstruction,
    applyInstruction,
    parseCoord,
    createGrid,
}