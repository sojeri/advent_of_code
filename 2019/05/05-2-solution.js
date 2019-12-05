const { getValue, setValue, supportedParamTypes } = require('./05-1-solution')

const opCodes = {
    end: 99,
    addition: 1,
    multiplication: 2,
    storeInput: 3,
    setOutput: 4,
    jumpIfTrue: 5,
    jumpIfFalse: 6,
    lessThan: 7,
    equals: 8,
}

/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/day/5
 * @param {*} program an intcode program consisting of opcodes, raw values, and storage slots
 * @param {*} input the input to use when encountering opcode 3 (saveInput)
 */
function intcodeComputer(program, input = 1) {
    let output

    if (Array.isArray(program)) {
        program = program[0]
    }

    program = program.split(',').map(s => {
        return Number(s)
    })

    let here = 0
    while (true) {
        // get & parse parameters
        let opcode = program[here]
        let param1Type = supportedParamTypes.position
        let param2Type = supportedParamTypes.position
        // // THIS CODE IS NEVER USED BECAUSE 5 DIGIT OPCODE IS IMPLICIT????
        // // SO I COMMENTED IT OUT *SHAKES FIST*
        // let param3Type = supportedParamTypes.position

        // if (opcode >= 10000) {
        //     param3Type = supportedParamTypes.immediate
        //     opcode = opcode - 10000
        // }

        if (opcode >= 1000) {
            param2Type = supportedParamTypes.immediate
            opcode = opcode - 1000
        }

        if (opcode >= 100) {
            param1Type = supportedParamTypes.immediate
            opcode = opcode - 100
        }

        // handle opcodes
        let first, second, third
        switch (opcode) {
            case opCodes.addition:
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                // third is going to be used for a set operation, so it's always immediate
                third = getValue(program, here + 3, supportedParamTypes.immediate)
                setValue(program, third, first + second)
                here += 4
                break
            case opCodes.multiplication:
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                // third is going to be used for a set operation, so it's always immediate
                third = getValue(program, here + 3, supportedParamTypes.immediate)
                setValue(program, third, first * second)
                here += 4
                break
            case opCodes.storeInput:
                // first is going to be used for a set operation, so it's always immediate
                first = getValue(program, here + 1, supportedParamTypes.immediate)
                setValue(program, first, input)
                here += 2
                break
            case opCodes.setOutput:
                first = getValue(program, here + 1, param1Type)
                output = first
                // // UNCOMMENT ME TO TROUBLESHOOT!
                // console.log(output)
                here += 2
                break
            case opCodes.jumpIfTrue:
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                here = first > 0 ? second : here + 3
                break
            case opCodes.jumpIfFalse:
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                here = first == 0 ? second : here + 3
                break
            case opCodes.lessThan:
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                // third is going to be used for a set operation, so it's always immediate
                third = getValue(program, here + 3, supportedParamTypes.immediate)
                setValue(program, third, first < second ? 1 : 0)
                here += 4
                break
            case opCodes.equals:
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                // third is going to be used for a set operation, so it's always immediate
                third = getValue(program, here + 3, supportedParamTypes.immediate)
                setValue(program, third, first == second ? 1 : 0)
                here += 4
                break
            case opCodes.end:
                return output || program[0]
            default:
                throw new Error(`unrecognized Opcode found at postion ${here}`)
        }
    }
}

module.exports = intcodeComputer
