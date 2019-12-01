let levels = [1]
function getLevels() {
    return levels
}

function calculateMaxValuePerLevel(level) {
    if (!levels[level]) {
        let prevMax = calculateMaxValuePerLevel(level - 1)
        let sqrt = Math.sqrt(prevMax) + 2
        levels[level] = sqrt * sqrt
    }
    return levels[level]
}

function findLevelContainingVal(val) {
    let currentLevel = 0
    let maxValPerCurrentLevel = calculateMaxValuePerLevel(currentLevel)
    while (maxValPerCurrentLevel < val) {
        currentLevel++
        maxValPerCurrentLevel = calculateMaxValuePerLevel(currentLevel)
    }

    return currentLevel
}

/**
 * misc notes leftover from my making sure findStepsFromOrigin's logic would work.
 * ---
 * levels = [1, 9, 25]
 * ---
 * val = 2; level = 1; maxVal = 9;
 * edgeSize = 2; maxSteps = 2; minVal = 2
 * m = 9; m => 7; m => 5; m => 3; m=> 1; break
 * maxVal => 8; maxSteps => 1
 * m = 8; m => 6; m => 4; m => 2; return 2
 * ---
 * val = 10; level = 2; maxVal = 25;
 * edgeSize = 4; maxSteps = 4; minVal = 10; hm = false;
 * m = 25; m => 21; m => 17; m => 13; m => 9; break
 * maxVal => 24; maxSteps = 3;
 * m = 24; m = 20; m = 16; m = 12; m = 8; break
 * maxVal => 23; maxSteps = 2; hm = true;
 * m = 23; m = 19; m = 15; m = 11; m = 7; break
 * maxVal => 22; maxSteps = 3;
 * m = 22; m = 18; m = 14; m = 10; return 3
 */

/**
 * How many steps are required to carry the data from the square
 * identified in your puzzle input all the way to the access port?
 * @param {*} val
 */
function findStepsFromOrigin(val) {
    let level = findLevelContainingVal(val)
    let maxVal = levels[level]
    let edgeSize = Math.sqrt(maxVal) - 1

    let minVal = levels[level - 1] + 1
    let stepsFromOrigin = level * 2
    let hitMidpoint = false
    while (maxVal >= minVal) {
        for (let m = maxVal; m >= minVal; m = m - edgeSize) {
            if (m == val) return stepsFromOrigin
        }

        if (hitMidpoint) {
            stepsFromOrigin++
        } else {
            stepsFromOrigin--
            if (stepsFromOrigin == level) hitMidpoint = true
        }

        maxVal--
    }

    return 0
}

module.exports = {
    calculateMaxValuePerLevel,
    findStepsFromOrigin,
    findLevelContainingVal,
    getLevels,
}
