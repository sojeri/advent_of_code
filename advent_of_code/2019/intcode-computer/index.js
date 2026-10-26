const supportedParamTypes = {
    position: 0, // position == double lookup: get/set value at program[program[position]]
    immediate: 1, // immediate == single lookup: get/set value at program[position]
    relative: 2, // relative == position + relative value
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
    relativeBaseOffset: 9,
}

function getType(int, multiplier) {
    if (int >= 2 * multiplier) {
        return [supportedParamTypes.relative, int - 2 * multiplier]
    } else if (int >= multiplier) {
        return [supportedParamTypes.immediate, int - multiplier]
    }

    return [supportedParamTypes.position, int]
}

function parseOpcode(raw) {
    let opcode = raw

    let param3 = getType(opcode, 10000)
    opcode = param3[1]

    let param2 = getType(opcode, 1000)
    opcode = param2[1]

    let param1 = getType(opcode, 100)
    opcode = param1[1]

    return {
        p1Type: param1[0],
        p2Type: param2[0],
        p3Type: param3[0],
        opcode: opcode,
    }
}

function addMemoryAccess(computer) {
    computer.get = (where, paramType) => {
        if (paramType == supportedParamTypes.immediate) {
            let value = computer.memory[where]
            return value != undefined ? value : 0
        }

        if (paramType == supportedParamTypes.relative) {
            let value = computer.memory[computer.memory[where] + computer.offset]
            return value != undefined ? value : 0
        }

        let value = computer.memory[computer.memory[where]]
        return value != undefined ? value : 0
    }

    computer.set = (where, what, paramType) => {
        if (paramType == supportedParamTypes.position) {
            computer.memory[computer.memory[where]] = what
        } else {
            // relative
            computer.memory[computer.memory[where] + computer.offset] = what
        }
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
    computer.computeAndSave = (whereAmI, param1Type, param2Type, param3Type, computeCb) => {
        let first = computer.get(whereAmI + 1, param1Type)
        let second = computer.get(whereAmI + 2, param2Type)

        computer.set(whereAmI + 3, computeCb(first, second), param3Type)

        return whereAmI + 4
    }

    computer.computeAndJump = (whereAmI, param1Type, param2Type, computeCb) => {
        let first = computer.get(whereAmI + 1, param1Type)
        let second = computer.get(whereAmI + 2, param2Type)

        return computeCb(first, second, whereAmI + 3)
    }

    computer.add = (whereAmI, param1Type, param2Type, param3Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, param3Type, add)
    }

    computer.multiply = (whereAmI, param1Type, param2Type, param3Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, param3Type, multiply)
    }

    computer.storeInput = (whereAmI, param1Type) => {
        computer.set(whereAmI + 1, computer.input.shift(), param1Type)
        return whereAmI + 2
    }

    computer.setOutput = (whereAmI, param1Type) => {
        let first = computer.get(whereAmI + 1, param1Type)
        computer.output.push(first)

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

    computer.lessThan = (whereAmI, param1Type, param2Type, param3Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, param3Type, lessThan)
    }

    computer.equals = (whereAmI, param1Type, param2Type, param3Type) => {
        return computer.computeAndSave(whereAmI, param1Type, param2Type, param3Type, equals)
    }

    computer.relativeBaseOffset = (whereAmI, param1Type) => {
        let first = computer.get(whereAmI + 1, param1Type)
        computer.offset = first + computer.offset
        return whereAmI + 2
    }

    computer.end = () => {
        if (!computer.returnFullOutput) {
            computer.output = computer.output.pop()
        }
        if (computer.waitForInput) {
            return PROCESS_TERMINATED_MARKER
        }
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
    if (!Array.isArray(intcodeProgram)) {
        intcodeProgram = intcodeProgram.split(',').map(s => {
            return Number(s)
        })
    }

    intcodeComputer.memory = intcodeProgram
    if (input != undefined) {
        intcodeComputer.input = Array.isArray(input) ? input : [input]
    } else {
        intcodeComputer.input = []
    }
}

/**
 * allows submitting new input during asynchronous execution mode.
 * (when computer.waitForInput is set to true.)
 * @param {*} intcodeComputer
 * @param {*} input
 */
function addInput(intcodeComputer, input) {
    if (!intcodeComputer.input) {
        intcodeComputer.input = []
    }
    intcodeComputer.input.push(input)
}

/**
 * runs the intcodeProgram on the given intcodeComputer.
 * * in sync mode, computer returns output (see opcode 4) or value stored at position 0.
 * * in async mode (computer.waitForInput == true), computer returns pause or end terimation signals.
 *   * @see PAUSE_EXECUTION_MARKER, PROCESS_TERMINATED_MARKER
 * @param {*} computer an intcodeComputer holding an intcodeProgram in its memory
 */
function runProgram(computer) {
    if (!computer.memory || computer.memory.length == 0) {
        throw new Error('did you forget to load the program into memory?')
    }

    // begin processing
    let memoryPointer = computer.savePoint || 0
    while (true) {
        // get parameters
        let opcodeTypes = parseOpcode(computer.memory[memoryPointer])
        let param1Type = opcodeTypes.p1Type
        let param2Type = opcodeTypes.p2Type
        let param3Type = opcodeTypes.p3Type

        // handle current opcode
        switch (opcodeTypes.opcode) {
            case opCodes.addition:
                memoryPointer = computer.add(memoryPointer, param1Type, param2Type, param3Type)
                break
            case opCodes.multiplication:
                memoryPointer = computer.multiply(memoryPointer, param1Type, param2Type, param3Type)
                break
            case opCodes.storeInput:
                if (computer.waitForInput && computer.input.length == 0) {
                    computer.savePoint = memoryPointer
                    return PAUSE_EXECUTION_MARKER
                } else if (computer.input.length == 0) {
                    throw new Error('program called for input, but computer has none!')
                }
                memoryPointer = computer.storeInput(memoryPointer, param1Type)
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
                memoryPointer = computer.lessThan(memoryPointer, param1Type, param2Type, param3Type)
                break
            case opCodes.equals:
                memoryPointer = computer.equals(memoryPointer, param1Type, param2Type, param3Type)
                break
            case opCodes.relativeBaseOffset:
                memoryPointer = computer.relativeBaseOffset(memoryPointer, param1Type)
                break
            case opCodes.end:
                return computer.end()
            default:
                throw new Error(`unrecognized Opcode found at postion ${memoryPointer}`)
        }
    }
}

/**
 * returns an intcode computer capable of processing intcode programs.
 * (use loadProgram to add an intcode program to memory and runProgram to trigger execution.)
 * @param {*} waitForInput a boolean flag indicating whether the computer should pause execution when new input is required
 */
function getIntcodeComputer(waitForInput = false, returnFullOutput = false) {
    let computer = {}
    computer.waitForInput = waitForInput
    computer.returnFullOutput = returnFullOutput
    computer.offset = 0
    computer.output = []

    addMemoryAccess(computer)
    addOpCodePrograms(computer)

    return computer
}

/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/
 * @param {*} program an intcode program consisting of opcodes, raw values, and storage slots
 * @param {*} input the input to use when encountering opcode 3
 */
function exampleIntcodeComputerUsage(program, input = 1) {
    // sanitize data
    if (Array.isArray(program)) {
        program = program[0]
    }

    // arrange computer
    let computer = getIntcodeComputer()
    loadProgram(computer, program, input)

    return runProgram(computer)
}

const PAUSE_EXECUTION_MARKER = 'PAUSE'
const PROCESS_TERMINATED_MARKER = 'END'

module.exports = {
    addInput,
    exampleIntcodeComputerUsage,
    getIntcodeComputer,
    loadProgram,
    runProgram,
    PAUSE_EXECUTION_MARKER,
    PROCESS_TERMINATED_MARKER,
}
