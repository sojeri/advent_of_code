// https://adventofcode.com/2021/day/2

function parseLine(line) {
    const [direction, amount] = line.split(' ')
    return {
        direction,
        amount: Number(amount),
    }
}

function solution(rawInput) {
    const instructions = rawInput.map(parseLine)
    const submarine = {
        distance: 0,
        depth: 0,
    }
    instructions.forEach(step => {
        switch (step.direction) {
            case 'forward':
                submarine.distance = submarine.distance + step.amount
                break
            case 'down':
                submarine.depth = submarine.depth + step.amount
                break
            case 'up':
                submarine.depth = submarine.depth - step.amount
                break
        }
    })

    return submarine.depth * submarine.distance
}

module.exports = solution
