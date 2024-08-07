const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let solution = require('./10-2-solution')

describe('10-2-solution', () => {
    describe('solution', () => {
        it('should return expected value for example input', () => {
            const expected = [
                [
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                    '#',
                    '#',
                    '.',
                    '.',
                ],
                [
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                ],
                [
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                ],
                [
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                ],
                [
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '.',
                ],
                [
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '#',
                    '.',
                    '.',
                    '.',
                    '.',
                    '.',
                ],
            ]
            assert.deepEqual(runCallbackAgainstFile(solution, '2022/10-cathode-ray-tube/example2.txt'), expected)
        })
        it('should return expected value for puzzle input', () => {
            const firstRow = [
                '#',
                '#',
                '#',
                '#',
                '.',
                '#',
                '#',
                '#',
                '.',
                '.',
                '.',
                '#',
                '#',
                '.',
                '.',
                '#',
                '#',
                '#',
                '.',
                '.',
                '#',
                '#',
                '#',
                '#',
                '.',
                '#',
                '#',
                '#',
                '.',
                '.',
                '.',
                '#',
                '#',
                '.',
                '.',
                '.',
                '.',
                '#',
                '#',
                '.',
            ]
            assert.deepEqual(runCallbackAgainstFile(solution, '2022/10-cathode-ray-tube/input.txt')[0], firstRow)
        })
    })
})
