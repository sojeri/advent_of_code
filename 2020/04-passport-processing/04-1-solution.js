const PASSPORT_FIELDS = {
    byr: 1,
    iyr: 10,
    eyr: 100,
    hgt: 1_000,
    hcl: 10_000,
    ecl: 100_000,
    pid: 1_000_000,
    cid: 10_000_000,
}
const VALID_PASSPORTS = {
    1_111_111: true,
    11_111_111: true,
}

function solution(inputArray) {
    let totalValidPassports = 0
    let currentPassportTotal = 0
    for (let i = 0; i < inputArray.length; i++) {
        const data = inputArray[i]

        if (data.length < 3) {
            if (VALID_PASSPORTS[currentPassportTotal]) {
                totalValidPassports++
            }
            currentPassportTotal = 0
            continue
        }

        let fields = data.split(' ').map(f => {
            return f.split(':')[0]
        })
        fields.forEach(field => {
            currentPassportTotal += PASSPORT_FIELDS[field]
        })
    }

    if (currentPassportTotal > 0 && VALID_PASSPORTS[currentPassportTotal]) {
        totalValidPassports++
    }

    return totalValidPassports
}

module.exports = solution
