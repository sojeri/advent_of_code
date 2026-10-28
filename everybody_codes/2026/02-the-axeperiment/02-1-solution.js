// https://everybody.codes/event/2026/quests/2
const { getLogger } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc 2026 2 1 :: ')

/**
Part I

Story section

Once Quackshire had finally been secured, we wasted no time and set off for the Forge Mountain. Our next stop was the workshop of our old friend, the dwarven blacksmith Gimlock Ironstack.

Gimlock immediately asked where we were heading. I simply replied, "Nulldor." Then I pointed at the stone sticking out of Frodoff's backpack. He stared at it for a long moment, sighed deeply, and muttered, "Not this nonsense again." Without asking another question, he agreed to come.

There was just one small problem. Before leaving, Gimlock insisted on finishing his latest research into the hardness of several newly forged metal alloys. As the mountain's leading expert in the field, he explained that the procedure was extremely scientific: hit two axe blades together and see which one complains first. We offered to help him finish the analysis as quickly as possible.

Gimlock handed us his research notes ( your notes ). Each line described one group of alloys and contained the results of comparing every possible pair of blades forged from that group. For example,

 3>5 

meant that alloy

 3 

had proved harder than alloy

 5 

.
Using only these comparison results, we had to determine the order of the alloys in every group, from the hardest to the softest.

We then read the ordered identifiers as a single number for each group and added all of those numbers together to produce the checksum. Gimlock explained that the checksum would make the research much easier to verify if the original notes were ever misplaced and later reconstructed.

Example based on the following notes:

4<3 2<5 3>1 1>2 1<5 4<1 3>2 4<2 3>5 4<5
4>1 2>1 3>2 1<5 4>5 2<5 3>1 4>3 2<4 5<3
5>1 5>2 4>1 2<4 3>2 3<4 1>2 3>5 1<3 4>5

In the first group (the first line), the alloys could be arranged from the hardest to the softest as:

 3 5 1 2 4 

.
This gave us the number

 35124 

.
In the second group, the correct order was:

 4 3 5 2 1 

. This gave us the number

 43521 

.
In the third group, the correct order was:

 4 3 5 1 2 

. This gave us the number

 43512 

.
The final checksum was therefore: 35124 + 43521 + 43512 =

 122157 

What was the final checksum of the research notes?

Your notes for this part:

 */
function solution(research, getChecksumCb = getChecksum) {
    let sum = 0
    research.forEach(line => {
        sum += getChecksumCb(line)
    })
    return sum
}

/** calculates the checksum for a given line */
function getChecksum(line) {
    const observations = line.split(' ')
    const hardnessValues = {}
    const alloys = []
    const createOrUpdateNode = (val, score) => {
        if (hardnessValues[val] === undefined) {
            hardnessValues[val] = score
            alloys.push(val)
        } else {
            hardnessValues[val] += score
        }
    }

    // process gimlock's research
    observations.forEach(observation => {
        const [first, comparator, second] = observation
        if (comparator === '<') {
            createOrUpdateNode(first, -1)
            createOrUpdateNode(second, 1)
        } else {
            createOrUpdateNode(first, 1)
            createOrUpdateNode(second, -1)
        }
    })

    // sort by hardness and return checksum value
    const sorted = alloys.sort((a, b) => hardnessValues[b] - hardnessValues[a])
    logger.debug(hardnessValues)
    return Number(sorted.join(''))
}

module.exports = {
    solution,
    getChecksum,
}
