function parseLine(line) {
    const lineParts = line.split(' ')
    lineParts[1] = Number(lineParts[1])
    return lineParts
}

function solution(inputArray) {
    const lines = {}
    let accumulator = 0
    let i = 0
    while (i < inputArray.length) {
        if (!lines[i]) {
            lines[i] = parseLine(inputArray[i])
        } else {
            return accumulator
        }

        const [instruction, value] = lines[i]
        switch (instruction) {
            case 'acc':
                accumulator += value
                i++
                continue
            case 'nop':
                i++
                continue
            case 'jmp':
                i += value
                continue
        }
    }

    return -1
}

module.exports = solution
