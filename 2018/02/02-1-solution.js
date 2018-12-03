function reduce(stringId) {
    let letters = {};
    for (let i = 0; i < stringId.length; i++) {
        let char = stringId[i];
        letters[char] = !letters[char] ? 1 : letters[char] + 1;
    }

    let result = { two: false, three: false }
    Object.keys(letters).forEach(l => {
        if (letters[l] == 2) {
            result.two = true;
        } else if (letters[l] == 3) {
            result.three = true;
        }
    });

    return result;
}

function generateChecksum(arrayOfBoxIds) {
    let twos = 0;
    let threes = 0;
    arrayOfBoxIds.forEach(boxId => {
        let reduced = reduce(boxId);
        if (reduced.two) {
            twos++;
        }

        if (reduced.three) {
            threes++;
        }
    });
    return twos * threes;
}

module.exports = {
    reduceBoxId: reduce,
    generateChecksum: generateChecksum
}
