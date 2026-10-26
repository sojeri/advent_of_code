const DEFAULT_LIMIT = 2
const WORKERS = {} // dict of {jobs: jobId[], limit: #, id: ''}
const NULL_WORKER_ID = 'NULL_WORKER'
const VERBOSE = false
const LOOP_PROTECTION = false
const MAX_L00PS = 150

// #region helper methods

/**
 * helper method for accessing global worker state.
 * - returns a null worker to simplify comparison with invalid indices.
 */
function getWorker(id) {
    const worker = WORKERS[id]
    if (worker === undefined) {
        return {
            id: NULL_WORKER_ID,
            jobs: [],
            limit: 0,
            capacity: 0,
        }
    }
    return worker
}

/**
 * helper method to count remaining job capacity in global worker state.
 * - returns: remaining capacity count
 */
function getRemainingCapacity() {
    const workers = Object.keys(WORKERS)
    let capacity = 0
    // n access to count
    workers.forEach(workerId => {
        const worker = getWorker(workerId)
        capacity += worker.capacity
    })
    if (VERBOSE) console.log('capacity calculated:', capacity)
    return capacity
}

let l00ps = 0
/**
 * helper method
 * used to cancel bad loops after @see MAX_L00PS global cycles
 * - only relevant when @see LOOP_PROTECTION is true
 */
function shouldContinueLoop() {
    if (!LOOP_PROTECTION) return true

    l00ps++
    if (VERBOSE) console.log('loops ticking', l00ps)
    return l00ps < MAX_L00PS
}

/** helper method to make sorts more predictable. */
function getSortValue(workerId, useComplexScore = false) {
    const { jobs, limit } = getWorker(workerId)
    if (!useComplexScore) return jobs.length

    // score breakdown:
    // prioritize jobs collection size
    // subtract the limit to get higher limits predictably sorted in array
    // eg, [1, 2, 3, 4] limit 3 = 397
    // vs  [5, 6, 7, 8] limit 5 = 395
    return jobs.length * 100 - limit
}

// #endregion helper methods

/**
 * method from the orig interview reqs.
 * I think the original might have been just a list of worker ids.
 * if so, this global state constructor needs a bonus Array.isArray check on manyWorkerProps to support that.
 * as is, I wanted to support faster init for specific test cases without having to repeatedly call setLimit to adjust initial test state.
 */
function init(manyWorkerProps) {
    manyWorkerProps.forEach(singleWorkerProps => {
        const { id, limit: rawLimit, jobs } = singleWorkerProps
        const convos = jobs === undefined ? [] : jobs
        const limit = rawLimit === undefined ? DEFAULT_LIMIT : rawLimit
        WORKERS[id] = {
            // required prop -- just id, eg Alice Bob Charlie
            id,
            capacity: limit - convos,
            // optional props
            jobs: convos,
            limit: limit,
        }
    })
}

/**
 * method from the orig interview reqs.
 *
 * attempts to update the limit for a given worker id,
 * reassigning any state that no longer fits in the process.
 *
 * returns bool indicating whether the limit was applied.
 * - false if the limit was not able to be applied
 * - true if it was applied and any extra capacity successfully reassigned
 */
function setLimit(workerId, newLimit) {
    const worker = getWorker(workerId)
    if (worker.id === NULL_WORKER_ID) return false

    const isReassignmentNeeded = worker.jobs.length > newLimit
    if (!isReassignmentNeeded) {
        worker.limit = newLimit
        worker.capacity = newLimit - worker.jobs.length
        return true
    }
    // else, worker will be over new capacity, need to reassign jobs
    const limitDiff = worker.limit - newLimit
    const capacity = getRemainingCapacity() - limitDiff
    if (capacity <= 0) {
        // rip, can't reduce limit this far since convos can't be reassigned
        return false
    }

    const reassignCids = worker.jobs.splice(newLimit)
    worker.limit = newLimit
    worker.capacity = newLimit - worker.jobs.length
    assign(reassignCids, true)
    return true
}

/**
 * method from the orig interview reqs.
 *
 * attempts to assigning a list of jobIDs to available WORKERS.
 *
 * input: jobIds, eg [1, 2, 3, 4, 5, 6, 7]
 *
 * returns:
 * - null if all available workers lack sufficient capacity to intake the full list (req from interviewer)
 * - list of worker ids otherwise in order of assignment
 *   eg, `[a, b, a, b, a, b, c]`
 */
function assign(jobIds, useStrictSort = false) {
    if (VERBOSE) console.log('attempting to assign', jobIds)
    const capacity = getRemainingCapacity()
    if (capacity < jobIds.length) {
        if (VERBOSE) console.log('insufficient capacity')
        return null
    }
    const workers = Object.keys(WORKERS).sort((a, b) => {
        return getSortValue(a, useStrictSort) - getSortValue(b, useStrictSort)
    })

    let output = []
    let first = 0,
        second = 1
    let currSize = -1
    let currJobIdx = 0
    let jobId = jobIds[currJobIdx]
    let lastLoopSize = -1
    while (output.length < jobIds.length && shouldContinueLoop()) {
        if (second <= first) {
            second++
            continue
        }

        workerOne = getWorker(workers[first])
        workerTwo = getWorker(workers[second])
        if (currSize === -1) {
            currSize = lastLoopSize > -1 ? lastLoopSize + 1 : workerOne.jobs.length + 1
        }
        const currLimit = Math.min(currSize, workerOne.limit)
        if (workerOne.jobs.length < currLimit) {
            if (VERBOSE) console.log('saving jobId', jobId, 'to worker', workerOne.id)
            output.push(workerOne.id)
            workerOne.jobs.push(jobId)
            workerOne.capacity = workerOne.limit - workerOne.jobs.length
            currJobIdx++
            jobId = jobIds[currJobIdx]
            continue
        }

        first += 1
        if (first >= workers.length) {
            if (VERBOSE) console.log('reached end of list, looping back to beginning')
            lastLoopSize = currSize
            currSize = -1
            first = 0
            second = 1
            continue
        }
    }
    if (VERBOSE) console.log({ output })
    return output
}

function runTests() {
    const workers = [
        { id: 'aaa', limit: 3 },
        { id: 'bbb' }, // default 2
        { id: 'ccc', limit: 5 },
        { id: 'ddd', limit: 1 },
        { id: 'eee', limit: 4 },
        // total capacity should be 3 + 2 + 5 + 1 + 4 or 15
    ]
    init(workers)

    // this should fail, it's over total capacity
    const firstResult = assign([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    if (firstResult !== null) {
        throw new Error('16 CIDs should be over capacity')
    } else {
        console.log('test case 1 (assign over capacity behavior) passed')
    }

    // this should succeed, it's below total
    const result = assign([
        1,
        2,
        3,
        4,
        5, // it should give one to each worker a,b,c,d,e
        6,
        7,
        8, // then continue to give one more to a,b,c
        9, // however, d has capacity one, so this goes to e
        10, // should loop back to a
        11, // should skip b who is now also at cap, add to c
        12, // should skip d again, add to e
        13, // should loop back to a, skip, b, skip, c -- add
    ]) // total output should thus be: a,b,c,d,e,a,b,c,a,c,e,c
    const expectedResult = [
        // see logic above, spacing the same for ease of reference
        'aaa',
        'bbb',
        'ccc',
        'ddd',
        'eee',
        'aaa',
        'bbb',
        'ccc',
        'eee',
        'aaa',
        'ccc',
        'eee',
        'ccc',
    ]
    expectedResult.forEach((a, i) => {
        if (result[i] != a) {
            throw new Error(`assignment should have been a,b,c,d,e,a,b,c,e,a,c,e,c. mismatch detected at index ${i}`)
        }
    })
    console.log('test case 2 (assign within capacity behavior) passed')

    // capacity used: 13/15, remainder should be 2
    const capacity = getRemainingCapacity()
    if (capacity !== 2) {
        throw new Error(`capacity should be 2 (13/15 used), got ${capacity} instead`)
    } else {
        console.log('test case 3 (capacity after successful assign in test case 2) passed')
    }

    // capacity used: 13/15, dropping 4 -> 1 should fail
    const limitResult = setLimit('eee', 1)
    if (limitResult) {
        throw new Error('setLimit e:1 should have failed to reassign capacity')
    } else {
        console.log('test case 4 (setLimit beyond capacity behavior 1) passed')
    }

    // capacity used before: 13/15, dropping 3 -> 2 should succeed
    const secondLimitResult = setLimit('aaa', 2)
    if (!secondLimitResult) {
        throw new Error('setLimit a:2 should have successfully reassigned used capacity')
    } else {
        console.log('test case 5 (setLimit within capacity with reassign) passed')
    }

    // new capacity should be 13/14, 1 left
    const secondLimitCapacity = getRemainingCapacity()
    if (secondLimitCapacity !== 1) {
        throw new Error('remaining capacity after prev test case should be 1')
    } else {
        console.log('test case 5.5 (capacity after prev test case) passed')
    }

    // capacity used before: 13/14, bumping 2 -> 10 should succeed
    const thirdLimitResult = setLimit('aaa', 10)
    if (!thirdLimitResult) {
        throw new Error('setLimit a:10 should have successfully updated limit')
    } else {
        console.log('test case 6 (setLimit + within capacity without assign) passed')
    }

    // new capacity should be 13/22, 9 left
    const thirdLimitCapacity = getRemainingCapacity()
    if (thirdLimitCapacity !== 9) {
        throw new Error('remaining capacity after prev test case should be 9')
    } else {
        console.log('test case 6.5 (capacity after prev test case) passed')
    }

    // capacity used before: 13/22, dropping 10 -> 4 should succeed
    const fourthLimitResult = setLimit('aaa', 4)
    if (!fourthLimitResult) {
        throw new Error('setLimit a:4 should have successfully updated limit')
    } else {
        console.log('test case 7 (setLimit - within capacity without assign) passed')
    }

    // capacity used: 13/16, remainder should be 3
    const penultimateCapacity = getRemainingCapacity()
    if (penultimateCapacity !== 3) {
        throw new Error('capacity should be 3 (13/16 used)')
    } else {
        console.log('test case 8 (capacity after setLimit in test case 7) passed')
    }

    // capacity is now 13/16
    const lastAssignResult = assign([14, 15, 16])
    const expectedLastResult = ['aaa', 'aaa', 'ccc']
    expectedLastResult.forEach((a, i) => {
        if (lastAssignResult[i] != a) {
            throw new Error(`assignment should have been a,a,c. mismatch detected at index ${i}`)
        }
    })
    console.log('test case 9 (final assign set) passed')
}

runTests()

module.exports = {
    solution,
}
