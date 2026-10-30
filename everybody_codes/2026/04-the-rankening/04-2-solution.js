// https://everybody.codes/event/2026/quests/4
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const { parseTournamentResult } = require('./04-1-solution')
const logger = getLogger('ebc 2026 4 2')

const getParticipantRankScore = participant => {
    // shorter time should be higher, so subtracting instead of adding here
    return participant.parts * 10_000_000 - participant.time
}

function solution(results) {
    const participantResults = {}
    const participants = []

    results.forEach(result => {
        const { id, time } = parseTournamentResult(result)
        if (participantResults[id] === undefined) {
            participants.push(id)
            participantResults[id] = { time, parts: 1 }
        } else {
            participantResults[id].time += time
            participantResults[id].parts += 1
        }
    })
    logger.debug({ participantResults })

    const ranked = participants.sort((a, b) => {
        const left = getParticipantRankScore(participantResults[a])
        const right = getParticipantRankScore(participantResults[b])
        return right - left
    })

    let sum = 0
    ranked.forEach((p, i) => {
        const rankScoreMultipler = i + 1
        sum += rankScoreMultipler * participantResults[p].time
        logger.debug({
            p,
            rankScoreMultipler,
            time: participantResults[p].time,
            rankScore: participantResults[p].time * rankScoreMultipler,
        })
    })
    return sum
}

module.exports = {
    solution,
}

/*

Part II

The elves wanted to be certain that we could calculate the rankings correctly. They gave us the complete results from the previous tournament: all 20 quests and every recorded result for every participant ( your notes ).

Most participants had not completed every part of every quest. The number of completed parts was the most important value when determining the ranking. A participant who had completed more parts always ranked higher than one who had completed fewer.

If two participants had completed the same number of parts, the one with the shorter total time ranked higher. We then calculated the checksum exactly as before. The final ranking contained no ties, so every finishing position was unique.

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

First, we counted the number of completed parts and the total time for every participant:

id=1: 5 parts, total time = 980
id=2: 5 parts, total time = 990
id=3: 4 parts, total time = 590
id=4: 3 parts, total time = 435

Participants with more completed parts always ranked higher. If two participants had completed the same number of parts, the shorter total time decided the order.
The final ranking was therefore:

1st: id=1 (5 parts, 980)
2nd: id=2 (5 parts, 990)
3rd: id=3 (4 parts, 590)
4th: id=4 (3 parts, 435)

The checksum was: 1*980 + 2*990 + 3*590 + 4*435 =

 6470 

What was the checksum of the final ranking?
*/
