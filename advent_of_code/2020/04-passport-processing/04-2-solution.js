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

VALID_EYE_COLORS = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

function isNumberValid(value, min, max) {
    const numericVal = Number(value)
    return min <= numericVal && numericVal <= max
}

function isFieldValid(field, value) {
    switch (field) {
        case 'byr':
            return isNumberValid(value, 1920, 2002)
        case 'iyr':
            return isNumberValid(value, 2010, 2020)
        case 'eyr':
            return isNumberValid(value, 2020, 2030)
        case 'hgt':
            const unit = value.slice(-2)
            value = value.slice(0, -2)
            if (unit === 'cm') {
                return isNumberValid(value, 150, 193)
            } else if (unit === 'in') {
                return isNumberValid(value, 59, 76)
            }
            return false
        case 'hcl':
            return /^#[a-fA-F0-9]{6}$/.test(value)
        case 'ecl':
            return VALID_EYE_COLORS.indexOf(value) > -1
        case 'pid':
            return value.length === 9 && !Number.isNaN(Number(value))
        case 'cid':
            return true
    }
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
            return f.split(':')
        })
        fields.forEach(f => {
            const [field, value] = f
            if (isFieldValid(field, value)) {
                currentPassportTotal += PASSPORT_FIELDS[field]
            }
        })
    }

    if (currentPassportTotal > 0 && VALID_PASSPORTS[currentPassportTotal]) {
        totalValidPassports++
    }

    return totalValidPassports
}

module.exports = solution
