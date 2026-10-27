// https://everybody.codes/event/2026/quests/1

/**

Part II

Once the first defensive ring had been secured, we continued to inspect the second one. Each outpost in this ring had to build a square frame instead of a filled square.

As a result, each formation required fewer enchanted pine cones. The frame also had to surround at least one empty cell; otherwise, the magic would not work. The smallest possible formation was therefore a 3 x 3 frame, requiring

 8 

pine cones. Larger square frames worked in the same way:

3 x 3     4 x 4      5 x 5  ...

###       ####       #####
#.#       #..#       #...#
###       #..#       #...#
          ####       #...#
                     #####

Once again, we noted how many enchanted pine cones each outpost still had ( your notes ). We then calculated how many additional pine cones had to be collected for every outpost to build a valid square frame using all of its pine cones.
Example based on the following notes:

3,11,12,16,24,25

    The first outpost had

     3 

    enchanted pine cones, so it had to collect

     5 

    more to build a 3 x 3 frame.
    The second outpost had

     11 

    pine cones and needed

     1 

    more to complete a 4 x 4 frame.
    The next three outposts already had exactly

     12 

    pine cones for a 4 x 4 frame,

     16 

    for a 5 x 5 frame, and

     24 

    for a 7 x 7 frame, so they did not need to collect any more.
    The final outpost had

     25 

    pine cones. The next valid formation was an 8 x 8 frame requiring 28 pine cones, so it had to collect

     3 

    more.

In total, the outposts had to collect 5 + 1 + 0 + 0 + 0 + 3 =

 9 

new pine cones.

How many new pine cones must be collected so that every outpost can build a valid square frame using all of its pine cones? 

*/
function solution(rawNumbers) {
    // ohhhh actually this is a pattern size - 1 * 4
    // const knownSizes = { 3: 8, 4: 12, 5: 16, 6: 20, 7: 24 };
    const getMissingAmount = n => {
        const roughSize = n / 4
        let sizeFloor = Math.floor(roughSize)

        // handling for minimum size of "3" (see above)
        if (sizeFloor <= 1) return 8 - n

        // handling for any other size
        if (sizeFloor === roughSize) return 0
        return 4 - (n % 4)
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
