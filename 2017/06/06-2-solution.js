function getNewMax(array) {
    let max = array[0];
    let maxIndex = 0;
    array.forEach((val, i) => {
        if (val > max) { max = val; maxIndex = i; }
    });
    return maxIndex;
}

/**
 * counts how many redistrubition cycles are required before the debugger
 * sees a configuration that is a repeat.
 * per spec defined in https://adventofcode.com/2017/day/6
 * @param {*} banks 
 */
function countRedistributionCycles(banks) {
    // sanitize input
    banks = banks.split('	').map(str => Number(str));

    let shouldRunAnotherCycle = true;
    let foundFirstRepeat = false;
    let seenConfigurations = {};
    let count = 0;

    while (shouldRunAnotherCycle) {
        count++;
        let maxIndex = getNewMax(banks);
        let valueToRedistribute = banks[maxIndex];
        banks[maxIndex] = 0;

        let n = maxIndex;
        while (valueToRedistribute > 0) {
            n++;
            let i = n % banks.length;

            // carry val
            banks[i]++;
            valueToRedistribute--;
        }

        let currentConfiguration = banks.join();
        if (!seenConfigurations[currentConfiguration]) {
            seenConfigurations[currentConfiguration] = 1;
        } else if (!foundFirstRepeat) {
            seenConfigurations[currentConfiguration]++;
            foundFirstRepeat = true;
            count = 0;
        } else {
            seenConfigurations[currentConfiguration]++;
            if (seenConfigurations[currentConfiguration] == 3) {
                shouldRunAnotherCycle = false;
            }
        }
    }

    return count;
}

module.exports = countRedistributionCycles;