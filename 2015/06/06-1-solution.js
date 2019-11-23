let { countTruths } = require('../../utils/js/countTruths')

/**
 * with Santa's help, we can finally take down our neighbors in that stupid
 * neighborhood lights contest! this method parses Santa's cheat sheet and
 * returns the count of how many lights are on. we can use this to ensure we
 * don't have to buy any more lights than we'll actually need. ;)
 * spec: https://adventofcode.com/2015/day/6
 * @param {*} instructions Santa's cheat sheet (a list of instructions)
 */
function parseSantasPlan(instructions) {
    let lightGrid = createGrid(1000)
    
    for (let i = 0; i < instructions.length; i++) {
        lightGrid = handleInstruction(lightGrid, instructions[i])
    }

    return countHowManyLightsAreOn(lightGrid)
}

/**
 * creates a square light grid containing values -- all boolean (false) if
 * no defaultValue is provided.
 * @param {*} size the size of the grid to create (eg 6 for a 6x6 square)
 * @param {*} defaultValue the value to insert at each position in the grid
 */
function createGrid(size, defaultValue=false) { // defaultValue for part2
    grid = []
    for (let x = 0; x < size; x++) {
        let row = []
        for (let y = 0; y < size; y++) {
            row[y] = defaultValue
        }
        grid[x] = row
    }

    return grid
}

const TOGGLE = 'toggle'
const ON = 'on'
const OFF = 'off'

/**
 * counts how many lights are on in a given light grid
 * @param {*} grid an array of arrays containing boolean values (true = light on)
 */
function countHowManyLightsAreOn(grid) {
    let howManyLightsAreOn = 0
    grid.forEach(row => {
        howManyLightsAreOn += countTruths(row)
    })

    return howManyLightsAreOn
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
            return toggle(grid, from, to)
        case ON:
            return turnOn(grid, from, to)
        case OFF:
            return turnOff(grid, from, to)
    }
}

/**
 * parses a string coordinate pair
 * @param {*} coordString a coordinate string, eg '44,600'
 * @returns a coordinate pair, eg { x: 44, y: 600 }
 * 
 * @usage
 * let coord = parseCoord('44,600') // returns { x: 44, y: 600 }
 * let x, y = coord[0], coord[1]
 */
function parseCoord(coordString) {
    let rawCoord = coordString.split(',').map(c => Number(c))
    return { x: rawCoord[0], y: rawCoord[1] }
}

/**
 * for a given grid, toggles values (true -> false OR false -> true) in a
 * rectangle defined by given start and end coordinates.
 * @param {*} grid a grid (array of arrays) containing boolean values
 * @param {*} startCoord the top left corner of the rectangle
 * @param {*} endCoord the bottom right corner of the rectangle
 */
function toggle(grid, startCoord, endCoord) {
    let iStart = startCoord.x
    let iStop = endCoord.x
    let jStart = startCoord.y
    let jStop = endCoord.y

    let i = iStart
    while (i <= iStop) {
        let j = jStart
        while (j <= jStop) {
            grid[i][j] = !grid[i][j]
            j++
        }
        i++
    }

    return grid
}

/**
 * for a given grid, truthifies values in a rectangle defined by given start
 * and end coordinates.
 * @param {*} grid a grid (array of arrays) containing boolean values
 * @param {*} startCoord the top left corner of the rectangle
 * @param {*} endCoord the bottom right corner of the rectangle
 */
function turnOn(grid, startCoord, endCoord) {
    let iStart = startCoord.x
    let iStop = endCoord.x
    let jStart = startCoord.y
    let jStop = endCoord.y

    let i = iStart
    while (i <= iStop) {
        let j = jStart
        while (j <= jStop) {
            grid[i][j] = true
            j++
        }
        i++
    }

    return grid
}

/**
 * for a given grid, falsifies values in a rectangle defined by given start
 * and end coordinates.
 * @param {*} grid a grid (array of arrays) containing boolean values
 * @param {*} startCoord the top left corner of the rectangle
 * @param {*} endCoord the bottom right corner of the rectangle
 */
function turnOff(grid, startCoord, endCoord) {
    let iStart = startCoord.x
    let iStop = endCoord.x
    let jStart = startCoord.y
    let jStop = endCoord.y

    let i = iStart
    while (i <= iStop) {
        let j = jStart
        while (j <= jStop) {
            grid[i][j] = false
            j++
        }
        i++
    }

    return grid
}

module.exports = {
    parseSantasPlan,
    countHowManyLightsAreOn,
    handleInstruction,
    parseCoord,
    toggle,
    turnOn,
    turnOff,
    createGrid,
}