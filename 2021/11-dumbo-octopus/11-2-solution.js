// https://adventofcode.com/2021/day/11#part2
const { OctopusGrid } = require('./11-1-solution')

class ExtendedOctopusGrid extends OctopusGrid {
    constructor(rawData) {
        super(rawData)
        this.swarmSize = this.rowMax * this.itemMax
    }

    /**
     * processes a single step for the swarm
     * returns true if the whole swarm is simultaneously flashing
     * returns false otherwise
     */
    tryFlashStep(shouldPrintFancy) {
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

        // print the glorious swarm
        if (shouldPrintFancy) this.printFancy()

        return isFlashStep
    }
}

function solution(input, steps = 1000) {
    const octopusSwarm = new ExtendedOctopusGrid(input)
    for (let step = 1; step <= steps; step++) {
        if (octopusSwarm.tryFlashStep()) return step
    }

    return -1
}

module.exports = { solution }
