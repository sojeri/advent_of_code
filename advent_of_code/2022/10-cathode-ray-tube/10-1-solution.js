/**
 * https://adventofcode.com/2022/day/10
 * calculates the signal strength of a given set of instructions
 * @param {*} instructions either 'noop' or 'addx #' lines
 * @returns the signal strength
 */
function solution(instructions) {
    let x = 1
    const signals = []
    let signalStrength = 0
    const signalChecks = [20, 60, 100, 140, 180, 220]

    let cycle = 1,
        nextInstr = 0
    /** x change request that's NOT ready to handle/execute */
    let next
    /** x change request that's ready to execute */
    let handle
    while (nextInstr < instructions.length) {
        instr = instructions[nextInstr]

        // "DURING" the cycle
        if (instr.charCodeAt(0) == 97 && next === undefined) {
            const [_, strNum] = instr.split(' ')
            next = Number(strNum)
        } else {
            handle = next
            next = undefined
            nextInstr += 1
        }

        if (signalChecks.includes(cycle)) {
            const current = cycle * x
            signals.push(current)
            signalStrength += current
        }
        cycle++

        // "AFTER" the cycle
        if (handle !== undefined) {
            x += handle
            handle = undefined
            next = undefined
        }
    }

    return signalStrength
}

module.exports = solution
