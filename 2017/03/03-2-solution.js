const { findLevelContainingVal, getLevels } = require('./03-1-solution');

/**
 * creates an n by n matrix
 * @param {*} n
 */
function createGrid(n) {
    let newGrid = new Array(n);
    for (let i = 0; i < n; i++) {
        newGrid[i] = new Array(n);
    }
    return newGrid;
}

let grid;
let valueToBeat;
let lastCalculatedValue = -1;

/** returns a flag indicating whether the lastCalculatedValue is still below valueToBeat */
const shouldProcessingContinue = () => lastCalculatedValue <= valueToBeat;

let currentLevelMinIndex;
let currentLevelMaxIndex;

/**
 * updates module state related to the current grid level
 * @param {*} levelMinIndex - the minIndex to set in module state
 * @param {*} levelMaxIndex - the minIndex to set in module state
 */
function updateGridLevel(levelMinIndex, levelMaxIndex) {
    currentLevelMinIndex = levelMinIndex;
    currentLevelMaxIndex = levelMaxIndex;
}

/**
 * returns a flag indicating whether a given index is within the grid
 * (takes current grid level into account)
 * @param {*} i - the index to verify
 * @returns true if i is within the grid and false otherwise
 */
function isValidIndex(i) {
    return currentLevelMinIndex <= i && i <= currentLevelMaxIndex;
}

/**
 * gets the value stored at the given coordinates
 * @param {*} x - one half of the coordinate pair
 * @param {*} y - the other half of the coordinate pair
 * @returns the stored value when one is present and 0 for any other case
 */
function getNumberFromGrid(x, y) {
    if (isValidIndex(x) && isValidIndex(y) && grid[x][y] != undefined) {
        return grid[x][y];
    }
    
    return 0;
}

/**
 * traverses adjacent coordinates and stores the sum of their values at given coordinate
 * @param {*} coordinate - the coordinate pair
 */
function calculateAndStoreValue(coordinate) {
    let sum = 0;
    let x = coordinate[0];
    let y = coordinate[1];
    for (let i = x-1; i <= x+1; i++) {
        for (let j = y-1; j <= y+1; j++) {
            sum += getNumberFromGrid(i, j);
        }
    }
    grid[x][y] = lastCalculatedValue = sum;
}

/**
 * calculates and stores values while traversing an edge of the current level.
 * this method calls itself recursively using @param getNextCoordinate to update
 * the coordinate being processed and @param isEdgeFinished to stop the recursion.
 * essentially-- this is a custom while loop.
 * @param {*} coordinate - the coordinate being processed
 * @param {*} shouldProcessEdge - a callback function that returns a flag indicating whether the edge is done processing
 * @param {*} getNextCoordinate - a callback function that returns the next coordinate to process
 */
function processEdge(coordinate, shouldProcessEdge, getNextCoordinate) {
    while (shouldProcessingContinue() && shouldProcessEdge(coordinate)) {
        calculateAndStoreValue(coordinate);
        processEdge(
            getNextCoordinate(coordinate),
            shouldProcessEdge,
            getNextCoordinate);
    }
}

/**
 * processes the right edge of the current level.
 */
function processRightEdge() {
    processEdge(
        [currentLevelMaxIndex, currentLevelMaxIndex - 1], // lowest value is always one up from bottom right corner
        c => { return c[1] > currentLevelMinIndex; }, // right edge ends when y meets top edge
        c => { c[1]--; return c; }); // traverse towards top edge
}

/**
 * processes the top edge of the current level.
 * this method should be called after processing right edge.
 */
function processTopEdge() {
    processEdge(
        [currentLevelMaxIndex, currentLevelMinIndex],
        c => { return c[0] > currentLevelMinIndex; }, // top edge ends when x meets left edge
        c => { c[0]--; return c; }); // traverse towards left edge
}

/**
 * processes the left edge of the current level.
 * this method should be called after processing top edge.
 */
function processLeftEdge() {
    processEdge(
        [currentLevelMinIndex, currentLevelMinIndex],
        c => { return c[1] < currentLevelMaxIndex; }, // left edge ends when y meets bottom edge
        c => { c[1]++; return c; }); // traverse towards bottom edge
}

/**
 * processes the bottom edge of the current level.
 * this method should be called after processing left edge.
 */
function processBottomEdge() {
    processEdge(
        [currentLevelMinIndex, currentLevelMaxIndex],
        c => { return c[0] <= currentLevelMaxIndex; }, // highest value is always bottom right corner
        c => { c[0]++; return c; }); // traverse towards right edge
}

/**
 * 
 * @param {*} val 
 */
function findFirstValueGreaterThanVal(val) {
    let level = findLevelContainingVal(val);
    let levels = getLevels();
    let gridSize = Math.sqrt(levels[level]) + 2;
    let midpoint = Math.floor(gridSize / 2);

    grid = createGrid(gridSize);
    valueToBeat = val;

    const getMinIndex = level => midpoint - level;
    const getMaxIndex = level => midpoint + level;

    // insert starting value
    grid[midpoint][midpoint] = 1;

    let currentLevel = 1;
    while (shouldProcessingContinue()) {
        updateGridLevel(getMinIndex(currentLevel), getMaxIndex(currentLevel))

        processRightEdge();
        processTopEdge();
        processLeftEdge();
        processBottomEdge();

        currentLevel++;
    }

    return lastCalculatedValue;
}

module.exports = findFirstValueGreaterThanVal;