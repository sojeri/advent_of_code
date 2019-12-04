/**
 * given a set of instructions, returns a numeric code
 * @param {*} instructions a collection of instructions for a numeric keypad (eg, `ULL`)
 */
function findBathroomCode(instructions) {
    let keypad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]

    let x = 0
    let y = 0

    let moveIfPossible = direction => {
        switch (direction) {
            case 'U':
                y = y - 1 >= 0 ? y - 1 : y
                break
            case 'D':
                y = y + 1 <= 2 ? y + 1 : y
                break
            case 'L':
                x = x - 1 >= 0 ? x - 1 : x
                break
            case 'R':
                x = x + 1 <= 2 ? x + 1 : x
                break
            default:
                throw new Error('unrecognized instruction')
        }
    }

    let keycode = ''

    instructions.forEach(instruction => {
        for (let i = 0; i < instruction.length; i++) {
            moveIfPossible(instruction[i])
        }

        keycode += keypad[y][x]
    })

    return keycode
}

module.exports = findBathroomCode
