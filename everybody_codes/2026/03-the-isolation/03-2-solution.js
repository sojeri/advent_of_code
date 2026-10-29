// https://everybody.codes/event/2026/quests/3
const { complexSum } = require('../../../utils/js/sumArray')
const { getLogger, VERBOSITY } = require('../../../utils/js/getLogger')
const logger = getLogger('ebc 2026 3 2', VERBOSITY.WARN)

function decodeIsoValue({ i, isoStandard, encodedValue, size }) {
    // handling for rotating sequence
    const paddedIso = padIso(isoStandard, size)

    // rest of this same as pt 1 -- aside from the log
    const isoBase = Number(paddedIso[i])
    const value = Number(encodedValue[i])
    const isoExponent = size - i
    const isoNumber = isoBase ** isoExponent
    const decodedValue = value * isoNumber

    logger.debug({
        isoStandard,
        encodedValue,
        i,
        size,
        paddedIso,
        isoBase,
        value,
        isoExponent,
        isoNumber,
        decodedValue,
    })
    return decodedValue
}

function padIso(iso, size) {
    const padded = []
    const isoSize = iso.length - 1
    for (let i = isoSize; padded.length <= size; i--) {
        if (i < 0) i = isoSize
        padded.unshift(iso[i])
    }
    return padded.join('')
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

Part II

We finished counting the votes surprisingly quickly, so the elven officials immediately handed us the votes cast for another candidate ( your notes ).

The work followed the same rules as before, with just one complication. Quite often, the number of digits in the ISO standard no longer matched the number of digits in the vote written using that standard.

One of the officials explained that an ISO standard represented a repeating pattern. Whenever more positional weights were needed, the pattern repeated until the entire number was covered.

For example:

     ISO-123 756423 

    could be treated in exactly the same way as

     ISO-123123 756423 

    .

     ISO-123 7564231 

    could be treated in exactly the same way as

     ISO-3123123 7564231 

    .
    Note that the pattern is repeated from right to left so that it covers the entire number.

     ISO-2 12345678 

    could be treated in exactly the same way as

     ISO-22222222 12345678 

    .

Apart from that, nothing else had changed. We still had to convert every vote into decimal notation, add all the values together, and report the candidate's final score.
Example based on the following notes:
The individual votes from the list could be converted into decimal notation as follows:

ISO-3210 7654
ISO-8742 2468
ISO-1 1111
ISO-13 777
ISO-34 140856
ISO-789 2465112
ISO-2341 945

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

 ISO-1 1111 = 4 

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

 ISO-13 777 = 77 

 ISO-313
     |||
     ||+-----------+
     |+-----+      |
     |      |      |
   7*3² + 7*1¹ + 7*3⁰ = 63 + 7 + 7 = 77 
   |      |      |
   |+-----+      |
   ||+-----------+
   |||
   |||
   777

 ISO-34 140856 = 1416 

 ISO-343434
     ||||||
     |||||+-----------------------------+
     ||||+-----------------------+      |
     |||+-----------------+      |      |
     ||+-----------+      |      |      |
     |+-----+      |      |      |      |
     |      |      |      |      |      |
   1*3⁵ + 4*4⁴ + 0*3³ + 8*4² + 5*3¹ + 6*4⁰ = 1416 
   |      |      |      |      |      |
   |+-----+      |      |      |      |
   ||+-----------+      |      |      |
   |||+-----------------+      |      |
   ||||+-----------------------+      |
   |||||+-----------------------------+
   ||||||
   ||||||
   140856

 ISO-789 2465112 = 1158390 

 ISO-9789789
     |||||||
     ||||||+-----------------------------------+
     |||||+-----------------------------+      |
     ||||+-----------------------+      |      |
     |||+-----------------+      |      |      |
     ||+-----------+      |      |      |      |
     |+-----+      |      |      |      |      |
     |      |      |      |      |      |      |
   2*9⁶ + 4*7⁵ + 6*8⁴ + 5*9³ + 1*7² + 1*8¹ + 2*9⁰ = 1158390 
   |      |      |      |      |      |      |
   |+-----+      |      |      |      |      |
   ||+-----------+      |      |      |      |
   |||+-----------------+      |      |      |
   ||||+-----------------------+      |      |
   |||||+-----------------------------+      |
   ||||||+-----------------------------------+
   |||||||
   |||||||
   2465112

 ISO-2341 945 = 102 

 ISO-341
     |||
     ||+-----------+
     |+-----+      |
     |      |      |
   9*3² + 4*4¹ + 5*1⁰ = 81 + 16 + 5 = 102 
   |      |      |
   |+-----+      |
   ||+-----------+
   |||
   |||
   945

The candidate's final score in the decimal number system was therefore:
222 + 1252 + 4 + 77 + 1416 + 1158390 + 102 =

 1161463 


 */
