function parseLine(line) {
    const lineParts = line.split(' ')
    lineParts[1] = Number(lineParts[1])
    return lineParts
}

function trySwapNopJmp(lines, attemptNo) {
    const alreadySeen = {}
    let accumulator = 0
    let i = 0
    let nopJmps = 0
    while (i < lines.length) {
        if (alreadySeen[i]) {
            return false
        } else {
            alreadySeen[i] = true
        }

        let [instruction, value] = lines[i]
        if (instruction !== 'acc') {
            nopJmps++
            if (nopJmps === attemptNo) {
                instruction = instruction === 'nop' ? 'jmp' : 'nop'
            }
        }
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

    return accumulator
}

function solution(inputArray) {
    const lines = inputArray.map(parseLine)
    let i = 0
    let output = trySwapNopJmp(lines, i)
    while (output === false) {
        i++
        output = trySwapNopJmp(lines, i)
    }

    return output
}

module.exports = solution
