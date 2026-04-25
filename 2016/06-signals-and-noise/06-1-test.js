const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-1-solution')

describe('06-1-solution', () => {
    describe('solution', () => {
        it('should return `easter` for example input', () => {
            assert.strictEqual(
                solution([
                    'eedadn',
                    'drvtee',
                    'eandsr',
                    'raavrd',
                    'atevrs',
                    'tsrnev',
                    'sdttsa',
                    'rasrtv',
                    'nssdts',
                    'ntnada',
                    'svetve',
                    'tesnvt',
                    'vntsnd',
                    'vrdear',
                    'dvrsen',
                    'enarar',
                ]),
                `easter`
            )
        })
        it('should return `easter` for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/06-signals-and-noise/example.txt'), `easter`)
        })
        it('should return `usccerug` for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/06-signals-and-noise/input.txt'), `usccerug`)
        })
    })
})
