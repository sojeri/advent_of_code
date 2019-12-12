const {
    addInput,
    getIntcodeComputer,
    loadProgram,
    runProgram,
    PAUSE_EXECUTION_MARKER,
    PROCESS_TERMINATED_MARKER,
} = require('../intcode-computer')

const directions = ['north', 'east', 'south', 'west']

const paintColors = {
    black: 0,
    white: 1,
}

const turns = {
    left: 0,
    right: 1,
}

let x = 0
let y = 0
let facing = 0 // directions[0] to be specific
let painted = {}

let isFirstPixel = true
let lowestY = 0
let highestY = 0
let lowestX = 0
let highestX = 0
function paintTurnAdvance(paintColor, turnType) {
    // paint
    let coord = `${x},${y}`
    if (isFirstPixel) {
        painted[coord] = paintColors.white
        isFirstPixel = false
    }

    if (paintColor == paintColors.black) {
        painted[coord] = '@'
    } else {
        // == paintColors.white
        painted[coord] = ' '
    }

    // turn
    if (turnType == turns.right) {
        facing = (facing + 1) % 4
    } else {
        // left
        facing = (facing + 3) % 4
    }

    // move
    switch (directions[facing]) {
        case 'north':
            y++
            break
        case 'south':
            y--
            break
        case 'east':
            x++
            break
        case 'west':
            x--
            break
    }

    // grid size calculation
    if (x < lowestX) {
        lowestX = x
    }
    if (y < lowestY) {
        lowestY = y
    }
    if (x < highestX) {
        highestX = x
    }
    if (y > highestY) {
        highestY = y
    }
}

function getCurrentPaintColor() {
    let coord = `${x},${y}`

    if (painted[coord] == ' ') {
        return paintColors.white
    }

    return paintColors.black
}

function actuallyPaintPainted() {
    let grid = []
    let yOffset = Math.abs(lowestY)
    let xOffset = Math.abs(lowestX)
    let pixelColors = Object.keys(painted)
    pixelColors.forEach(p => {
        // split key into raw coord
        let coord = p.split(',').map(s => {
            return Number(s)
        })
        let row = coord[1] + yOffset
        let col = coord[0] + xOffset

        // ensure y axis value present in grid
        if (!grid[row]) {
            grid[row] = []

            // fill row with dots
            for (let i = 0; i < highestY - lowestX; i++) {
                grid[row][i] = '@'
            }
        }

        // set x value to key value
        grid[row][col] = painted[p]
    })

    // display result
    grid.forEach(r => {
        console.log(r.join(''))
    })
}

function solution(intcodeProgram) {
    // arrange computer
    let computer = getIntcodeComputer(true, true)
    loadProgram(computer, intcodeProgram, 0)

    // begin processing
    while (true) {
        let exitCode = runProgram(computer)

        if (exitCode == PAUSE_EXECUTION_MARKER) {
            let paintInput = computer.output.splice(0, 2)
            paintTurnAdvance(paintInput[0], paintInput[1])
            let computerInput = getCurrentPaintColor()
            addInput(computer, computerInput)
        } else if (exitCode == PROCESS_TERMINATED_MARKER) {
            return actuallyPaintPainted()
        }
    }
}

module.exports = solution
