// https://everybody.codes/story/4/quests/1
const { complexSum } = require('../../../utils/js/sumArray')
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc s4 1 2')

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
        let move = Number(rawMove)
        if (canVisit(currentLocation - move)) {
            visit(currentLocation - move)
            return
        }

        // if move forward isn't possible, increment the rawMove until it is
        while (!canVisit(currentLocation + move)) {
            move++
        }
        visit(currentLocation + move)
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

/*
Part II
The ornaments are starting to look quite impressive, but there is one small flaw. Sometimes the path lands on a point that has already been used before, making parts of the design overlap and become harder to appreciate. Rather than changing the jump lengths, you decide to refine the construction rules instead.
The additional rule is simple: whenever a forward jump would land on a previously visited point, increase the destination by one until you reach the first unvisited point. Backward jumps still follow exactly the same rules as before. Draw each ornament of your new list ( your notes ) using this updated method and determine its final point as before.
Example based on the following notes:

1,1,1,1,1
5,1,2,3,4,5,1,2,3,4
2,1,1,2,1,1,2,1,1,2,1,1
5,1,2,1,2,7,1,2,1,2,7,1,2,1,2

To understand the changes better, let us look again at the second, larger example from the previous part.
The first sequence still moves only forwards and finishes at the point

 5 

.

1,1,1,1,1



024


The second sequence now finishes at the point

 13 

. Note that point

 5 

is no longer visited twice. After the jumps

 5,1,2 

, the next forward landing point would be 5, but point 5 had already been visited. Therefore, the landing point is increased to the next unvisited point, 6.

5,1,2,3,4,5,1,2,3,4



02468101214


The third sequence also changes, but it is still quite artistic. It finishes at the point

 12 

.

2,1,1,2,1,1,2,1,1,2,1,1



024681012


The final sequence is not affected by the changes and still finishes at the point

 13 

.

5,1,2,1,2,7,1,2,1,2,7,1,2,1,2



02468101214


The final answer is therefore 5 + 13 + 12 + 13 =

 43 

.
What is the sum of the final points of all your sequences?
*/
