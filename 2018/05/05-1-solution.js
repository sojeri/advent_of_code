/**
 * returns a flag indicating whether two elements react against each other
 * @param {*} a - the first element
 * @param {*} b - the second element
 */
function isReactive(a, b) {
    return a != b && a.toLowerCase() == b.toLowerCase();
}

/**
 * finds the next reaction -- basically a custom indexOf
 * @param {*} compoundArray - the compound to iterate over, already split into individual units
 * @param {*} start - the index to start searching from
 * @param {*} stop - the index to stop searching before
 * @returns -1 if there is no next reaction in range or the index of the first element in the reaction
 */
function findNextReaction(compoundArray, start, stop) {
    for (let i = start; i < stop - 1; i++) {
        if (isReactive(compoundArray[i], compoundArray[i + 1])) {
            return i;
        }
    }
    return -1;
}

/**
 * processes the given compound and removes any reactions as they occur
 * @param {*} compoundArray - the compound to iterate over, already split into individual units
 * @returns the compound array with all reactions excised
 */
function processChemicalReactions(compoundArray) {
    let start = 0;
    let defaultIncrement = 20;

    while (start < compoundArray.length) {
        let stop = Math.min(start + defaultIncrement, compoundArray.length);
        let reaction = findNextReaction(compoundArray, start, stop);
        if (reaction > -1) {
            compoundArray.splice(reaction, 2);
            start = Math.max(0, reaction - 1);
        } else {
            start = stop;
        }
    }

    return compoundArray;
}

/**
 * the question posed in spec:
 * - How many units remain after fully reacting the polymer you scanned?
 * @param {*} compoundString - the compound to iterate over, probably in string form
 * @returns the size of the compound of after processing chemical reactions
 */
function calculateCompoundSizeAfterReaction(compoundString) {
    // FIXME: this is a hacky solution to having first implemented this for a string input
    if (Array.isArray(compoundString)) return calculateCompoundSizeAfterReaction(compoundString[0]);
    
    let compoundArray = compoundString.split('');
    return processChemicalReactions(compoundArray).length;
}

module.exports = {
    calculateCompoundSizeAfterReaction,
    processChemicalReactions,
};