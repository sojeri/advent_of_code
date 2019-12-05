const supportedParamTypes = {
    position: 0,
    immediate: 1,
}

/**
 * runs through instructions in a given intcode program.
 * on program exit, returns the value stored in position 0 of the program.
 * full spec: https://adventofcode.com/2019/day/5
 * @param {*} program the opcode program to run
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

        let first, second, third
        switch (opcode) {
            case 1: // addition
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                // third is going to be used for a set operation, so it's always immediate
                third = getValue(program, here + 3, supportedParamTypes.immediate)
                setValue(program, third, first + second)
                here += 4
                break
            case 2: // multiplication
                first = getValue(program, here + 1, param1Type)
                second = getValue(program, here + 2, param2Type)
                // third is going to be used for a set operation, so it's always immediate
                third = getValue(program, here + 3, supportedParamTypes.immediate)
                setValue(program, third, first * second)
                here += 4
                break
            case 3: // set
                // first is going to be used for a set operation, so it's always immediate
                first = getValue(program, here + 1, supportedParamTypes.immediate)
                setValue(program, first, input)
                here += 2
                break
            case 4: // get
                first = getValue(program, here + 1, param1Type)
                output = first
                // // UNCOMMENT ME TO TROUBLESHOOT!
                // console.log(output)
                here += 2
                break
            case 99: // end
                return output || program[0]
            default:
                throw new Error(`unrecognized Opcode found at postion ${here}`)
        }
    }
}

/**
 * gets a value from a given program based on a given position and parameter type
 * @param {*} program the program to get values from
 * @param {*} position the position or value to return (depending on parameter type)
 * @param {*} parameterType the type of parameter (or value grab) in play
 */
function getValue(program, position, parameterType) {
    let initial = program[position]

    // immediate == single lookup: return value at program[position]
    if (parameterType == supportedParamTypes.immediate) {
        return initial
    }

    // position == double lookup: return value at program[program[position]]
    // ( else supportedParameters.position)
    return program[initial]
}

/**
 * update a value within a given program at given position
 * @param {*} program the program to set values in
 * @param {*} position the position to set the value at
 * @param {*} parameterType the value to set
 */
function setValue(program, position, newValue) {
    return (program[position] = newValue)
}

module.exports = {
    intcodeComputer,
    getValue,
    setValue,
    supportedParamTypes,
}
