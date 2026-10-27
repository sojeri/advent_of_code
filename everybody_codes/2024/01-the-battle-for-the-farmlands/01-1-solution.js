// https://everybody.codes/event/2024/quests/1

/**
 * The green farmlands of Algorithmia are in constant danger from creatures hiding in the dark. It would be wise to include some fun in the mission, so the first challenge of the tournament is protecting the important crops from destruction.
 *
 * Each brave knight is given a specific piece of land to protect, but the job isn't just about fighting magical creatures. The battle requires using healing potions, which must be planned ahead of time. The Council of Wizards, who are always observing and judging, will evaluate competitors based on the use of healing potions.
 *
 * The goal is to defeat all enemies while using the fewest number of potions possible. Therefore, your potion plan must be executed with accuracy and insight. Luckily, the kingdom's smartest spies have gathered a list of incoming creatures for each area ( your notes ). You also know exactly how many potions are needed for each type of creature:
 *
 * - Ancient Ant (A): Not very dangerous. Can be managed without using any potions.
 * - Badass Beetle (B): A big and strong bug that requires 1 potion to defeat.
 * - Creepy Cockroach (C): Fast and aggressive! This creature requires 3 potions to defeat it.
 *
 * With this knowledge, you must order the exact number of potions that need to be made for your mission.
 */
function solution(creatureArmy) {
    let potionsNeeded = 0
    for (let i = 0; i < creatureArmy.length; i++) {
        const creature = creatureArmy[i]
        if (creature === 'B') potionsNeeded += 1
        if (creature === 'C') potionsNeeded += 3
    }
    return potionsNeeded
}

module.exports = {
    solution,
}
