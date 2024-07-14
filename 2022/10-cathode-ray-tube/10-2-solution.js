//

/**
 * @returns a 40x6 screen of . pixels (a string matrix)
 */
function getBlankScreen() {
    const screen = []
    const getEmptyRow = () => {
        const row = []
        for (let i = 0; i < 40; i++) {
            row.push('.')
        }
        return row
    }

    for (let i = 0; i < 6; i++) {
        screen.push(getEmptyRow())
    }

    return screen
}

/**
 * https://adventofcode.com/2022/day/10#part2
 * simulates drawing some pixels on a screen
 * @param {*} instructions
 */
function solution(instructions) {
    let x = 1
    let cycle = 1,
        nextInstr = 0
    const screen = getBlankScreen()
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

        // light pixel if sprite overlaps with current pixel
        const currentSpriteLocation = [x, x + 1, x - 1]
        const pixel = (cycle % 40) - 1 // cycle 1 is pixel 0
        if (currentSpriteLocation.includes(pixel)) {
            const row = Math.floor(cycle / 40)
            screen[row][pixel] = '#'
        }
        cycle++

        // "AFTER" the cycle
        if (handle !== undefined) {
            x += handle
            handle = undefined
            next = undefined
        }
    }

    return screen
}

module.exports = solution
