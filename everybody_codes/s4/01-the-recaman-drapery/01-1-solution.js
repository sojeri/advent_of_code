// https://everybody.codes/story/4/quests/1
const { complexSum } = require('../../../utils/js/sumArray')
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc s4 1 1')

function findLastPosition(sequence) {
    const moves = sequence.split(',')
    const visitedLocations = []
    const visited = { 0: true }
    let currentLocation = 0
    const canVisit = spot => {
        return spot > -1 && visited[spot] !== true
    }
    const visit = spot => {
        visited[spot] = true
        currentLocation = spot
        visitedLocations.push(spot)
    }
    moves.forEach((rawMove, moveIndex) => {
        const move = Number(rawMove)
        // only move backwards if it's a new location
        if (canVisit(currentLocation - move)) {
            visit(currentLocation - move)
        } else {
            visit(currentLocation + move)
        }
    })
    return currentLocation
}

function solution(sequences) {
    return complexSum(sequences, findLastPosition)
}

module.exports = {
    solution,
    findLastPosition,
}

/* PUZZLE TEXT


Part I
Story section
Preparations for the princess's wedding are in full swing, and the royal court has announced a competition for the most beautiful ballroom decorations. One of the challenges is to design the ornamental trimming for the grand curtains surrounding the dance floor.
You have heard that the princess is particularly fond of decorative patterns inspired by number sequences. Fortunately, your friend, Sir Recamán, has recently devised a fascinating sequence that produces remarkably elegant circular ornaments. Even better, the method for creating these intricate designs is surprisingly simple.
The design begins at point

 0 

on a number line and follows the given list of jump lengths in order. For each jump, first try to move backwards by its specified length. If the destination is positive and has not been visited before, the ornament continues from that point. Otherwise, move forwards by the same distance.
Each jump is represented by a semicircular arc connecting the previous point to the new one. The first arc is drawn below the number line, the next one above it, and the remaining arcs continue alternating between the two sides. Together, they gradually form an intricate decorative pattern.
The traditional Recamán sequence uses jump lengths of

 1, 2, 3, 4, ... 

, with every jump one unit longer than the previous one. The illustration below shows the ornament produced by its first 9 jumps:
02468101214161820

    We start at 0.
    Step 1: we try to move back by 1, but this would take us to -1, so we jump forwards to 1.
    Step 2: we try to move back from 1 by 2, but this would again go below zero, so we jump forwards to 3.
    Step 3: we try to move back from 3 by 3. This would take us to 0, but 0 has already been visited, so we jump forwards to 6.
    Step 4: we try to move back from 6 by 4. This lands us on 2, which has not been visited before, so we stay there.
    Step 5: we try to move back from 2 by 5, but this would go below zero, so we jump forwards to 7.
    Step 6: we try to move back from 7 by 6. This would take us to 1, but 1 has already been visited, so we jump forwards to 13.
    Step 7: we try to move back from 13 by 7. This would take us to 6, but 6 has already been visited, so we jump forwards to 20.
    Step 8: we try to move back from 20 by 8. This lands us on 12, which has not been visited before, so we stay there.
    Step 9: we try to move back from 12 by 9. This would take us to 3, but 3 has already been visited, so we jump to

     21 

    .

Even after only a few jumps, the ornament begins to reveal its distinctive shape. Below is the same construction after the first 30 jumps.
02468101214161820222426283032343638404244464850525456586062
Inspired by the results, you decide to experiment with the technique using your own lists of jump lengths ( your notes ). Draw each ornament according to the rules above and determine the point where it finishes. Your final answer should be the sum of the final points for all sequences.
Example based on the following notes:

1,2,3,4,5,6,7,8,9
1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30

The example consists of two sequences, illustrated above. The first finishes at

 21 

, while the second finishes at

 45 

. The final answer is therefore 21 + 45 =

 66 

.


1,1,1,1,1
5,1,2,3,4,5,1,2,3,4
2,1,1,2,1,1,2,1,1,2,1,1
5,1,2,1,2,7,1,2,1,2,7,1,2,1,2

The second example includes several different sequences.
The first sequence moves only forwards and finishes at the point

 5 

.
Sequence:

1,1,1,1,1



024


The second sequence is a little more interesting. It finishes at the point

 8 

.

5,1,2,3,4,5,1,2,3,4



024681012


The third sequence is somewhat artistic. It also finishes at the point

 8 

.

2,1,1,2,1,1,2,1,1,2,1,1



02468


The last sequence finishes at the point

 13 

.

5,1,2,1,2,7,1,2,1,2,7,1,2,1,2



02468101214


The final answer for the second example is therefore 5 + 8 + 8 + 13 =

 34 

.
What is the sum of the final points of all your sequences?

*/
