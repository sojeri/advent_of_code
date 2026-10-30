// https://everybody.codes/event/2026/quests/4
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc 2026 4 1')

function solution(results) {
    const participantResults = {}
    const participants = []

    results.forEach(result => {
        const { id, time } = parseTournamentResult(result)
        if (participantResults[id] === undefined) {
            participants.push(id)
            participantResults[id] = time
        } else {
            participantResults[id] += time
        }
    })

    const ranked = participants.sort((a, b) => {
        return participantResults[a] - participantResults[b]
    })

    let sum = 0
    ranked.forEach((p, i) => {
        const rankScoreMultipler = i + 1
        sum += rankScoreMultipler * participantResults[p]
        logger.debug({
            p,
            rankScoreMultipler,
            time: participantResults[p],
            rankScore: participantResults[p] * rankScoreMultipler,
        })
    })
    return sum
}

/**
 * converts raw tournament results string into an object.
 *
 * NOTE: assumes all values are numbers.
 *
 * eg, 'id=7 quest=1 part=2 time=345'
 * returns
 * ```
 * {
 *   id: 7,
 *   quest: 1,
 *   part: 2,
 *   time: 345
 * }
 * ```
 */
function parseTournamentResult(raw) {
    const rawData = raw.split(' ')
    const output = {}
    rawData.forEach(rawProp => {
        const [prop, numberStr] = rawProp.split('=')
        output[prop] = Number(numberStr)
    })
    logger.debug({ raw, output })
    return output
}

module.exports = {
    solution,
    parseTournamentResult,
}

/*

Part I
Story section
After what felt like forever, the votes had finally been counted and the new Grand Council was chosen. We explained why we had travelled to the Elven Capital.

Glitchron, a powerful demon from the Undefined Realm, had rebuilt the fortress of Nulldor once again. Long ago, he had cursed the eggs of the ancient Dragonducks, twisting the creatures inside them into his Riders of Darkness. Only one egg had survived to this day: the stone that Frodoff had been carrying since we left Quackshire. Inside was the last descendant of those ancient Dragonducks, but Glitchron's curse was slowly changing what it would become. If the egg ever hatched under his influence, the creature inside would emerge as the Prince of Darkness. The egg could only be destroyed in Nulldor, of course. Frodoff finally understood where his clever idea in Gimlock's forge had come from. The cursed egg was slowly taking control of his mind, just as the curse was taking control of the hatchling inside.

The Grand Council agreed to help our expedition. They wanted to send their best warrior with us, but there was one problem. Nobody knew who the best warrior was. The annual Tournament of Elven Warriors had just finished. The warriors had completed many quests, but nobody had calculated the final standings yet. The winner still had to be determined.

Gimlock crossed his arms and said that if the records contained another ISO standard, he was going back to his mountain. Luckily, this time the records looked much more ordinary.

We were given the results of one of the tournament quests as a trial ( your notes ). The quest consisted of three parts. Every line described the result of one participant in one part using the following format:

 id=7 quest=1 part=2 time=345 

     id 

    was the participant's identifier,

     quest 

    identified the tournament quest,

     part 

    was the part number (1, 2, or 3),

     time 

    was the participant's completion time for that part, in seconds.

The list contained the complete results for a single quest. Every participant had finished all three parts, so the time for every part of every participant was present exactly once. The records were in no particular order.

We had to calculate the total time for every participant by adding together the times from all three parts. The participants then had to be ranked from the shortest total time to the longest.

Finally, we calculated a checksum so that the elves could easily verify our results. Starting from the top of the ranking, every participant's total time was multiplied by their finishing position (1 for first place, 2 for second, and so on). The checksum was the sum of all these products. Fortunately, nobody finished with the same total time, so the final ranking contained no ties.

Example based on the following notes:

id=1 quest=1 part=1 time=187
id=3 quest=1 part=1 time=413
id=5 quest=1 part=3 time=744
id=2 quest=1 part=3 time=745
id=4 quest=1 part=2 time=558
id=1 quest=1 part=2 time=299
id=1 quest=1 part=3 time=362
id=4 quest=1 part=3 time=1268
id=4 quest=1 part=1 time=457
id=5 quest=1 part=1 time=257
id=2 quest=1 part=1 time=192
id=3 quest=1 part=3 time=1168
id=5 quest=1 part=2 time=346
id=3 quest=1 part=2 time=455
id=2 quest=1 part=2 time=562

First, we calculated the total time for every participant:

 id=1: 187 + 299 + 362 = 848
 id=2: 192 + 562 + 745 = 1499
 id=3: 413 + 455 + 1168 = 2036
 id=4: 457 + 558 + 1268 = 2283
 id=5: 257 + 346 + 744 = 1347

Sorting the participants by their total times gave the following ranking:

 1st: id=1 (848)
 2nd: id=5 (1347)
 3rd: id=2 (1499)
 4th: id=3 (2036)
 5th: id=4 (2283)

The checksum was therefore: 1*848 + 2*1347 + 3*1499 + 4*2036 + 5*2283 =

 27598 

.
What was the checksum of the final ranking? 
*/
