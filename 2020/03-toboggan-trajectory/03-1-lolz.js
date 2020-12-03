/**
 * TheGrandTobogganAdventure is a class representing a 🛷 toboggan adventure
 * through a lovely forest 🌲🌲🌲. This is really not an example of good class
 * design. I wrote it because I wanted to have the code sentence:
 * `if (hitTree?) { ouch!() }` 😂 I think I might have to write this in ruby
 * to get that exact sentence, but I got pretty close.
 */
class TheGrandTobogganAdventure {
    /**
     * a raw 🌲
     */
    static TREE = '#'

    constructor(rawMap, slope) {
        this.map = rawMap
        this.rightLimit = rawMap[0].length
        this.rightMv = slope[0]
        this.downMv = slope[1]
        this.treesHit = 0
        this.right = 0
        this.down = 0
    }

    /** Runs the adventure. Let's go! 🌬🛷 */
    run() {
        while (this.tryContinueMoving()) {
            if (this.didHitTree) {
                this.ouch()
            }
        }

        return this.treesHit
    }

    /** tryContinueMoving attempts to move the sled according to the slope rule.
     * Returns true if the movement happened 💨 and false when the toboggan gets to the
     * bottom of the hill 🏞.
     */
    tryContinueMoving() {
        this.down += this.downMv
        this.right = (this.right + this.rightMv) % this.rightLimit

        return this.down < this.map.length
    }

    /**
     * didHitTree 🛷❓🌲 should be called after any toboggan movement
     */
    get didHitTree() {
        return this.map[this.down][this.right] === TheGrandTobogganAdventure.TREE
    }

    /**
     * ouch! 🛷💥🌲 should be called whenever toboggan hits a tree
     */
    ouch() {
        this.treesHit += 1
    }
}

/**
 * a funnier version of the part 1 solution. the base logic doesn't change,
 * but the naming does. I wrote it because I wanted to have the code sentence:
 * `if (didHitTree) { ouch!() }` 😂
 * @param {*} inputArray
 * @param {*} slope
 */
function lolz(inputArray, slope = [3, 1]) {
    const tobogganAdventure = new TheGrandTobogganAdventure(inputArray, slope)
    return tobogganAdventure.run()
}

module.exports = lolz
