const { Age, Occult, sims } = require('./file-v1')

/**
 * returns true if record.salary matches query condition, eg ["salary", "<", "600"].
 * throws an error for unsupported query conditions.
 */
function isSalaryMatch(record, query) {
    const salaryQueries = query.salary
    if (salaryQueries === undefined) return true

    let isMatched = true
    salaryQueries.forEach(salaryQuery => {
        const { comparison, value } = salaryQuery
        switch (comparison) {
            case '==': {
                isMatched = isMatched && record.salary == value
                break
            }
            case '>': {
                isMatched = isMatched && record.salary > value
                break
            }
            case '<': {
                isMatched = isMatched && record.salary < value
                break
            }
            default:
                throw new Error('salary comparison not yet supported')
        }
    })

    return isMatched
}

/** returns true if record.age matches query.age string, eg 'adult' or 'teen' */
function isAgeMatch(record, query) {
    const ageQuery = query.age
    if (ageQuery === undefined) return true

    const QUERY = ageQuery.toUpperCase()
    return record.age == Age[QUERY]
}

/**
 * returns true if record.occult matches query string, eg 'werewolf' or 'witch'.
 */
function isOccultMatch(record, query) {
    const occultQuery = query.occult
    if (occultQuery === undefined) return true
    if (occultQuery === null) return record.occult === null

    const QUERY = occultQuery.toUpperCase()
    return record.occult == Occult[QUERY]
}

/**
 * returns true if record matches query.
 * might throw on unsupported salary comparisons.
 */
function isRecordMatch(record, query) {
    return isOccultMatch(record, query) && isAgeMatch(record, query) && isSalaryMatch(record, query)
}

/**
 * Filters the global 'sims' array based on an array of filters.
 *
 * @param criteria An array of filters to apply to the sims. This type can be extended or modified as necessary.
 * @returns An array of Sim objects that match the filters.
 *
 * Here are some example inputs for `criteria`:
 * - `["adult"]`
 * - `["teen"]`
 * - `["werewolf"]`
 * - `[("salary", "==", "550")]`
 * - `[("salary", "<", "600")]`
 *
 * Using better shape for criteria:
 * ```
 * {
 *   age: undefined | string,
 *   occult: undefined | string,
 *   salary: undefined | { comparison: string, value: number }[]
 * }
 * ```
 *
 * eg
 * - { age: "adult" }
 * - { age: 'teen' }
 * - { occult: 'werewolf' }
 * - { salary: [{ comparison: '==', value: 550 }] }
 * - { salary: [{ comparison: '<', value: 600 }] }
 * - { age: 'teen', occult: 'witch' }
 * - { salary: [{ comparison: '<', value: 600 }, { comparison: '<', value: 600 }] }
 */
function betterFilterSims(criteria) {
    const matches = []
    sims.forEach(s => {
        if (isRecordMatch(s, criteria)) {
            matches.push(s)
        }
    })
    return matches
}

module.exports = {
    betterFilterSims,
    isAgeMatch,
    isOccultMatch,
    isSalaryMatch,
    isRecordMatch,
}
