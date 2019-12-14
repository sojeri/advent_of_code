const { complexSum } = require('../../utils/js/sumArray')

let axes = ['x', 'y', 'z']
function applyGravity(moons) {
    let moon1 = moons[0]
    if (!moon1.velocity) {
        // init velocity if not present
        moon1.velocity = { x: 0, y: 0, z: 0 }
    }

    for (let m = 1; m < moons.length; m++) {
        let moon2 = moons[m]
        if (!moon2.velocity) {
            // init velocity if not present
            moon2.velocity = { x: 0, y: 0, z: 0 }
        }

        axes.forEach(axis => {
            // adjust velocity per reqs
            if (moon1[axis] > moon2[axis]) {
                moon1.velocity[axis]--
                moon2.velocity[axis]++
            } else if (moon1[axis] < moon2[axis]) {
                moon1.velocity[axis]++
                moon2.velocity[axis]--
            } // else they are equal; do nothing
        })
    }
}

function applyVelocity(moons) {
    moons.forEach(moon => {
        axes.forEach(axis => {
            moon[axis] += moon.velocity[axis]
        })
    })
}

/**
 * tracks the movement of several objects over the course of a given number of time steps
 * @param {*} moons a collection of moons to track, form: {x, y, z}
 * @param {*} howLong int how many time steps to track the moons over
 */
function trackMovement(moons, howLong) {
    for (let t = 0; t < howLong; t++) {
        // make a copy of obj refs so we can pop to indicate processed w/o losing ref
        let moonsCopy = moons.slice(0)

        while (moonsCopy.length > 0) {
            applyGravity(moonsCopy)
            moonsCopy.shift() // (pop from the front)
        }

        applyVelocity(moons)
    }

    return moons
}

function calculateMoonEnergy(moon) {
    let kineticEnergy = 0
    let potentialEnergy = 0
    axes.forEach(axis => {
        potentialEnergy += Math.abs(moon[axis])
        kineticEnergy += Math.abs(moon.velocity[axis])
    })

    return kineticEnergy * potentialEnergy
}

const digitMatcher = /(-|)\d+/g
function solution(puzzleInput, howLong = 1000) {
    let moons = []

    // convert puzzle input to moon objects
    puzzleInput.forEach(line => {
        let moonBase = line.match(digitMatcher).map(s => {
            return Number(s)
        })
        let moon = {
            x: moonBase[0],
            y: moonBase[1],
            z: moonBase[2],
        }

        moons.push(moon)
    })

    trackMovement(moons, howLong)

    return complexSum(moons, calculateMoonEnergy)
}

module.exports = {
    solution,
    trackMovement,
}
