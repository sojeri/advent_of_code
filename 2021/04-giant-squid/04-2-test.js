const assert = require('assert')
let runCallbackAgainstFile = require('../../utils/js/runCbAgainstFileAsArray')
let { solution, StopAfterWinningBoard } = require('./04-2-solution')

describe('04-2-solution', () => {
    describe('solution / answers', () => {
        it('should return 1924 for example input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/04-giant-squid/example.txt'), 1924)
        })
        it('should return 26878 for puzzle input', () => {
            assert.strictEqual(runCallbackAgainstFile(solution, '2021/04-giant-squid/input.txt'), 26878)
        })
    })
    describe('StopAfterWinningBoard -- a class representing a standard 5x5 bingo board', () => {
        it('takes in an array of 5x5 bingo data, does not care about whitespace or order', () => {
            assert.doesNotThrow(() => {
                new StopAfterWinningBoard([
                    '1 2        3 4 5',
                    '11 22 33 44   55',
                    '99 88 77   66 50',
                    '100    98 15 17 18',
                    '21 31 91 41 42   ',
                ])
            })
        })

        it('has a visual representation of the board', () => {
            const board = new StopAfterWinningBoard([
                '1 2        3 4 5',
                '11 22 33 44   55',
                '99 88 77   66 50',
                '100    98 15 17 18',
                '21 31 91 41 42   ',
            ])

            assert.deepStrictEqual(board.visual, [
                [1, 2, 3, 4, 5],
                [11, 22, 33, 44, 55],
                [99, 88, 77, 66, 50],
                [100, 98, 15, 17, 18],
                [21, 31, 91, 41, 42],
            ])
        })

        describe('.call()', () => {
            it('adds the called number to the tracking array -- if it was found on the board', () => {
                const board = new StopAfterWinningBoard([
                    '1 2        3 4 5',
                    '11 22 33 44   55',
                    '99 88 77   66 50',
                    '100    98 15 17 18',
                    '21 31 91 41 42   ',
                ])

                board.call(0) // not on board
                board.call(17)
                board.call(400) // not on board
                board.call(21)
                board.call(500) // not on board
                board.call(31)
                assert.deepStrictEqual(board.called, [17, 21, 31])
            })

            it('marks the spot on the visual board', () => {
                const board = new StopAfterWinningBoard([
                    ' 1  2  3  4  5',
                    ' 6  7  8  9 10',
                    '11 12 13 14 15',
                    '16 17 18 19 20',
                    '21 22 23 24 25',
                ])
                assert.deepStrictEqual(board.visual, [
                    [1, 2, 3, 4, 5],
                    [6, 7, 8, 9, 10],
                    [11, 12, 13, 14, 15],
                    [16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25],
                ])
                board.call(1)
                assert.deepStrictEqual(board.visual, [
                    ['X', 2, 3, 4, 5],
                    [6, 7, 8, 9, 10],
                    [11, 12, 13, 14, 15],
                    [16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25],
                ])
                board.call(6)
                assert.deepStrictEqual(board.visual, [
                    ['X', 2, 3, 4, 5],
                    ['X', 7, 8, 9, 10],
                    [11, 12, 13, 14, 15],
                    [16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25],
                ])
                board.call(13)
                assert.deepStrictEqual(board.visual, [
                    ['X', 2, 3, 4, 5],
                    ['X', 7, 8, 9, 10],
                    [11, 12, 'X', 14, 15],
                    [16, 17, 18, 19, 20],
                    [21, 22, 23, 24, 25],
                ])
            })
            it('updates column and row counts', () => {
                const board = new StopAfterWinningBoard([
                    ' 1  2  3  4  5',
                    ' 6  7  8  9 10',
                    '11 12 13 14 15',
                    '16 17 18 19 20',
                    '21 22 23 24 25',
                ])
                assert.deepStrictEqual(board.columns, [0, 0, 0, 0, 0])
                assert.deepStrictEqual(board.rows, [0, 0, 0, 0, 0])
                board.call(1)
                assert.deepStrictEqual(board.columns, [1, 0, 0, 0, 0])
                assert.deepStrictEqual(board.rows, [1, 0, 0, 0, 0])
                board.call(6)
                assert.deepStrictEqual(board.columns, [2, 0, 0, 0, 0])
                assert.deepStrictEqual(board.rows, [1, 1, 0, 0, 0])
                board.call(13)
                assert.deepStrictEqual(board.columns, [2, 0, 1, 0, 0])
                assert.deepStrictEqual(board.rows, [1, 1, 1, 0, 0])
            })
            it('throws excitedly on encountering a bingo', () => {
                // arrange winning board
                const board = new StopAfterWinningBoard([
                    ' 1  2  3  4  5',
                    ' 6  7  8  9 10',
                    '11 12 13 14 15',
                    '16 17 18 19 20',
                    '21 22 23 24 25',
                ])
                board.call(1)
                board.call(2)
                board.call(3)
                board.call(4)
                assert.throws(() => {
                    board.call(5)
                })
            })

            describe('after winning', () => {
                it("doesn't mark spots anymore", () => {
                    // arrange winning board
                    const board = new StopAfterWinningBoard([
                        ' 1  2  3  4  5',
                        ' 6  7  8  9 10',
                        '11 12 13 14 15',
                        '16 17 18 19 20',
                        '21 22 23 24 25',
                    ])
                    board.call(1)
                    board.call(2)
                    board.call(3)
                    board.call(4)
                    try {
                        board.call(5)
                    } catch {
                        // nothing needed here
                        // just handling the condition I created
                        // because I made it throw on win lol
                    }

                    // assert begin state
                    assert.deepStrictEqual(board.visual, [
                        ['X', 'X', 'X', 'X', 'X'],
                        [6, 7, 8, 9, 10],
                        [11, 12, 13, 14, 15],
                        [16, 17, 18, 19, 20],
                        [21, 22, 23, 24, 25],
                    ])

                    // actually test what it says on the tin
                    board.call(6)
                    board.call(7)
                    board.call(8)
                    assert.deepStrictEqual(board.visual, [
                        ['X', 'X', 'X', 'X', 'X'],
                        [6, 7, 8, 9, 10],
                        [11, 12, 13, 14, 15],
                        [16, 17, 18, 19, 20],
                        [21, 22, 23, 24, 25],
                    ])
                })
                it("doesn't update column and row counts anymore", () => {
                    // arrange winning board
                    const board = new StopAfterWinningBoard([
                        ' 1  2  3  4  5',
                        ' 6  7  8  9 10',
                        '11 12 13 14 15',
                        '16 17 18 19 20',
                        '21 22 23 24 25',
                    ])
                    board.call(1)
                    board.call(2)
                    board.call(3)
                    board.call(4)
                    try {
                        board.call(5)
                    } catch {
                        // nothing needed here
                        // just handling the condition I created
                        // because I made it throw on win lol
                    }

                    // assert begin state
                    assert.deepStrictEqual(board.columns, [1, 1, 1, 1, 1])
                    assert.deepStrictEqual(board.rows, [5, 0, 0, 0, 0])

                    // actually test what it says on the tin
                    board.call(6)
                    board.call(7)
                    board.call(8)
                    assert.deepStrictEqual(board.columns, [1, 1, 1, 1, 1])
                    assert.deepStrictEqual(board.rows, [5, 0, 0, 0, 0])
                })

                it("doesn't add numbers to the tracking array anymore", () => {
                    // arrange winning board
                    const board = new StopAfterWinningBoard([
                        ' 1  2  3  4  5',
                        ' 6  7  8  9 10',
                        '11 12 13 14 15',
                        '16 17 18 19 20',
                        '21 22 23 24 25',
                    ])
                    board.call(1)
                    board.call(2)
                    board.call(3)
                    board.call(4)
                    try {
                        board.call(5)
                    } catch {
                        // nothing needed here
                        // just handling the condition I created
                        // because I made it throw on win lol
                    }

                    // assert begin state
                    assert.deepStrictEqual(board.called, [1, 2, 3, 4, 5])

                    // actually test what it says on the tin
                    board.call(6)
                    board.call(7)
                    board.call(8)
                    assert.deepStrictEqual(board.called, [1, 2, 3, 4, 5])
                })
            })
        })

        describe('.score()', () => {
            it('sums the remaining unmarked numbers on the board & multiplies that by the given number', () => {
                const board = new StopAfterWinningBoard([
                    '1 1 1 1 1',
                    '1 1 1 1 1',
                    '1 1 1 1 1',
                    '1 1 1 1 1',
                    '1 1 1 1 1',
                ])
                const anotherStopAfterWinningBoard = new StopAfterWinningBoard([
                    '5 5 5 5 5',
                    '5 5 5 5 5',
                    '5 5 5 5 5',
                    '5 5 5 5 5',
                    '5 5 5 5 5',
                ])

                assert.strictEqual(board.score(1), 25)
                assert.strictEqual(board.score(2), 50)
                assert.strictEqual(board.score(10), 250)
                assert.strictEqual(anotherStopAfterWinningBoard.score(1), 125)
                assert.strictEqual(anotherStopAfterWinningBoard.score(5), 625)
            })
        })
    })
})
