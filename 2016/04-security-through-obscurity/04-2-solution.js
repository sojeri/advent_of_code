const { isValidRoom, getNumberFromStr } = require('./04-1-solution')

const MIN = 'a'.charCodeAt(0)
const MAX = 'z'.charCodeAt(0)

// 'qzmt-zixmtkozy-ivhz-343[qwhatever]'
function decodeRoom(room) {
    const shiftBy = getNumberFromStr(room) % 26
    const [phrase, _nope] = room.split('[')
    let output = ''
    for (let i = 0; i < phrase.length; i++) {
        let charCode = phrase.charCodeAt(i)
        let char = phrase[i]
        if (charCode < MIN || charCode > MAX) {
            if (char === '-') {
                output += ' '
            } else {
                output += char
            }
        } else {
            charCode = charCode - MIN + shiftBy
            charCode = (charCode % 26) + MIN
            output += String.fromCharCode(charCode)
        }
    }
    return output
}

/**
--- Part Two ---

With all the decoy data out of the way, it's time to decrypt this list and get moving.

The room names are encrypted by a state-of-the-art shift cipher, which is nearly unbreakable without the right software. However, the information kiosk designers at Easter Bunny HQ were not expecting to deal with a master cryptographer like yourself.

To decrypt a room name, rotate each letter forward through the alphabet a number of times equal to the room's sector ID. A becomes B, B becomes C, Z becomes A, and so on. Dashes become spaces.

For example, the real name for qzmt-zixmtkozy-ivhz-343 is very encrypted name.

What is the sector ID of the room where North Pole objects are stored?
 */
function solution(rooms) {
    let storageRoom = ''
    rooms.forEach(room => {
        if (isValidRoom(room)) {
            const name = decodeRoom(room)
            if (name.includes('north') || name.includes('pole') || name.includes('santa')) {
                storageRoom = name
            }
        }
    })
    return storageRoom
}

module.exports = {
    solution,
    decodeRoom,
}
