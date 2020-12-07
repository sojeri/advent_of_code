let { parseLine } = require('./07-1-solution')

/**
 * converts the passed in rules from an array of blobs to a more useful `{ <outer>: <inner> }` form. also creates the key set for ease of looping.
 * @param {*} rulesArray the array of `{ outer: {}, inner: {} }` blobs
 */
function finishParsingRules(rulesArray) {
    const rulesObject = {}
    rulesArray.forEach(rule => {
        const outerType = rule.outer.type
        if (rulesObject[outerType]) {
            rulesObject[outerType].push(...rule.inner)
        } else {
            rulesObject[outerType] = rule.inner
        }
    })

    return rulesObject
}

/**
 * implements https://adventofcode.com/2020/day/7#part2
 * @param {*} input the puzzle input
 * @param {*} want the bag type to solve for
 */
function solution(input, want = 'shiny gold') {
    const parsedRules = input.map(parseLine)
    const ruleSet = finishParsingRules(parsedRules)

    function recursiveCrawl(type, howMany) {
        if (ruleSet[type][0].type === 'no other') {
            return howMany
        }

        if (ruleSet[type]) {
            let howManyMore = 0

            ruleSet[type].forEach(inner => {
                howManyMore += recursiveCrawl(inner.type, howMany * (inner.count || 1))
            })

            return howMany + howManyMore
        }

        return howMany
    }

    return recursiveCrawl(want, 1) - 1 // don't count outer bag
}

module.exports = solution
