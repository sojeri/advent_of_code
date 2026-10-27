// https://everybody.codes/event/2026/quests/1

/**
Part III

Finally, we reached the outposts in the third defensive ring. Their formation looked much like the original filled square, but with exactly one empty cell in its centre.

This meant that only squares with an odd side length could be used. A square with an even side length had no single central cell, and the magic refused to accept an approximate centre.

The smallest valid formation was again 3 x 3 and required

 8 

pine cones. Larger formations followed the same rule:

3 x 3     5 x 5      7 x 7    ...

###       #####      #######
#.#       #####      #######
###       ##.##      #######
          #####      ###.###
          #####      #######
                     #######
                     #######

We noted how many enchanted pine cones remained at each outpost ( your notes ). As before, we had to collect exactly enough new ones for every outpost to build a valid formation using all of its pine cones.

Example based on the following notes:

3,11,12,16,24,25

    The first outpost had

     3 

    enchanted pine cones, so it had to collect

     5 

    more for a 3 x 3 formation.
    The second outpost had

     11 

    pine cones. The next valid formation was 5 x 5 and required 24 pine cones, so it had to collect

     13 

    more.
    The third outpost had

     12 

    pine cones and needed another

     12 

    to complete a 5 x 5 formation.
    The fourth outpost had

     16 

    pine cones and needed

     8 

    more for a 5 x 5 formation.
    The fifth outpost already had exactly

     24 

    pine cones, enough for a 5 x 5 formation.
    The final outpost had

     25 

    pine cones. The next valid formation was 7 x 7 and required 48 pine cones, so it had to collect

     23 

    more.

In total, the outposts had to collect 5 + 13 + 12 + 8 + 0 + 23 =

 61 

new pine cones.

How many new pine cones must be collected so that every outpost can build a complete square with exactly one empty cell in its centre, using all of its pine cones? 
 */
function solution(rawNumbers) {
    const getMissingAmount = n => {
        const root = Math.sqrt(n + 1)
        const rootFloor = Math.floor(root)

        // handling for minimum size of "3" (see above)
        if (rootFloor < 3) return 8 - n

        // 0 is now only true if the floor is also odd
        if (root === rootFloor && rootFloor % 2 === 1) return 0

        let nextFloorSize = rootFloor + 1
        if (nextFloorSize % 2 == 0) nextFloorSize++

        return nextFloorSize * nextFloorSize - n - 1
    }
    const strNumbers = rawNumbers.split(',')
    const numbers = strNumbers.map(str => Number(str))

    let sum = 0
    numbers.forEach(n => {
        const missingPineCones = getMissingAmount(n)
        sum += missingPineCones
    })

    return sum
}

module.exports = {
    solution,
}
