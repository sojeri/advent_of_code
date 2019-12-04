/**
 * given a set of instructions, returns a numeric code
 * @param {*} instructions a collection of instructions for a numeric keypad (eg, `ULL`)
 */
function findBathroomCode(instructions) {
    let keypad = [
        [-1, -1, 1, -1, -1],
        [-1, 2, 3, 4, -1],
        [5, 6, 7, 8, 9],
        [-1, 'A', 'B', 'C', -1],
        [-1, -1, 'D', -1, -1],
    ]

    let x = 0
    let y = 2

    let moveIfPossible = direction => {
        let newValue

        switch (direction) {
            case 'U':
                newValue = y - 1
                if (newValue >= 0 && keypad[newValue][x] != -1) {
                    y = newValue
                }
                break
            case 'D':
                newValue = y + 1
                if (newValue <= 4 && keypad[newValue][x] != -1) {
                    y = newValue
                }
                break
            case 'L':
                newValue = x - 1
                if (newValue >= 0 && keypad[y][newValue] != -1) {
                    x = newValue
                }
                break
            case 'R':
                newValue = x + 1
                if (newValue <= 4 && keypad[y][newValue] != -1) {
                    x = newValue
                }
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
