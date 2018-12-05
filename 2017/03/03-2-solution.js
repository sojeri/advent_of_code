/**
    if (!levels[level]) {
        let prevMax = calculateMaxValuePerLevel(level - 1);
        let sqrt = Math.sqrt(prevMax) + 2;
        levels[level] = sqrt * sqrt;
    }

    let level = findLevelContainingVal(val);
    let maxVal = levels[level];
    let edgeSize = Math.sqrt(maxVal) - 1;
 */

let levels = [1];

function calculateMaxValuePerLevel(level) {
    if (!levels[level]) {
        let prevMax = calculateMaxValuePerLevel(level - 1);
        let sqrt = Math.sqrt(prevMax) + 2;
        levels[level] = sqrt * sqrt;
    }
    return levels[level];
}

function findLevelContainingVal(val) {
    let currentLevel = 0;
    let maxValPerCurrentLevel = calculateMaxValuePerLevel(currentLevel);
    while (maxValPerCurrentLevel < val) {
        currentLevel++;
        maxValPerCurrentLevel = calculateMaxValuePerLevel(currentLevel);
    }

    return currentLevel;
}

function createGrid(size) {
    let newGrid = new Array(size);
    for (let i = 0; i < size; i++) {
        newGrid[i] = new Array(size);
    }
    return newGrid;
}

function findFirstValueGreaterThanVal(val) {
    let level = findLevelContainingVal(val);
    let edgeSize = Math.sqrt(levels[level]);
    let grid = createGrid(edgeSize);

    function isValidIndex(i) {
        // OPTIMIZE: could make use of current level here to return false...
        // for any value outside current calculations. eg, 0 is out of range
        // for level 1 in a level 2 sized grid.
        return i >= 0 && i < edgeSize;
    }

    /**
     * gets the value stored at the given coordinates
     * @param {*} x - one half of the coordinate pair
     * @param {*} y - the other half of the coordinate pair
     */
    function getNumberFromGrid(x, y) {
        if (isValidIndex(x) && isValidIndex(y) && grid[x][y] != undefined) {
            return grid[x][y];
        }
        
        return 0;
    }


    function calculateAndStoreValue(x, y) {
        let sum = 0;
        for (let i = x-1; i <= x+1; i++) {
            for (let j = y-1; j <= y+1; j++) {
                sum += getNumberFromGrid(i, j);
            }
        }
        lastCalculatedValue = sum;
        grid[x][y] = lastCalculatedValue;
    }

    const getMinIndex = level => midpoint - level;
    const getMaxIndex = level => midpoint + level;


    // brute force solution:
    // ---------------------
    // create square matrix with edge size edgeSize
    // starting from middle, begin filling in values
    //
    // there is probably some way to math this out, but IDEK

    let lastCalculatedValue = -1;
    let midpoint = Math.floor(edgeSize / 2);

    // insert starting value
    grid[midpoint][midpoint] = 1;

    let currentLevel = 1;

    const isCalculationNeeded = () => lastCalculatedValue < val;
    while (isCalculationNeeded()) { // each loop is a grid level
        let levelMinIndex = getMinIndex(currentLevel);
        let levelMaxIndex = getMaxIndex(currentLevel);

        // right edge
        let x = levelMaxIndex;
        let y = levelMaxIndex - 1; // lowest value is always one up from bottom right corner
        while (isCalculationNeeded() && y > levelMinIndex) {
            calculateAndStoreValue(x, y);
            y--;
        }

        // top edge
        // starting values: x == levelMaxIndex; y == levelMinIndex;
        while (isCalculationNeeded() && x > levelMinIndex) {
            calculateAndStoreValue(x, y);
            x--;
        }

        // left edge
        // starting values: x == levelMinIndex; y == levelMinIndex;
        while (isCalculationNeeded() && y < levelMaxIndex) {
            calculateAndStoreValue(x, y);
            y++;
        }

        // bottom edge
        // starting values: x == levelMinIndex; y == levelMaxIndex;
        while (isCalculationNeeded() && x <= levelMaxIndex) { // highest value is always bottom right corner
            calculateAndStoreValue(x, y);
            x++;
        }

        currentLevel++;
    }

    return lastCalculatedValue;
}

module.exports = findFirstValueGreaterThanVal;