let { processClosetGraffiti, getProcessedDataStore, mostFrequentSnoozingMinute } = require('./04-1-solution')

/**
 * runs through the processed guard data (@see processClosetGraffiti)
 * and figures out which one slept the most & when.
 * @returns the id of the guard who slept the most & the minute
 */
function whoSleptTheMost() {
    let guards = getProcessedDataStore()

    let maxSleepPerMinute = -1
    let mostCommonlySleptMinute = -1
    let maxSleepId = -1

    Object.keys(guards).forEach(g => {
        let currentMaxMinute = mostFrequentSnoozingMinute(g)
        let currentMaxPerMinute = guards[g].sleep[currentMaxMinute]
        if (currentMaxPerMinute > maxSleepPerMinute) {
            maxSleepId = g
            maxSleepPerMinute = currentMaxPerMinute
            mostCommonlySleptMinute = currentMaxMinute
        }
    })

    return {
        maxSleepId: maxSleepId,
        mostCommonlySleptMinute: mostCommonlySleptMinute,
    }
}

/**
 * some helpful individuals left a bunch of notes about guard behavior all over the
 * closet walls. conveniently enough, they're in a standardized log format. this
 * method generates a checksum that identifies the sleepiest guard according to the
 * following spec.
 * ### Identifying the guard
 * Of all guards, which guard is most frequently asleep on the same minute?
 * ### Generating the checksum
 * What is the ID of the guard you chose multiplied by the minute you chose?
 * @param {*} closetNotes - an unordered list of all notes found in the closet
 * @returns a checksum that identifies the sleepiest guard
 */
function generateChecksumForTheSleepiestGuard(logLines) {
    processClosetGraffiti(logLines)
    let { maxSleepId, mostCommonlySleptMinute } = whoSleptTheMost()

    return maxSleepId * mostCommonlySleptMinute
}

module.exports = generateChecksumForTheSleepiestGuard
