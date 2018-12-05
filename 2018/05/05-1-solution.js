/**
 * 
 * @param {*} a a single character 
 * @param {*} b a possibly different single character
 */
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
function solution(compoundString) {
    if (Array.isArray(compoundString)) return solution(compoundString[0]);
    
    let compoundAsArray = compoundString.split('');
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
    return compoundAsArray.length;
}

module.exports = solution;