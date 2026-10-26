const SPACE = ' '

/**
 * converts a raw bag type string into a more helpful shape
 * eg, { count: 5, type: 'faded blue' }
 * @param {*} type eg '5 faded blue bags', 'muted yellow bags', '1 bright white bag'
 */
function parseType(type) {
    type = type.split(SPACE)
    const count = type.length === 4 ? Number(type.shift()) : 1

    type.pop() // strip bag / bags from name
    type = type.join(SPACE)

    return { count, type }
}

/**
 * parses a raw line of rule text and returns the data in a more useful shape
 * eg
 * {
 *  outer: { type: 'muted yellow' },
 *  inner: [
 *    { count: 2, type: 'shiny gold' },
 *    { count: 9, type: 'faded blue' }]
 * }
 * @param {*} line a raw line of rule text, eg 'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags'
 */
function parseLine(line) {
    let [outer, inner] = line.split(' contain ')
    outer = parseType(outer)
    inner = inner.split(', ').map(parseType)

    return { outer, inner }
}

/**
 * reverses the rules set to have inner point to what it can be
 * contained by. returns a collection of keys like `bagType:
 * [couldBeInThisType, couldBeInAnotherType]`, eg `'bright white':
 * ['light red', 'dark orange']`
 * @param {*} parsedRules a collection of keys like what (@see parseLine) returns
 */
function reverseRules(parsedRules) {
    const rules = {}

    parsedRules.forEach(rule => {
        const { outer, inner } = rule
        const outerType = outer.type

        inner.forEach(i => {
            const innerType = i.type
            if (!rules[innerType]) {
                rules[innerType] = []
            }
            if (rules[innerType].indexOf(outerType) === -1) {
                rules[innerType].push(outerType)
            }
        })
    })

    return rules
}

/**
 * implements https://adventofcode.com/2020/day/7
 * @param {*} input the puzzle input
 * @param {*} want the bag type to solve for
 */
function solution(input, want = 'shiny gold') {
    let parsedRules = input.map(parseLine)
    parsedRules = reverseRules(parsedRules)

    let couldContain = {}

    /**
     * recursively crawls the parsedRules until it has finished
     * calculating the types of bags that could contain a given bag
     * @param {*} type the type of bag which could be contained
     */
    function recursiveCrawl(type) {
        if (type === 'no other') {
            return
        }
        if (type !== want) {
            couldContain[type] = true
        }
        if (parsedRules[type]) {
            parsedRules[type].forEach(recursiveCrawl)
        }
    }

    recursiveCrawl(want)
    return Object.keys(couldContain).length
}

module.exports = {
    parseLine,
    parseType,
    solution,
}
