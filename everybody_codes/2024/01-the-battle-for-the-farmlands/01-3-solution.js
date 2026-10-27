// https://everybody.codes/event/2024/quests/1

/** gets potion score for single creature */
function getScore(creature) {
    switch (creature) {
        case 'B':
            return 1
        case 'C':
            return 3
        case 'D':
            return 5
        default:
            return 0
    }
}

/**
 * xxx -- empty, no extra score
 * xBx -- one creature alone, no extra score
 * xCC -- two creatures together, so extra 1 score apiece or 2 total
 * AAA -- three creatures, so extra 2 score apiece or 6 total
 */
function getScoreModifier(one, two, three) {
    let count = 0
    if (one == 'x') count++
    if (two == 'x') count++
    if (three == 'x') count++

    if (count >= 2) return 0
    if (count == 1) return 2
    return 6
}

/**
 *  The final round is here, and, as expected, it is the most challenging of all! Although no new enemies have appeared, they have grown wiser and realized their strength in numbers.
 * In this ultimate challenge, you will not just face pairs, but also groups of three! For these tough battles, you will need 2 extra potions per creature compared to fighting them one-on-one.
 * Example based on the following notes:
 *
 * xBxAAABCDxCC
 *
 * Once the battles are split into their respective groups, they will unfold as follows:
 *
 * xBx AAA BCD xCC
 *
 * In total, you must order: 1 + 6 + 15 + 8 = 30 potions.
 *
 * What is the exact number of potions you need to order for the final round?
 */
function solution(creatureArmy) {
    let potionsNeeded = 0
    for (let i = 0; i < creatureArmy.length; i += 3) {
        const left = creatureArmy[i]
        const middle = creatureArmy[i + 1]
        const right = creatureArmy[i + 2]
        const scoreModifier = getScoreModifier(left, middle, right)
        const score = getScore(left) + getScore(middle) + getScore(right) + scoreModifier
        potionsNeeded += score
    }
    return potionsNeeded
}

module.exports = {
    solution,
}
