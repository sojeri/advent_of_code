let { parseLine } = require('./07-1-solution')

/**
 * converts the passed in rules from an array of blobs to a
 * more useful `{ <outer>: <inner> }` form.
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
 */
function solution(input) {
    const parsedRules = input.map(parseLine)
    const ruleSet = finishParsingRules(parsedRules)

    /**
     * recursively crawls the ruleSet until it has finished
     * calculating the number of bags within a bag
     * @param {*} type the type of bag being calculated
     * @param {*} howMany how many of that bag are desired
     */
    function recursiveCrawl(type, howMany) {
        if (ruleSet[type][0].type === 'no other') {
            return howMany
        }

        let howManyMore = 0

        // this could break on bad input data,
        // but the puzzle set & examples are clean :)
        ruleSet[type].forEach(inner => {
            howManyMore += recursiveCrawl(inner.type, howMany * inner.count)
        })

        return howMany + howManyMore
    }

    return recursiveCrawl('shiny gold', 1) - 1 // don't count outer bag
}

module.exports = solution
