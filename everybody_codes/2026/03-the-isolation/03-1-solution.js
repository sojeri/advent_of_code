// https://everybody.codes/event/2026/quests/3
const { complexSum } = require('../../../utils/js/sumArray')
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc 2026 3 1')

function decodeIsoValue({ i, isoStandard, encodedValue, size }) {
    const isoBase = Number(isoStandard[i])
    const value = Number(encodedValue[i])
    const isoExponent = size - i
    const isoNumber = isoBase ** isoExponent
    const decodedValue = value * isoNumber
    logger.debug({ isoBase, value, isoExponent, isoNumber, decodedValue })
    return decodedValue
}

function extractIsoNumber(line) {
    // ISO-3210 7654
    const [rawIsoStandard, encodedValue] = line.split(' ')
    const [_prefix, isoStandard] = rawIsoStandard.split('-')
    let sum = 0
    const size = encodedValue.length - 1
    for (let i = size; i >= 0; i--) {
        sum += decodeIsoValue({
            i,
            isoStandard,
            encodedValue,
            size,
        })
    }
    return sum
}

function solution(lines) {
    return complexSum(lines, extractIsoNumber)
}

module.exports = {
    decodeIsoValue,
    extractIsoNumber,
    solution,
}

/*

Part I

Story section

With his research finally complete, Gimlock happily joined our expedition. The smile on his face lasted exactly until he learned that our next stop would be the Elven Capital. We still needed the elves' help if we were to continue our journey to Nulldor.

Gimlock stopped walking immediately. Like every self-respecting dwarf, he had never trusted elves. He muttered something about elves forming a committee before they could hammer in a nail. After a little more grumbling, he reluctantly agreed to continue.

When we finally arrived, we discovered that the elves were in the middle of electing three members of their Grand Council. Most of the votes had already been counted, but the counting itself had become rather complicated. There was nobody in charge for us to speak to yet, so we decided we might as well help finish the count.

Elves had a remarkable talent for over-engineering even the simplest ideas, and their number system was no exception. Instead of writing numbers in the ordinary decimal notation, they had introduced a collection of different standard representations known as __ISO__ standards.

Unfortunately, over the centuries they had invented so many different ISO standards that nobody could agree which one was actually the standard. The obvious solution, of course, was to declare all of them equally standard. By then, nobody could even remember what the letters "ISO" originally stood for.

Every vote was written as two values separated by a space:

 ISO-3210 7654 

. The part after

 ISO-

defined the standard, while the second value was the vote itself written using that standard. Each digit of the standard specified the weight base used for the corresponding digit of the vote, starting from the least significant digit. Just like in ordinary positional number systems, the rightmost weight base was raised to the power of 0, the next one to the power of 1, then 2, and so on.

Every vote contained a number representing how much the voter supported the chosen candidate, written in one of the many elven ISO standards. We received the votes cast for one of the candidates ( your notes ). Our task was to convert every vote back into good old decimal notation, sum all the values, and report the total score.
Example based on the following notes:

ISO-3210 7654
ISO-8742 2468
ISO-1111 1111

The individual votes from the list could be converted into decimal notation as follows:

 ISO-3210 7654 = 222 

 ISO-3210
     ||||
     |||+-----------------+
     ||+-----------+      |
     |+-----+      |      |
     |      |      |      |
   7*3³ + 6*2² + 5*1¹ + 4*0⁰ = 189 + 24 + 5 + 4 = 222 
   |      |      |      |
   |+-----+      |      |
   ||+-----------+      |
   |||+-----------------+
   ||||
   ||||
   7654

 ISO-8742 2468 = 1252 

 ISO-8742
     ||||
     |||+-----------------+
     ||+-----------+      |
     |+-----+      |      |
     |      |      |      |
   2*8³ + 4*7² + 6*4¹ + 8*2⁰ = 1024 + 196 + 24 + 8 = 1252 
   |      |      |      |
   |+-----+      |      |
   ||+-----------+      |
   |||+-----------------+
   ||||
   ||||
   2468

 ISO-1111 1111 = 4 

 ISO-1111
     ||||
     |||+-----------------+
     ||+-----------+      |
     |+-----+      |      |
     |      |      |      |
   1*1³ + 1*1² + 1*1¹ + 1*1⁰ = 1 + 1 + 1 + 1 = 4 
   |      |      |      |
   |+-----+      |      |
   ||+-----------+      |
   |||+-----------------+
   ||||
   ||||
   1111

The candidate's final score in the decimal number system was therefore: 222 + 1252 + 4 =

 1478 

What was the candidate's total score in the decimal number system?
*/
