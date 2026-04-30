//

/*
--- Day 7: Internet Protocol Version 7 ---

While snooping around the local network of EBHQ, you compile a list of IP addresses (they're IPv7, of course; IPv6 is much too limited). You'd like to figure out which IPs support TLS (transport-layer snooping).

An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by square brackets.

For example:

    abba[mnop]qrst supports TLS (abba outside square brackets).
    abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
    aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior characters must be different).
    ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even though it's within a larger string).

How many IPs in your puzzle input support TLS?
*/

function isABBA(word) {
    return (
        word.length === 4 && // ABBA.length = 4
        word[0] === word[3] && // A == A
        word[1] === word[2] && // B == B
        word[0] !== word[1] // A != B
    )
}

function hasTlsSupport(phrase) {
    let hasSupport = false
    let isBeforeHypernet = true
    let isAfterHypernet = false
    const lastHypernetStart = phrase.lastIndexOf('[')
    for (let a = 0; a < phrase.length; a++) {
        const b = a + 4
        if (b > phrase.length) return hasSupport

        const word = phrase.slice(a, b)
        const first = word[0]
        if (first === '[') {
            isBeforeHypernet = false
            continue
        }

        if (first === ']') {
            if (a >= lastHypernetStart && lastHypernetStart > -1) {
                isAfterHypernet = true
            } else {
                isBeforeHypernet = true
            }
            continue
        }

        if (isBeforeHypernet && isABBA(word)) {
            hasSupport = true
            continue
        }

        // aka if in hypernet
        if (!isBeforeHypernet && !isAfterHypernet) {
            if (isABBA(word)) {
                return false
            }
        }

        if (isAfterHypernet) {
            if (hasSupport) return hasSupport
            if (isABBA(word)) return true
        }
    }
}

function solution(words) {
    let sum = 0
    words.forEach(word => {
        if (hasTlsSupport(word)) {
            sum += 1
        }
    })
    return sum
}

module.exports = {
    isABBA,
    hasTlsSupport,
    solution,
}
