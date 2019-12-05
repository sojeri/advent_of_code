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

let global_program_output

/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/day/5
 * @param {*} program an intcode program consisting of opcodes, raw values, and storage slots
 * @param {*} input the input to use when encountering opcode 3 (saveInput)
 */
function intcodeComputer(program, input = 1) {
    // sanitize data
    if (Array.isArray(program)) {
        program = program[0]
    }
    program = program.split(',').map(s => {
        return Number(s)
    })
    global_program_output = undefined

    // begin processing
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
        switch (opcode) {
            case opCodes.addition:
                here = addition(program, here, param1Type, param2Type)
                break
            case opCodes.multiplication:
                here = multiplication(program, here, param1Type, param2Type)
                break
            case opCodes.storeInput:
                here = storeInput(program, here, input)
                break
            case opCodes.setOutput:
                here = setOutput(program, here, param1Type)
                break
            case opCodes.jumpIfTrue:
                here = jumpIfTrue(program, here, param1Type, param2Type)
                break
            case opCodes.jumpIfFalse:
                here = jumpIfFalse(program, here, param1Type, param2Type)
                break
            case opCodes.lessThan:
                here = lessThan(program, here, param1Type, param2Type)
                break
            case opCodes.equals:
                here = equals(program, here, param1Type, param2Type)
                break
            case opCodes.end:
                return end(program)
            default:
                throw new Error(`unrecognized Opcode found at postion ${here}`)
        }
    }
}

/**
 * run an opCode operation -- addition -- on a given program.
 * (adds two parameters together and saves the result in a third parameter's immediate location.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the addition operation
 * @param {*} whereAmI a pointer indiciating addition's position in the program
 * @param {*} param1Type the type of addition's first parameter
 * @param {*} param2Type the type of addition's second paramter
 */
function addition(program, whereAmI, param1Type, param2Type) {
    first = getValue(program, whereAmI + 1, param1Type)
    second = getValue(program, whereAmI + 2, param2Type)

    // third is going to be used for a set operation, so it's always immediate
    third = getValue(program, whereAmI + 3, supportedParamTypes.immediate)
    setValue(program, third, first + second)

    return whereAmI + 4
}

/**
 * run an opCode operation -- multiplication -- on a given program.
 * (multiplies two parameters together and saves the result in a third parameter's immediate location.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the multiplication operation
 * @param {*} whereAmI a pointer indiciating multiplication's position in the program
 * @param {*} param1Type the type of multiplication's first parameter
 * @param {*} param2Type the type of multiplication's second paramter
 */
function multiplication(program, whereAmI, param1Type, param2Type) {
    first = getValue(program, whereAmI + 1, param1Type)
    second = getValue(program, whereAmI + 2, param2Type)

    // third is going to be used for a set operation, so it's always immediate
    third = getValue(program, whereAmI + 3, supportedParamTypes.immediate)
    setValue(program, third, first * second)

    return whereAmI + 4
}

/**
 * run an opCode operation -- storeInput -- on a given program.
 * (stores the program input in the immediate location of the first parameter.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the storeInput operation
 * @param {*} whereAmI a pointer indiciating storeInput's position in the program
 * @param {*} input the program input
 */
function storeInput(program, whereAmI, input) {
    // first is going to be used for a set operation, so it's always immediate
    let first = getValue(program, whereAmI + 1, supportedParamTypes.immediate)
    setValue(program, first, input)

    return whereAmI + 2
}

/**
 * run an opCode operation -- setOutput -- on a given program.
 * (gets the program output from a given param and saves it to global state.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the setOutput operation
 * @param {*} whereAmI a pointer indiciating setOutput's position in the program
 * @param {*} param1Type the type of setOutput's first parameter
 */
function setOutput(program, whereAmI, param1Type) {
    let first = getValue(program, whereAmI + 1, param1Type)
    global_program_output = first

    return whereAmI + 2
}

/**
 * run an opCode operation -- jumpIfTrue -- on a given program.
 * (sets next opCode value as the second param if the first param is nonzero.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the jumpIfTrue operation
 * @param {*} whereAmI a pointer indiciating jumpIfTrue's position in the program
 * @param {*} param1Type the type of jumpIfTrue's first parameter
 * @param {*} param2Type the type of jumpIfTrue's second paramter
 */
function jumpIfTrue(program, whereAmI, param1Type, param2Type) {
    let first = getValue(program, whereAmI + 1, param1Type)
    let second = getValue(program, whereAmI + 2, param2Type)

    return first != 0 ? second : whereAmI + 3
}

/**
 * run an opCode operation -- jumpIfFalse -- on a given program.
 * (sets next opCode value as the second param if the first param is zero.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the jumpIfFalse operation
 * @param {*} whereAmI a pointer indiciating jumpIfFalse's position in the program
 * @param {*} param1Type the type of jumpIfFalse's first parameter
 * @param {*} param2Type the type of jumpIfFalse's second paramter
 */
function jumpIfFalse(program, whereAmI, param1Type, param2Type) {
    let first = getValue(program, whereAmI + 1, param1Type)
    let second = getValue(program, whereAmI + 2, param2Type)

    return first == 0 ? second : whereAmI + 3
}

/**
 * run an opCode operation -- lessThan -- on a given program.
 * (checks if the first param is less than the second and saves the result (bool 1 or 0) in a third parameter's immediate location.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the lessThan operation
 * @param {*} whereAmI a pointer indiciating lessThan's position in the program
 * @param {*} param1Type the type of lessThan's first parameter
 * @param {*} param2Type the type of lessThan's second paramter
 */
function lessThan(program, whereAmI, param1Type, param2Type) {
    let first = getValue(program, whereAmI + 1, param1Type)
    let second = getValue(program, whereAmI + 2, param2Type)

    // third is going to be used for a set operation, so it's always immediate
    let third = getValue(program, whereAmI + 3, supportedParamTypes.immediate)
    setValue(program, third, first < second ? 1 : 0)

    return whereAmI + 4
}

/**
 * run an opCode operation -- equals -- on a given program.
 * (checks if two parameters are equal and saves the result (bool 1 or 0) in a third parameter's immediate location.)
 * returns the a value from which to read the next opCode.
 * @param {*} program the intcode program on which to run the equals operation
 * @param {*} whereAmI a pointer indiciating equals's position in the program
 * @param {*} param1Type the type of equals's first parameter
 * @param {*} param2Type the type of equals's second paramter
 */
function equals(program, whereAmI, param1Type, param2Type) {
    let first = getValue(program, whereAmI + 1, param1Type)
    let second = getValue(program, whereAmI + 2, param2Type)

    // third is going to be used for a set operation, so it's always immediate
    let third = getValue(program, whereAmI + 3, supportedParamTypes.immediate)
    setValue(program, third, first == second ? 1 : 0)

    return whereAmI + 4
}

/**
 * run an opCode operation -- end -- on a given program.
 * (terminates processing of the current intcode program.)
 * returns the program output, or if that is falsy the value stored in the initial position.
 * @param {*} program the intcode program on which to run the end operation
 */
function end(program) {
    return global_program_output || program[0]
}

module.exports = intcodeComputer
