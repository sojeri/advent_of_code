// https://everybody.codes/event/2024/quests/1

/** gets potion score for single creature */
function getScore(creature) {
    switch (creature) {
        case 'A':
            return 1
        case 'B':
            return 2
        case 'C':
            return 4
        case 'D':
            return 6
        case 'x':
            return -1
        default:
            return 0
    }
}

/**
 * Round two begins! A new area awaits, bringing with it a new list of foes, and a familiar but formidable opponent:
 *
 * - Diabolical Dragonfly (D): A fast and tricky enemy, hard to hit. This creature requires 5 potions to defeat it.
 *
 * This time, however, the battles become more challenging. According to the kingdom's spies, the enemies sometimes join forces in pairs, making them tougher to defeat.
 * When two monsters pair up, you will need one more potion per creature than in a one-on-one fight.
 * Your list remains a single line of creatures, but now you must interpret it in pairs. The x symbol shows an empty spot where no monster appears, so for these pairs your calculations should follow the same rules as for individual battles.
 *
 * Example based on the following notes:
 *
 * AxBCDDCAxD
 *
 * After splitting into pairs, the battle sequence looks like this:
 *
 * Ax BC DD CA xD
 *
 * - The Ax pair requires no potions because a single Ancient Ant remains weak as before.
 * - The BC pair requires 6 potions which is 2 for the Badass Beetle and 4 for the Creepy Cockroach because they are attacking together.
 * - The DD pair requires 12 potions which is 6 per Diabolical Dragonfly instead of the usual 5 since they are attacking together.
 * - The CA pair requires 5 potions which is 4 for the Creepy Cockroach and 1 for the Ancient Ant.
 * - The xD pair requires 5 potions because no additional potion is needed for a single Diabolical Dragonfly.
 *
 * In total, you must order: 0 + 6 + 12 + 5 + 5 = 28 potions.
 *
 * What is the exact number of potions you need to order for round two?
 */
function solution(creatureArmy) {
    let potionsNeeded = 0
    for (let i = 0; i < creatureArmy.length; i += 2) {
        const left = getScore(creatureArmy[i])
        const right = getScore(creatureArmy[i + 1])
        const score = left + right
        if (score > 0) potionsNeeded += score
    }
    return potionsNeeded
}

module.exports = {
    solution,
}
