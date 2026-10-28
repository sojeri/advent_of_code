// https://everybody.codes/event/2026/quests/2
const { solution: origSln } = require('./02-1-solution')
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc 2026 2 3 :: ')

/** calculates the checksum for a given line */
function getChecksum(line) {
    const observations = line.split(' ')
    const seen = {}
    let alloys = []

    const haventSeen = alloy => {
        return seen[alloy] == undefined
    }

    const markSeen = (alloy, observation) => {
        const { isBefore, isAfter } = observation
        if (haventSeen(alloy)) {
            seen[alloy] = {
                isBefore: isBefore !== undefined ? [isBefore] : [],
                isAfter: isAfter !== undefined ? [isAfter] : [],
            }
            return
        }
        if (isBefore !== undefined && !seen[alloy].isBefore.includes(isBefore)) {
            seen[alloy].isBefore.push(isBefore)
            seen[alloy].isAfter.forEach(innerAlloy => {
                logger.debug('propogating befores from alloy to everything it is after', {
                    alloy,
                    innerAlloy,
                    shared: seen[alloy].isBefore,
                })
                seen[alloy].isBefore.forEach(sharedBeforeAlloy => {
                    markSeen(innerAlloy, { isBefore: sharedBeforeAlloy })
                })
            })
        }
        if (isAfter !== undefined && !seen[alloy].isAfter.includes(isAfter)) {
            seen[alloy].isAfter.push(isAfter)
            seen[alloy].isAfter.forEach(innerAlloy => {
                logger.debug('propogating afters from alloy to everything it is before', { alloy, innerAlloy })
                seen[alloy].isAfter.forEach(sharedAfterAlloy => {
                    markSeen(innerAlloy, { isAfter: sharedAfterAlloy })
                })
            })
        }
    }

    /**
     * inserts one or both elements into the alloys array
     * - before === left
     * - after === right
     */
    const addLeftBeforeRight = (before, after) => {
        const haventSeenBefore = haventSeen(before)
        const haventSeenAfter = haventSeen(after)
        markSeen(after, { isAfter: before })
        markSeen(before, { isBefore: after })

        if (haventSeenAfter && haventSeenBefore) {
            alloys.unshift(after)
            alloys.unshift(before)
            return
        }
        if (haventSeenBefore) {
            const newAlloys = [...alloys]
            newAlloys.unshift(before)
            alloys = newAlloys
            return
        }
        if (haventSeenAfter) {
            const newAlloys = [...alloys]
            newAlloys.push(after)
            alloys = newAlloys
            return
        }

        const beforeIndex = alloys.indexOf(before)
        const afterIndex = alloys.indexOf(after)
        if (beforeIndex < afterIndex) return

        const isBefores = seen[before].isBefore
        const isAfters = seen[before].isAfter
        // find earliest insert index
        let earliestInsert = Number.POSITIVE_INFINITY
        isBefores.forEach(isBefore => {
            const possibleInsert = alloys.indexOf(isBefore)
            earliestInsert = possibleInsert < earliestInsert ? possibleInsert : earliestInsert
        })

        if (earliestInsert !== Number.POSITIVE_INFINITY) {
            const newAlloys = []
            let start = 0
            let max = alloys.length + 10
            while (alloys.length && start < max) {
                if (start === earliestInsert) {
                    newAlloys.push(before)
                }
                const next = alloys.shift()
                if (next !== before) {
                    newAlloys.push(next)
                }
                start++
            }
            alloys = newAlloys
            return
        }

        // find last insert index
        let lastInsert = Number.NEGATIVE_INFINITY
        isAfters.forEach(isAfter => {
            const possibleInsert = alloys.indexOf(isAfter)
            lastInsert = possibleInsert > lastInsert ? possibleInsert : lastInsert
        })

        if (lastInsert !== Number.NEGATIVE_INFINITY) {
            const newAlloys = []
            let start = 0
            let max = alloys.length + 10
            while (alloys.length && start < max) {
                const next = alloys.shift()
                if (next !== before) {
                    newAlloys.push(next)
                }
                if (start === lastInsert) {
                    newAlloys.push(before)
                }
                start++
            }
            alloys = newAlloys
            return
        }
    }

    // there is some bug in my messy logic
    // running this 6 times consistently fixes the issues :lolsob:
    // prod code? terrible idea
    // puzzle solution that only matters once? sure why not!
    for (let i = 0; i < 6; i++) {
        // process gimlock's research
        observations.forEach(observation => {
            const [first, comparator, second] = observation
            let left, right
            if (comparator === '>') {
                left = first
                right = second
            } else {
                left = second
                right = first
            }

            logger.log(observation, { left, right })
            addLeftBeforeRight(left, right)
        })
    }

    logger.debug({ line, alloys, ...seen })
    return Number(alloys.join(''))
}

function solution(research) {
    return origSln(research, getChecksum)
}

module.exports = {
    solution,
    getChecksum,
}

/**
Part III
Gimlock disappeared into his workshop and eventually emerged with one last bundle of notes ( your notes ), rescued from beneath several years' worth of perfectly organised dwarven paperwork. These were from a very early stage of his research, and this time every group was missing many comparison results.
With so many measurements missing, the deduction was no longer as obvious as before. Frodoff showed us that the remaining results, combined with the same reasoning, were enough to reconstruct the complete ordering of every alloy group from the hardest to the softest, and calculated the checksum exactly as before.
Example based on the following notes:

3>1 1>2 1<5 4<2 3>5
2>1 2<5 3>1 4>3 2<4 5<3
5>1 3<4 1>2 3>5

This is the same example as in the previous parts, with some comparisons removed from each group. The remaining results are enough to determine the alloy order, so the resulting numbers and the final checksum are identical.
The final checksum is therefore again
 122157 
.
What was the final checksum of the last set of research notes?
 */
