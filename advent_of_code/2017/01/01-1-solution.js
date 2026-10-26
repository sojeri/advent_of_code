function sumRepeatingDigits(string) {
    if (Array.isArray(string)) {
        return sumRepeatingDigits(string[0])
    }
    let sum = 0
    for (let i = 0; i < string.length; i++) {
        let first = Number(string[i])
        let second = Number(string[(i + 1) % string.length])
        if (first == second) {
            sum += first
        }
    }

    return sum
}

module.exports = sumRepeatingDigits
