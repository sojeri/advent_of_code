const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./06-2-solution')

describe('06-2-solution', () => {
    describe('solution', () => {
        it('should return `advent` for example input', () => {
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
                `advent`
            )
        })
        it('should return `advent` for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/06-signals-and-noise/example.txt'), `advent`)
        })
        it('should return `cnvvtafc` for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2016/06-signals-and-noise/input.txt'), `cnvvtafc`)
        })
    })
})
