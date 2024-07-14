/**
 *https://adventofcode.com/2022/day/9
 * @param {*} moves | a list of moves the head of the rope makes
 * @returns how many tail touches the grid
 */
function solution(moves) {
    const head = { x: 0, y: 0 },
        tail = { x: 0, y: 0 }
    const seen = new Set(['0,0'])
    moves.forEach(m => {
        const [dir, stepsStr] = m.split(' ')
        const steps = Number.parseInt(stepsStr)
        for (let i = 0; i < steps; i++) {
            // move head
            switch (dir) {
                case 'R': // move right: increment x
                    head.x += 1
                    break
                case 'L': // move left: decrement x
                    head.x -= 1
                    break
                case 'U': // move up: increment y
                    head.y += 1
                    break
                case 'D': // move down: decrement y
                    head.y -= 1
                    break
            }

            // try to move tail to catch up

            // tail is adjacent or overlapping head and doesn't need to move
            if (
                (head.x == tail.x && head.y == tail.y) || // same position
                (head.y == tail.y && head.x == tail.x + 1) || // HT
                (head.y == tail.y && head.x == tail.x - 1) || // TH
                (head.x == tail.x && head.y == tail.y + 1) || // vertical TH
                (head.x == tail.x && head.y == tail.y - 1) || // vertical HT
                (head.x == tail.x + 1 && head.y == tail.y + 1) || // diagonal up/rt
                (head.x == tail.x + 1 && head.y == tail.y - 1) || // diagonal dn/rt
                (head.x == tail.x - 1 && head.y == tail.y + 1) || // diagonal up/lf
                (head.x == tail.x - 1 && head.y == tail.y - 1) // diagonal dn/lf
            ) {
                continue // skip to next head move
            }

            // tail is exactly two away from head and needs to move one straight
            if (tail.y == head.y && tail.x + 2 == head.x) {
                // T.H -> TH
                tail.x += 1
            } else if (tail.y == head.y && tail.x - 2 == head.x) {
                // H.T -> HT
                tail.x -= 1
            } else if (tail.x == head.x && tail.y + 2 == head.y) {
                // vertical H.T
                tail.y += 1
            } else if (tail.x == head.x && tail.y - 2 == head.y) {
                // vertical T.H
                tail.y -= 1
                // tail is somewhere else and needs to move one diagonally
            } else if (head.x < tail.x) {
                tail.x -= 1
                tail.y += head.y < tail.y ? -1 : 1
            } else {
                tail.x += 1
                tail.y += head.y < tail.y ? -1 : 1
            }
            // console.log('after move', {dir, steps, i, head, tail})
            seen.add(`${tail.x},${tail.y}`)
        }
    })

    return seen.size
}

module.exports = solution
