/**
 * https://adventofcode.com/2022/day/5
 */
function solution(lines) {
    STACKS = WHERES.map(() => [])

    let i = parseInitialState(lines)
    for (; i < lines.length; i++) {
        const state = lines[i]
        const instruction = parseInstruction(state)
        handleInstruction(instruction)
    }

    let output = ''
    STACKS.forEach(s => {
        const item = s.pop()
        if (item) output += item
    })
    return output
}

const CAN_HAS_NUMBERS = /\d+/g

// [A] [B] [C]
// 0123456789
/**
[W] [B] [H] [F] [L] [F] [J] [V] [B]
 1   2   3   4   5   6   7   8   9 
0123456789012345678901234567890123456789
0         1         2         3         4 
 */
const WHERES = [1, 5, 9, 13, 17, 21, 25, 29, 33]
let STACKS
const SPACE = ' '

/**
 * convert this ASCII art:
 * .... [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1 . 2 . 3
 * into 3 js arrays:
 * [Z,N]
 * [M,C,D]
 * [P]
 * no dots in real input
 *
 * returns the index where instruction state begins
 */
function parseInitialState(arr) {
    let i = 0
    for (; i < arr.length; i++) {
        const items = arr[i]
        if (items.match(CAN_HAS_NUMBERS)) return i + 2

        WHERES.forEach((where, stack) => {
            addItemToStack(items, where, stack)
        })
    }
}

function addItemToStack(state, where, stack) {
    const item = state[where]
    if (item && item !== SPACE) {
        STACKS[stack].unshift(item)
    }
}

function parseInstruction(state) {
    const [move, from, to] = state.match(CAN_HAS_NUMBERS).map(s => Number.parseInt(s))
    return { move, from, to }
}

function handleInstruction({ move, from, to }) {
    const moving = []
    let stack = STACKS[from - 1]
    for (let i = 0; i < move; i++) {
        moving.push(stack.pop())
    }
    stack = STACKS[to - 1]
    stack.push(...moving)
}

module.exports = solution
