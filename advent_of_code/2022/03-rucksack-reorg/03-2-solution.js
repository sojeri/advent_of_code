/**
 * https://adventofcode.com/2022/day/3#part2
 * find unique badge per set of bags
 * @param {*} bags
 */
function solution(bags) {
    let total = 0
    const unpackedBags = bags.map(b => getContents(b))
    for (let i = 0; i < bags.length; i += 3) {
        const firstItems = Object.keys(unpackedBags[i])
        const second = unpackedBags[i + 1]
        const third = unpackedBags[i + 2]
        for (let j = 0; j < firstItems.length; j++) {
            const item = firstItems[j]
            if (second[item] && third[item]) {
                total += scoreItem(item)
                j += firstItems.length
            }
        }
    }

    return total
}

function getContents(pocket) {
    const seen = {}
    for (let i = 0; i < pocket.length; i++) {
        const item = pocket[i]
        if (seen[item]) {
            continue
        }
        seen[item] = true
    }

    return seen
}

function scoreItem(item) {
    const code = item.charCodeAt(0) // grabs ASCII value
    const isLower = code > 90 // Z = 90
    console.log('item', item, 'score', { code }, isLower ? code - 60 : code - 15)

    // a = 97, so for 1 subtr 96
    // A = 65, so for 27 subtr 38
    return isLower ? code - 96 : code - 38
}

module.exports = solution
