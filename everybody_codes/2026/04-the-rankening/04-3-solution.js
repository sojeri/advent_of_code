// https://everybody.codes/event/2026/quests/4
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const { ascendingFieldSort, ascendingSort } = require('../../../utils/js/sorts')
const { parseTournamentResult } = require('./04-1-solution')
const logger = getLogger('ebc 2026 4 3')

//==============//
// module state //
//==============//

/**
 * all parsed tournament data
 * including quest data and participants and scores
 */
const tournament = {
    participants: {},
    quests: {},
    seenParticipants: [],
    seenQuests: [],
}

/** ascending sort on parts */
const sortByPart = (a, b) => {
    return ascendingFieldSort(a, b, 'part')
}

/** returns the starting scores specified in the puzzle story */
const getStartingScore = part => {
    switch (part) {
        case 1:
            return 50
        case 2:
            return 100
        case 3:
            return 150
        default:
            return -1
    }
}

/**
 * parses and saves tournament data to the module state
 * @see tournament
 */
function processTournamentResults({ id, quest, part, time }) {
    // init any objects that aren't already present
    if (tournament.participants[id] === undefined) {
        tournament.participants[id] = {
            id,
            score: 0,
            results: {},
        }
        tournament.seenParticipants.push(id)
    }
    if (tournament.quests[quest] === undefined) {
        tournament.quests[quest] = {
            seenParts: [],
        }
        tournament.seenQuests.push(quest)
    }
    if (tournament.quests[quest][part] === undefined) {
        tournament.quests[quest][part] = {
            participants: [],
        }
        tournament.quests[quest].seenParts.push(part)
    }

    // actually save row data
    const participantResults = tournament.participants[id].results
    const questPartKey = `${quest}::${part}`
    participantResults[questPartKey] = { time, quest, part }
    tournament.quests[quest][part].participants.push(id)

    // handle time accumulation for later rounds
    // (using === because time from 1 is moved to 2, then in adding 2 to 3 it already contains 1)
    if (part === 2) {
        participantResults[questPartKey].time += participantResults[`${quest}::${1}`].time
    }
    if (part === 3) {
        participantResults[questPartKey].time += participantResults[`${quest}::${2}`].time
    }
}

/** calculates all the quest part scores and saves them on the module participants state */
function scoreResults() {
    const quests = tournament.seenQuests.sort(ascendingSort)
    quests.forEach(questName => {
        const quest = tournament.quests[questName]
        const partNames = quest.seenParts
        partNames.forEach(partName => {
            const part = quest[partName]
            const questPartKey = `${questName}::${partName}`
            const getResultTime = pid => {
                return tournament.participants[pid].results[questPartKey].time
            }
            const rankedParticipantIds = part.participants.sort((a, b) => {
                return getResultTime(a) - getResultTime(b)
            })
            let lastTime = getResultTime(rankedParticipantIds[0]) - 1
            let tieCount = 1
            let currentScore = getStartingScore(partName) + 1 // need to +1 because -1 below

            logger.debug(`Quest ${questName}, Part ${partName}:`)

            // score the part
            rankedParticipantIds.forEach(pid => {
                // early exit non scoring results
                if (currentScore <= 0) return

                const time = getResultTime(pid)
                if (time === lastTime) {
                    tieCount++
                } else {
                    currentScore -= tieCount
                    tieCount = 1
                }

                // above may have reduced score below 1, so skipping negative score updates
                if (currentScore > 0) {
                    tournament.participants[pid].score += currentScore
                    lastTime = time
                    logger.debug(`id=${pid}, time=${time}, points=${currentScore}`)
                }
            })
        })
    })

    debugLogModuleState()
}

const debugLogModuleState = () => {
    Array.from(Object.values(tournament.participants)).forEach(p => {
        if (Array.isArray(p)) {
            logger.debug(...p)
        } else {
            logger.debug(p)
        }
    })
    Array.from(Object.entries(tournament.quests)).forEach(q => logger.debug(...q))
}

function solution(results) {
    // start with fresh module state
    tournament.participants = {}
    tournament.quests = {}
    tournament.seenParticipants = []
    tournament.seenQuests = []

    // parse results, starting with part sort because of the cumulative time requirement for later parts
    const sortedResults = results.map(parseTournamentResult).sort(sortByPart)
    sortedResults.forEach(processTournamentResults)

    // calculate all the scores
    scoreResults()

    // process final ranking
    const ranked = tournament.seenParticipants.sort((a, b) => {
        return tournament.participants[b].score - tournament.participants[a].score
    })

    // generate checksum
    let sum = 0
    let currentRank = 0
    let lastScore = Number.POSITIVE_INFINITY
    let tieCount = 1

    logger.info('Final Ranking:')
    ranked.forEach(pid => {
        const participant = tournament.participants[pid]
        const score = participant.score
        if (score === lastScore) {
            tieCount++
        } else {
            currentRank += tieCount
            tieCount = 1
        }
        logger.info(`${currentRank}. points=${score}`)
        sum += currentRank * score
        lastScore = score
    })
    return sum
}

module.exports = {
    solution,
}

/*

Part III

The elves were finally convinced that we could calculate rankings correctly. They handed us the results of the latest tournament ( your notes ) and asked us to determine the final standings.

This time, the ranking was no longer based directly on the number of completed parts or the total time. Instead, every completed part awarded ranking points.
For every quest, a new ranking was calculated after each part. The fastest participant received:

    50 points for part 1,
    100 points for part 2,
    150 points for part 3.

Every following participant received one point fewer, down to 1 point. Any remaining participants received 0 points. Participants who had not completed a part also received 0 points for that part.

One quest was played each day, and the times from its parts were added together when determining these rankings. The ranking after part 2 was based on the combined time of part 1 + part 2, while the ranking after part 3 was based on the combined time of part 1 + part 2 + part 3.

If two or more participants had exactly the same combined time after a given part, they shared the same position and each received the points for that position. For example, if two participants tied for first place in Part 2, they both received 100 points, while the next participant received 98 points.

After adding together all the points from every completed part, the participants were ranked by their total score. We then calculated the checksum as before, using each participant's final ranking position and total number of points. If two or more participants finished with the same total score, they shared the same position when calculating the checksum.

Example based on the following notes:

id=2 quest=1 part=1 time=100
id=4 quest=2 part=1 time=150
id=1 quest=2 part=1 time=140
id=1 quest=1 part=2 time=180
id=2 quest=2 part=1 time=130
id=4 quest=1 part=1 time=110
id=1 quest=2 part=2 time=210
id=2 quest=2 part=2 time=240
id=1 quest=2 part=3 time=330
id=2 quest=1 part=2 time=170
id=3 quest=1 part=1 time=90
id=4 quest=1 part=2 time=175
id=3 quest=2 part=1 time=120
id=1 quest=1 part=1 time=120
id=3 quest=2 part=2 time=220
id=2 quest=2 part=3 time=350
id=3 quest=1 part=2 time=160

We worked through the results one quest at a time and one part at a time.

For quest 1, the ranking after part 1 was:

1st: id=3, time 90  : 50 points
2nd: id=2, time 100 : 49 points
3rd: id=4, time 110 : 48 points
4th: id=1, time 120 : 47 points

After part 2, the times from both completed parts were added together:

1st: id=3, 90 + 160 = 250  : 100 points
2nd: id=2, 100 + 170 = 270 : 99 points
3rd: id=4, 110 + 175 = 285 : 98 points
4th: id=1, 120 + 180 = 300 : 97 points

Nobody completed part 3 of this quest, so no points were awarded for it.
For quest 2, the participants received:

Part 1:
1st: id=3, time 120 : 50 points
2nd: id=2, time 130 : 49 points
3rd: id=1, time 140 : 48 points
4th: id=4, time 150 : 47 points

Part 2:
1st: id=3, 120 + 220 = 340 : 100 points
2nd: id=1, 140 + 210 = 350 : 99 points
3rd: id=2, 130 + 240 = 370 : 98 points

Part 3:
1st: id=1, 140 + 210 + 330 = 680 : 150 points
2nd: id=2, 130 + 240 + 350 = 720 : 149 points

Adding all the points gave:

id=1: 47 + 97 + 48 + 99 + 150 = 441
id=2: 49 + 99 + 49 + 98 + 149 = 444
id=3: 50 + 100 + 50 + 100 = 300
id=4: 48 + 98 + 47 = 193

The final ranking was therefore:

1st: id=2, 444 points
2nd: id=1, 441 points
3rd: id=3, 300 points
4th: id=4, 193 points

The checksum was: 1*444 + 2*441 + 3*300 + 4*193 =

 2998 



id=2 quest=1 part=1 time=90
id=4 quest=2 part=1 time=150
id=1 quest=2 part=1 time=130
id=1 quest=1 part=2 time=180
id=2 quest=2 part=1 time=130
id=4 quest=1 part=1 time=110
id=1 quest=2 part=2 time=210
id=2 quest=2 part=2 time=220
id=1 quest=2 part=3 time=330
id=2 quest=1 part=2 time=170
id=3 quest=1 part=1 time=90
id=4 quest=1 part=2 time=170
id=3 quest=2 part=1 time=120
id=1 quest=1 part=1 time=120
id=3 quest=2 part=2 time=220
id=2 quest=2 part=3 time=350
id=3 quest=1 part=2 time=170

Frodoff insisted that we should also practise handling ties before starting the real task.
For quest 1, part 1, two participants shared first place:

1st: id=2, time 90  : 50 points
1st: id=3, time 90  : 50 points
3rd: id=4, time 110 : 48 points
4th: id=1, time 120 : 47 points

For quest 1, part 2, the ranking was based on the combined times from parts 1 and 2:

1st: id=2, 90 + 170 = 260  : 100 points
1st: id=3, 90 + 170 = 260  : 100 points
3rd: id=4, 110 + 170 = 280 : 98 points
4th: id=1, 120 + 180 = 300 : 97 points

Nobody completed part 3 of this quest, so no points were awarded for it.
For quest 2, part 1, two participants shared second place:

1st: id=3, time 120 : 50 points
2nd: id=1, time 130 : 49 points
2nd: id=2, time 130 : 49 points
4th: id=4, time 150 : 47 points

For quest 2, part 2, two participants shared first place:

1st: id=1, 130 + 210 = 340 : 100 points
1st: id=3, 120 + 220 = 340 : 100 points
3rd: id=2, 130 + 220 = 350 : 98 points

Only two participants completed quest 2, part 3:

1st: id=1, 130 + 210 + 330 = 670 : 150 points
2nd: id=2, 130 + 220 + 350 = 700 : 149 points

Adding together all the points gave:

id=1: 47 + 97 + 49 + 100 + 150  = 443
id=2: 50 + 100 + 49 + 98 + 149  = 446
id=3: 50 + 100 + 50 + 100       = 300
id=4: 48 + 98 + 47              = 193

The final ranking was therefore:

1st: id=2, 446 points
2nd: id=1, 443 points
3rd: id=3, 300 points
4th: id=4, 193 points

The checksum was: 1*446 + 2*443 + 3*300 + 4*193 =

 3004 



For easier debugging of this rather complicated task,
one more example is available  here.

The  calculation file contains the ranking for every quest and every part,
as well as the final scores, ranking positions, and checksum.

Pay special attention to the checksum calculation. The final ranking may also contain ties. In the example, two participants finished in 55th place with 374 points, and the checksum includes:

... + 55*374 + 55*374 + 57*...

rather than

... + 55*374 + 56*374 + 57*...

.
What was the checksum of the final ranking?
*/
