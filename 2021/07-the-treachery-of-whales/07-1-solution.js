// https://adventofcode.com/2021/day/7

/**
 * calculates useful stats about a numeric array including
 * - a roughly mean average (integer)
 * - min
 * - max
 * @param {*} numArr
 * @returns
 */
function average(numArr) {
    let sum = 0
    let min = numArr[0]
    let max = numArr[0]
    numArr.forEach(num => {
        sum += num
        min = num < min ? num : min
        max = num > max ? num : max
    })

    const mean = Math.floor(sum / numArr.length)
    return [mean, min, max]
}

const getSimpleFuelCost = n => {
    return n
}

function part1(input, getFuelCostCb = getSimpleFuelCost) {
    const numericInput = input[0].split(',').map(s => Number(s))
    const [mean, min, max] = average(numericInput)

    // try mean & going up from mean
    let upStart = mean
    let upSteps
    while (upStart <= max) {
        let currentSteps = 0
        numericInput.forEach(num => {
            // eg, 14 - 4 => 10; 2 - 4 => 2
            currentSteps += getFuelCostCb(Math.abs(num - upStart))
        })
        if (upSteps && currentSteps > upSteps) break
        upSteps = currentSteps
        upStart++
    }

    // try going down from mean
    let downStart = mean - 1
    let downSteps
    while (downStart >= min) {
        let currentSteps = 0
        numericInput.forEach(num => {
            // eg, 14 - 4 => 10; 2 - 4 => 2
            currentSteps += getFuelCostCb(Math.abs(num - downStart))
        })
        if (downSteps && currentSteps > downSteps) break
        downSteps = currentSteps
        downStart--
    }

    return upSteps < downSteps ? upSteps : downSteps
}

module.exports = part1
