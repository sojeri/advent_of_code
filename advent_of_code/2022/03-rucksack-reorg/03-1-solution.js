/**
 * https://adventofcode.com/2022/day/3
 * find total bag scores
 * @param {*} bags
 */
function solution(bags) {
    let total = 0
    bags.forEach(b => (total += scoreBag(b)))
    return total
}

function getContents(pocket) {
    const seen = {}
    for (let i = 0; i < pocket.length; i++) {
        const item = pocket[i]
        if (seen[item]) {
            seen[item] += 1
            continue
        }
        seen[item] = 1
    }

    return seen
}

function scoreBag(bag) {
    const size = bag.length / 2
    const someContents = getContents(bag.slice(0, size))
    const otherContents = getContents(bag.slice(size))
    const contents = Object.keys(someContents)
    console.log({ contents, someContents, otherContents })
    for (let i = 0; i < contents.length; i++) {
        const item = contents[i]
        if (otherContents[item]) return scoreItem(item)
    }

    throw new Error('no match between bags???')
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
