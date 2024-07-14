/**
 * https://adventofcode.com/2022/day/9#part2
 * @param {*} moves | a list of moves the head of the rope makes
 * @returns how many places the final knot (in a series of 10) touches in the grid
 */
function solution(moves) {
    const knots = []
    for (let i = 0; i < 10; i++) {
        knots.push({ x: 0, y: 0 })
    }
    const seen = new Set(['0,0'])
    moves.forEach(m => {
        const [dir, stepsStr] = m.split(' ')
        const steps = Number.parseInt(stepsStr)
        for (let i = 0; i < steps; i++) {
            for (let h = 0; h + 1 < knots.length; h++) {
                const head = knots[h],
                    tail = knots[h + 1]
                // only move real head; other knots move as tails
                if (h == 0) {
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
                if (h + 2 === knots.length) seen.add(`${tail.x},${tail.y}`)
            }
        }
    })

    return seen.size
}

module.exports = solution
