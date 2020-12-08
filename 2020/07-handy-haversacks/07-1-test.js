const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { parseLine, parseType, solution } = require('./07-1-solution')

describe('07-1-solution', () => {
    describe('parseType', () => {
        it('should return 2,shiny gold for "2 shiny gold bags"', () => {
            const expected = { count: 2, type: 'shiny gold' }
            assert.deepStrictEqual(parseType('2 shiny gold bags'), expected)
        })
        it('should return muted yellow for "muted yellow bag"', () => {
            const expected = { count: 1, type: 'muted yellow' }
            assert.deepStrictEqual(parseType('muted yellow bag'), expected)
        })
    })
    describe('parseLine', () => {
        it('should return desired output for "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags"', () => {
            const line = 'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags'
            const expected = {
                outer: { count: 1, type: 'muted yellow' },
                inner: [
                    { count: 2, type: 'shiny gold' },
                    { count: 9, type: 'faded blue' },
                ],
            }
            assert.deepStrictEqual(parseLine(line), expected)
        })
    })
    describe('solution', () => {
        it('should return 4 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/07-handy-haversacks/example.txt'), 4)
        })
        it('should return 185 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2020/07-handy-haversacks/input.txt'), 185)
        })
    })
})
