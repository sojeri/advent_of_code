const supportedParamTypes = {
    position: 0, // position == double lookup: get/set value at program[program[position]]
    immediate: 1, // immediate == single lookup: get/set value at program[position]
}

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

function addMemoryAccess(computer) {
    computer.get = (where, paramType) => {
        if (paramType == supportedParamTypes.immediate) {
            return computer.memory[where]
        }

        // ( else supportedParameters.position)
        return computer.memory[computer.memory[where]]
    }

    computer.set = (where, what) => {
        computer.memory[computer.memory[where]] = what
    }
}

const add = (a, b) => {
    return a + b
}
const multiply = (a, b) => {
    return a * b
}
const lessThan = (a, b) => {
    return a < b ? 1 : 0
}
const equals = (a, b) => {
    return a == b ? 1 : 0
}

function addOpCodePrograms(computer) {
    computer.computeAndSave = (whereAmI, param1Type, param2Type, computeCb) => {
        let first = computer.get(whereAmI + 1, param1Type)
        let second = computer.get(whereAmI + 2, param2Type)

        computer.set(whereAmI + 3, computeCb(first, second))

        return whereAmI + 4
    }

    computer.computeAndJump = (whereAmI, param1Type, param2Type, computeCb) => {
        let first = computer.get(whereAmI + 1, param1Type)
        let second = computer.get(whereAmI + 2, param2Type)

        return computeCb(first, second, whereAmI + 3)
    }

    computer.add = (whereAmI, param1Type, param2Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, add)
    }

    computer.multiply = (whereAmI, param1Type, param2Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, multiply)
    }

    computer.storeInput = whereAmI => {
        computer.set(whereAmI + 1, computer.input)
        return whereAmI + 2
    }

    computer.setOutput = (whereAmI, param1Type) => {
        let first = computer.get(whereAmI + 1, param1Type)
        computer.output = first

        return whereAmI + 2
    }

    computer.jumpIfTrue = (whereAmI, param1Type, param2Type) => {
        let first = computer.get(whereAmI + 1, param1Type)
        let second = computer.get(whereAmI + 2, param2Type)

        return first != 0 ? second : whereAmI + 3
    }

    computer.jumpIfFalse = (whereAmI, param1Type, param2Type) => {
        let first = computer.get(whereAmI + 1, param1Type)
        let second = computer.get(whereAmI + 2, param2Type)

        return first == 0 ? second : whereAmI + 3
    }

    computer.lessThan = (whereAmI, param1Type, param2Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, lessThan)
    }

    computer.equals = (whereAmI, param1Type, param2Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, equals)
    }

    computer.end = () => {
        return computer.output || computer.memory[0]
    }
}

/**
 * loads a given program and input to a given computer's memory
 * @param {*} intcodeComputer the computer to load the program and input into
 * @param {*} intcodeProgram an intcode program to load
 * @param {*} input the input to pass into the program on demand
 */
function loadProgram(intcodeComputer, intcodeProgram, input) {
    intcodeComputer.memory = intcodeProgram
    intcodeComputer.input = input
}

/**
 * runs the intcodeProgram on the given intcodeComputer
 * @param {*} computer an intcodeComputer holding an intcodeProgram in its memory
 */
function runProgram(computer) {
    if (!computer.memory || computer.memory.length == 0) {
        throw new Error('did you forget to load the program into memory?')
    }

    // begin processing
    let memoryPointer = 0
    while (true) {
        // get & parse parameters
        let opcode = computer.memory[memoryPointer]
        let param1Type = supportedParamTypes.position
        let param2Type = supportedParamTypes.position
        // // THIS CODE IS NEVER USED
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
        switch (opcode) {
            case opCodes.addition:
                memoryPointer = computer.add(memoryPointer, param1Type, param2Type)
                break
            case opCodes.multiplication:
                memoryPointer = computer.multiply(memoryPointer, param1Type, param2Type)
                break
            case opCodes.storeInput:
                memoryPointer = computer.storeInput(memoryPointer)
                break
            case opCodes.setOutput:
                memoryPointer = computer.setOutput(memoryPointer, param1Type)
                break
            case opCodes.jumpIfTrue:
                memoryPointer = computer.jumpIfTrue(memoryPointer, param1Type, param2Type)
                break
            case opCodes.jumpIfFalse:
                memoryPointer = computer.jumpIfFalse(memoryPointer, param1Type, param2Type)
                break
            case opCodes.lessThan:
                memoryPointer = computer.lessThan(memoryPointer, param1Type, param2Type)
                break
            case opCodes.equals:
                memoryPointer = computer.equals(memoryPointer, param1Type, param2Type)
                break
            case opCodes.end:
                return computer.end()
            default:
                throw new Error(`unrecognized Opcode found at postion ${memoryPointer}`)
        }
    }
}

function getIntcodeComputer() {
    let computer = {}

    addMemoryAccess(computer)
    addOpCodePrograms(computer)

    return computer
}

/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/
 * @param {*} program an intcode program consisting of opcodes, raw values, and storage slots
 * @param {*} input the input to use when encountering opcode 3 (saveInput)
 */
function exampleIntcodeComputerUsage(program, input = 1) {
    // sanitize data
    if (Array.isArray(program)) {
        program = program[0]
    }
    program = program.split(',').map(s => {
        return Number(s)
    })

    // arrange computer
    let computer = getIntcodeComputer()
    loadProgram(computer, program, input)

    return runProgram(computer)
}

module.exports = {
    exampleIntcodeComputerUsage,
    getIntcodeComputer,
    loadProgram,
    runProgram,
}
