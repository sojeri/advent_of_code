//

const FLASH_POINT = 10
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
        this.swarmSize = grid.length * grid[0].length
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

    /** processes a single step for the warm
     * returns true if the swarm is all simutaneously flashing
     * returns false otherwise
     */
    tryFlashStep() {
        // regular incrementing which handles flash
        for (let rowIndex = 0; rowIndex < this.rowMax; rowIndex++) {
            for (let itemIndex = 0; itemIndex < this.itemMax; itemIndex++) {
                this.increment(rowIndex, itemIndex)
            }
        }

        const isFlashStep = this.flashes.length === this.swarmSize

        // restore flashing octopus to tired state
        let flashed = this.flashes.pop()
        while (flashed) {
            const [rowIndex, itemIndex] = flashed
            this.grid[rowIndex][itemIndex] = 0
            flashed = this.flashes.pop()
        }

        return isFlashStep
    }

    print() {
        this.grid.forEach(row => {
            console.log(row.join(''))
        })
    }

    printFancy() {
        this.grid.forEach(row => {
            let output = ''
            row.forEach(item => {
                output += item === 0 ? '✨' : '🐙'
            })
            console.log(output)
        })
    }
}

function solution(input, steps = 1000) {
    const octopusSwarm = new OctopusGrid(input)
    for (let step = 1; step <= steps; step++) {
        if (octopusSwarm.tryFlashStep()) return step
    }

    return -1
}

module.exports = solution
