let { processChemicalReactions } = require('./05-1-solution')

/**
 * removes the troublesome reactant part from the compound and
 * finishes processing chemical reactions
 * @param {*} compoundString - the compound to process
 * @param {*} reactantPart - the element to remove before processing
 * @returns the remaining compound (@see processChemicalReactions)
 */
function removeTroublesomeElementAndFinishReacting(compoundString, reactantPart) {
    let compoundAsArray = compoundString.split('')

    let nextReactantPart = compoundAsArray.indexOf(reactantPart)
    while (nextReactantPart > -1) {
        compoundAsArray.splice(nextReactantPart, 1)
        nextReactantPart = compoundAsArray.indexOf(reactantPart)
    }

    reactantPart = reactantPart.toUpperCase()
    nextReactantPart = compoundAsArray.indexOf(reactantPart)
    while (nextReactantPart > -1) {
        compoundAsArray.splice(nextReactantPart, 1)
        nextReactantPart = compoundAsArray.indexOf(reactantPart)
    }

    return processChemicalReactions(compoundAsArray)
}

/**
 * some element is blocking the polymer from fully reacting. if we had solvent
 * that could remove both parts of the element, what's the best element to target?
 *
 * the official question spec:
 * - What is the length of the shortest polymer you can produce by removing all
 *   units of exactly one type and fully reacting the result?
 *
 * @param {*} compoundString - the compound to iterate over, probably in string form
 * @returns the size of the smallest possible compound
 */
function findSmallestCompound(compoundString) {
    // FIXME: this is a hacky solution to having first implemented this for a string input
    if (Array.isArray(compoundString)) return findSmallestCompound(compoundString[0])

    // TODO: investigate if this can be generated
    let reactantParts = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ]

    // why the string shenanigans here? strings are immutable in javascript. arrays,
    // on the other hand, get passed around as references. the base array would get
    // modified in the next few lines, and then we'd have to recalculate base for
    // every reactantPart we want to try removing. so it's converted back to string.
    let baseCompound = processChemicalReactions(compoundString.split('')).join('')

    let min = baseCompound.length
    reactantParts.forEach(rp => {
        min = Math.min(min, removeTroublesomeElementAndFinishReacting(baseCompound, rp).length)
    })
    return min
}

module.exports = findSmallestCompound
