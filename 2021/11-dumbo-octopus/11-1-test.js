const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./11-1-solution')

describe.only('11-1-solution', () => {
    describe('solution', () => {
        it('should return 9 for example 999,919,999 input', () => {
            assert.strictEqual(solution(['11111', '19991', '19191', '19991', '11111'], 1), 9)
        })
        it('should return 204 for example input', () => {
            const solWrapper = steps => {
                return input => {
                    return solution(input, steps)
                }
            }

            const tenSteps = solWrapper(10)
            assert.strictEqual(runCallbackAgainstFile(tenSteps, '2021/11-dumbo-octopus/example.txt'), 204)
        })
        it('should return 1656 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/11-dumbo-octopus/example.txt'), 1656)
        })
        it('should return 1669 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/11-dumbo-octopus/input.txt'), 1669)
        })
    })
})
