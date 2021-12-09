const assert = require('assert')
let { ascendingSort, descendingSort } = require('../js/sorts')

describe('ascendingSort', () => {
    it('sorts numeric data as expected', () => {
        const mockUnsorted = [3, 100, 24, -30, 5, 1.341]
        const result = [...mockUnsorted].sort(ascendingSort)
        assert.deepEqual(result, [-30, 1.341, 3, 5, 24, 100])
    })
})

describe('descendingSort', () => {
    it('sorts numeric data as expected', () => {
        const mockUnsorted = [3, 100, 24, -30, 5, 1.341]
        const result = [...mockUnsorted].sort(descendingSort)
        assert.deepEqual(result, [100, 24, 5, 3, 1.341, -30])
    })
})
