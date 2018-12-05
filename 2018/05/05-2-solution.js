function findNextInstance(charArray, start, stop, reactant) {
    for (let i = start; i < stop; i++) {
        if (charArray[i].toLowerCase() == reactant) {
            return i;
        }
    }
    return -1;
}

function getReactantEffect(compoundString, reactant) {
    let compoundAsArray = compoundString.split('');

    let nextReactantPart = compoundAsArray.indexOf(reactant);
    while (nextReactantPart > -1) {
        compoundAsArray.splice(nextReactantPart, 1);
        nextReactantPart = compoundAsArray.indexOf(reactant);
    }

    reactant = reactant.toUpperCase();
    nextReactantPart = compoundAsArray.indexOf(reactant);
    while (nextReactantPart > -1) {
        compoundAsArray.splice(nextReactantPart, 1);
        nextReactantPart = compoundAsArray.indexOf(reactant);
    }

    return fullyReactRemainder(compoundAsArray).length;
}

function isReactive(a, b) {
    return a != b && a.toLowerCase() == b.toLowerCase();
}

function findNextCollision(charArray, start, stop) {
    for (let i = start; i < stop - 1; i++) {
        if (isReactive(charArray[i], charArray[i + 1])) {
            return i;
        }
    }
    return -1;
}

/**
 * 
 */
function fullyReactRemainder(compoundAsArray) {
    let start = 0;

    let defaultIncrement = 20;
    while (start < compoundAsArray.length) {
        let stop = Math.min(start + defaultIncrement, compoundAsArray.length);
        let collision = findNextCollision(compoundAsArray, start, stop);
        if (collision > -1) {
            compoundAsArray.splice(collision, 2);
            start = Math.max(0, collision - 1);
        } else {
            start = stop;
        }
    }
    return compoundAsArray;
}

/**
 * 
 */
function solution(compoundString) {
    if (Array.isArray(compoundString)) return solution(compoundString[0]);

    let reactants = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    let baseCompound = fullyReactRemainder(compoundString.split('')).join('');

    let min = baseCompound.length;
    reactants.forEach(reactant => {
        let reactantEffect = getReactantEffect(baseCompound, reactant);
        if (reactantEffect < min) {
            min = reactantEffect;
        }
    });
    return min;
}

module.exports = solution;