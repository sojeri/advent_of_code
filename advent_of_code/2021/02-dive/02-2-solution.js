// https://adventofcode.com/2021/day/2#part2

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
        aim: 0,
    }
    instructions.forEach(step => {
        switch (step.direction) {
            case 'forward':
                submarine.distance = submarine.distance + step.amount
                submarine.depth = submarine.depth + submarine.aim * step.amount
                break
            case 'down':
                submarine.aim = submarine.aim + step.amount
                break
            case 'up':
                submarine.aim = submarine.aim - step.amount
                break
        }
    })

    return submarine.depth * submarine.distance
}

module.exports = solution
