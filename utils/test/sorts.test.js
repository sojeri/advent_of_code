const assert = require('assert')
const { ascendingSort, descendingSort, ascendingFieldSort, descendingFieldSort } = require('../js/sorts')

describe('sort utils', () => {
    describe('ascendingSort', () => {
        it('sorts numeric data as expected', () => {
            const mockUnsorted = [3, 100, 24, -30, 5, 1.341]
            const result = [...mockUnsorted].sort(ascendingSort)
            assert.deepEqual(result, [-30, 1.341, 3, 5, 24, 100])
        })
        it('sorts string data per duck typing enforced by the - operand', () => {
            const mockUnsortedNumbers = ['3', '100', '24', '-30', '5', '1.341', '10', '1', '2', '11']
            const numberResult = [...mockUnsortedNumbers].sort(ascendingSort)
            assert.deepEqual(numberResult, ['-30', '1', '1.341', '2', '3', '5', '10', '11', '24', '100'])

            // these all return zero when duck typing runs Number(val), so they stay in the same place
            const mockUnsortedWords = ['abc', 'def', 'ABC', 'DEF', 'song', 'bicycle', 'Circus', 'alphabet']
            const unsortedLettersResult = [...mockUnsortedWords].sort(ascendingSort)
            assert.deepEqual(unsortedLettersResult, [
                'abc',
                'def',
                'ABC',
                'DEF',
                'song',
                'bicycle',
                'Circus',
                'alphabet',
            ])
        })
    })

    describe('descendingSort', () => {
        it('sorts numeric data as expected', () => {
            const mockUnsorted = [3, 100, 24, -30, 5, 1.341]
            const result = [...mockUnsorted].sort(descendingSort)
            assert.deepEqual(result, [100, 24, 5, 3, 1.341, -30])
        })
        it('sorts string data per duck typing enforced by the - operand', () => {
            const mockUnsortedNumbers = ['3', '100', '24', '-30', '5', '1.341', '10', '1', '2', '11']
            const numberResult = [...mockUnsortedNumbers].sort(descendingSort)
            assert.deepEqual(numberResult, ['100', '24', '11', '10', '5', '3', '2', '1.341', '1', '-30'])

            // these all return zero when duck typing runs Number(val), so they stay in the same place
            const mockUnsortedWords = ['abc', 'def', 'ABC', 'DEF', 'song', 'bicycle', 'Circus', 'alphabet']
            const unsortedLettersResult = [...mockUnsortedWords].sort(descendingSort)
            assert.deepEqual(unsortedLettersResult, [
                'abc',
                'def',
                'ABC',
                'DEF',
                'song',
                'bicycle',
                'Circus',
                'alphabet',
            ])
        })
    })

    describe('ascendingFieldSort', () => {
        it('sorts data by an arbitrary / given field name', () => {
            const unsortedObjects = [
                { arbitraryField: 75, id: 1 },
                { arbitraryField: 40, id: 2 },
                { arbitraryField: 100, id: 3 },
                { arbitraryField: 6, id: 4 },
            ]
            const sortedByField = unsortedObjects.sort((a, b) => ascendingFieldSort(a, b, 'arbitraryField'))
            assert.deepEqual(sortedByField, [
                { arbitraryField: 6, id: 4 },
                { arbitraryField: 40, id: 2 },
                { arbitraryField: 75, id: 1 },
                { arbitraryField: 100, id: 3 },
            ])
        })

        describe('has no handling for inputs that do not contain the field name', () => {
            it('will throw on encountering inputs without field access', () => {
                assert.throws(() => {
                    // this will throw because null is not a JS Object
                    // they are primitives which do not allow field access like JS Objects
                    ascendingFieldSort(null, null, 'arbitraryField')
                })
                assert.throws(() => {
                    // same as null
                    ascendingFieldSort(undefined, undefined, 'arbitraryField')
                })
            })
            it('will not sort inputs which do not have field', () => {
                const unsortedObjects = [
                    { arbitraryField: 75, id: 1 },
                    { arbitraryField: 40, id: 2 },
                    { arbitraryField: 100, id: 3 },
                    { arbitraryField: 6, id: 4 },
                ]
                const sortedByField = unsortedObjects.sort((a, b) => ascendingFieldSort(a, b, 'someOtherField'))

                // data remains unsorted because they all return undefined during the sort
                assert.deepEqual(sortedByField, [
                    { arbitraryField: 75, id: 1 },
                    { arbitraryField: 40, id: 2 },
                    { arbitraryField: 100, id: 3 },
                    { arbitraryField: 6, id: 4 },
                ])
            })
            it('will not sort inputs with non-numeric fields -- per duck typing', () => {
                const unsortedObjects = [
                    { arbitraryField: 'a', id: 1 },
                    { arbitraryField: 'c', id: 2 },
                    { arbitraryField: 'z', id: 3 },
                    { arbitraryField: 'm', id: 4 },
                ]
                const sortedByField = unsortedObjects.sort((a, b) => ascendingFieldSort(a, b, 'someOtherField'))

                // data remains unsorted because they all return 0 during the sort
                assert.deepEqual(sortedByField, [
                    { arbitraryField: 'a', id: 1 },
                    { arbitraryField: 'c', id: 2 },
                    { arbitraryField: 'z', id: 3 },
                    { arbitraryField: 'm', id: 4 },
                ])
            })
        })
    })

    describe('descendingFieldSort', () => {
        it('sorts data by an arbitrary / given field name', () => {
            const unsortedObjects = [
                { arbitraryField: 75, id: 1 },
                { arbitraryField: 40, id: 2 },
                { arbitraryField: 100, id: 3 },
                { arbitraryField: 6, id: 4 },
            ]
            const sortedByField = unsortedObjects.sort((a, b) => descendingFieldSort(a, b, 'arbitraryField'))
            assert.deepEqual(sortedByField, [
                { arbitraryField: 100, id: 3 },
                { arbitraryField: 75, id: 1 },
                { arbitraryField: 40, id: 2 },
                { arbitraryField: 6, id: 4 },
            ])
        })

        describe('has no handling for inputs that do not contain the field name', () => {
            it('will throw on encountering inputs without field access', () => {
                assert.throws(() => {
                    // this will throw because null is not a JS Object
                    // they are primitives which do not allow field access like JS Objects
                    descendingFieldSort(null, null, 'arbitraryField')
                })
                assert.throws(() => {
                    // same as null
                    descendingFieldSort(undefined, undefined, 'arbitraryField')
                })
            })
            it('will not sort inputs which do not have field', () => {
                const unsortedObjects = [
                    { arbitraryField: 75, id: 1 },
                    { arbitraryField: 40, id: 2 },
                    { arbitraryField: 100, id: 3 },
                    { arbitraryField: 6, id: 4 },
                ]
                const sortedByField = unsortedObjects.sort((a, b) => descendingFieldSort(a, b, 'someOtherField'))

                // data remains unsorted because they all return undefined during the sort
                assert.deepEqual(sortedByField, [
                    { arbitraryField: 75, id: 1 },
                    { arbitraryField: 40, id: 2 },
                    { arbitraryField: 100, id: 3 },
                    { arbitraryField: 6, id: 4 },
                ])
            })
            it('will not sort inputs with non-numeric fields -- per duck typing', () => {
                const unsortedObjects = [
                    { arbitraryField: 'a', id: 1 },
                    { arbitraryField: 'c', id: 2 },
                    { arbitraryField: 'z', id: 3 },
                    { arbitraryField: 'm', id: 4 },
                ]
                const sortedByField = unsortedObjects.sort((a, b) => descendingFieldSort(a, b, 'someOtherField'))

                // data remains unsorted because they all return 0 during the sort
                assert.deepEqual(sortedByField, [
                    { arbitraryField: 'a', id: 1 },
                    { arbitraryField: 'c', id: 2 },
                    { arbitraryField: 'z', id: 3 },
                    { arbitraryField: 'm', id: 4 },
                ])
            })
        })
    })
})
