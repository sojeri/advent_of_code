const guardIdRegex = /#\d+/
const sortByDate = (a, b) => a.date - b.date

let processedDataStore = {}

/**
 * retrieve the processed guard data.
 * this is needed in order for part2 to take advantage of part1's code. :)
 */
function getProcessedDataStore() {
    return processedDataStore
}

/**
 * convert the @param logEntry into a fancy object for more easily readable code.
 * nice side effect -> move a lot of the messy stuff to one method. (>_>)
 * @param {*} logEntry - the log entry to convert
 */
function convertToFancyObject(logEntry) {
    // crazy date shenanigans
    let date = new Date(
        Date.UTC(
            Number(logEntry.slice(1, 5)) + 500, // year: 1518 is before the dawn of js time
            Number(logEntry.slice(6, 8)) - 1, // month: js month is zero-index, because reasons
            Number(logEntry.slice(9, 11)), // day
            Number(logEntry.slice(12, 14)), // hour
            Number(logEntry.slice(15, 17)) // minute
        )
    )

    let guardId = null
    if (logEntry.indexOf('#') > -1) {
        guardId = Number(guardIdRegex.exec(logEntry)[0].slice(1))
    }

    return {
        date: date,
        guardId: guardId,
        isShiftChange: guardId != null,
        isGuardAsleep: logEntry[19] == 'f',
    }
}

/**
 * creates an empty guard in the processed data store.
 * @param {*} guardId - the id of the guard
 */
function createGuard(guardId) {
    processedDataStore[guardId] = { totalSleep: 0, sleep: new Array(61), id: guardId }
    for (let m = 0; m <= 60; m++) {
        processedDataStore[guardId].sleep[m] = 0
    }
}

/**
 * updates a guard's recorded sleep time in the processed data store.
 * @param {*} guardId - the record id to update
 * @param {*} whenFellAsleep - the time the guard fell asleep (in minutes)
 * @param {*} whenAwakened - the time the guard woke up (in minutes)
 */
function updateGuardSleepMinutes(guardId, whenFellAsleep, whenAwakened) {
    processedDataStore[guardId].totalSleep += whenAwakened - whenFellAsleep
    for (let m = whenFellAsleep; m < whenAwakened; m++) {
        processedDataStore[guardId].sleep[m] += 1
    }
}

/**
 * processes all the notes found in the closet.
 * @param {*} logEntries - an unordered array of standardizes notes / log entries
 */
function processClosetGraffiti(logEntries) {
    let currentId, whenFellAsleep
    logEntries = logEntries.map(convertToFancyObject).sort(sortByDate)

    logEntries.forEach(entry => {
        let currentTime = entry.date.getMinutes()
        if (entry.isShiftChange) {
            currentId = entry.guardId
            whenFellAsleep = 0
            if (processedDataStore[currentId] == undefined) createGuard(currentId)
        } else if (entry.isGuardAsleep) {
            whenFellAsleep = currentTime
        } else {
            updateGuardSleepMinutes(currentId, whenFellAsleep, currentTime)
        }
    })
}

/**
 * runs through the processed guard data (@see processClosetGraffiti)
 * and figures out which one slept the most.
 * @returns the id of the guard who slept the most
 */
function whoSleptTheMost() {
    let maxSleep = -1
    let maxSleepId = -1

    Object.keys(processedDataStore).forEach(id => {
        let guard = processedDataStore[id]
        let currentSleep = guard.totalSleep
        if (currentSleep > maxSleep) {
            maxSleepId = id
            maxSleep = currentSleep
        }
    })

    return maxSleepId
}

/**
 * runs through a given guard's snoozing patterns (@see processClosetGraffiti)
 * and figures out which minute they slept through the most.
 * @param {*} guardId - the id of the guard to investigate
 * @returns the guard's most commonly slept-through minute
 */
function mostFrequentSnoozingMinute(guardId) {
    let guard = processedDataStore[guardId]
    let maxSleepMinute = -1
    let maxSleepCount = -1
    guard.sleep.forEach((count, minute) => {
        if (count > maxSleepCount) {
            maxSleepCount = count
            maxSleepMinute = minute
        }
    })

    return maxSleepMinute
}

/**
 * some helpful individuals left a bunch of notes about guard behavior all over the
 * closet walls. conveniently enough, they're in a standardized log format. this
 * method generates a checksum that identifies the sleepiest guard according to the
 * following spec:
 * ### Identifying the guard
 * What minute does that guard spend asleep the most?
 * ### Generating the checksum
 * What is the ID of the guard you chose multiplied by the minute you chose?
 * @param {*} closetNotes - an unordered list of all notes found in the closet
 * @returns a checksum that identifies the sleepiest guard
 */
function generateChecksumForTheSleepiestGuard(closetNotes) {
    processClosetGraffiti(closetNotes)
    let maxSleepDurationId = whoSleptTheMost()
    let mostCommonSleepMinute = mostFrequentSnoozingMinute(maxSleepDurationId)
    processedDataStore = {}

    return maxSleepDurationId * mostCommonSleepMinute
}

module.exports = {
    generateChecksumForTheSleepiestGuard,
    processClosetGraffiti,
    getProcessedDataStore,
    mostFrequentSnoozingMinute,
}
