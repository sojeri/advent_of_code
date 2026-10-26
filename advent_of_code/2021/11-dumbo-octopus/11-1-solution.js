// https://adventofcode.com/2021/day/11

const FLASH_POINT = 10

// these adorable scamps are used to print the swarm
const SHINIES = ['✨', '🐋', '🦈', '🐟', '🐠', '🐡', '🦞', '🦀', '🦑', '🐙']

class OctopusGrid {
    constructor(rawData) {
        const grid = []
        rawData.forEach(row => {
            grid.push(row.split('').map(s => Number(s)))
        })
        this.grid = grid
        this.itemMax = grid[0].length
        this.rowMax = grid.length
        this.flashCount = 0
        this.flashes = []
    }

    increment(rowIndex, itemIndex) {
        // early exit for invalid coordinates
        if (rowIndex < 0 || rowIndex >= this.rowMax) return
        if (itemIndex < 0 || itemIndex >= this.itemMax) return

        this.grid[rowIndex][itemIndex] += 1

        // flashy ✨🐙✨
        if (this.grid[rowIndex][itemIndex] === FLASH_POINT) {
            return this.flash(rowIndex, itemIndex)
        }
    }

    flash(rowIndex, itemIndex) {
        // handle trigger ✨🐙✨
        this.flashCount += 1
        this.flashes.push([rowIndex, itemIndex])

        // handle its friendly neighbors
        const neighbors = [
            [rowIndex - 1, itemIndex - 1], // upper left
            [rowIndex - 1, itemIndex], // upper
            [rowIndex - 1, itemIndex + 1], // upper right
            [rowIndex, itemIndex - 1], // left
            [rowIndex, itemIndex + 1], // right
            [rowIndex + 1, itemIndex - 1], // lower left
            [rowIndex + 1, itemIndex], // lower
            [rowIndex + 1, itemIndex + 1], // lower right
        ]
        neighbors.forEach(neighbor => {
            this.increment(neighbor[0], neighbor[1])
        })
    }

    step(shouldPrint = false) {
        // regular incrementing which handles flash
        for (let rowIndex = 0; rowIndex < this.rowMax; rowIndex++) {
            for (let itemIndex = 0; itemIndex < this.itemMax; itemIndex++) {
                this.increment(rowIndex, itemIndex)
            }
        }

        // restore flashing octopus to tired state
        let flashed = this.flashes.pop()
        while (flashed) {
            const [rowIndex, itemIndex] = flashed
            this.grid[rowIndex][itemIndex] = 0
            flashed = this.flashes.pop()
        }

        // print the glorious swarm
        if (shouldPrint) this.printFancy()
    }

    print() {
        this.grid.forEach(row => {
            console.log(row.join(''))
        })
    }

    printFancy() {
        console.log('\n\n')
        this.grid.forEach(row => {
            let output = ''
            row.forEach(item => {
                output += SHINIES[item]
            })
            console.log(output)
        })
    }
}

function solution(input, steps = 100) {
    const octopusSwarm = new OctopusGrid(input)
    for (let step = 1; step <= steps; step++) {
        octopusSwarm.step()
    }

    return octopusSwarm.flashCount
}

module.exports = { OctopusGrid, solution }
