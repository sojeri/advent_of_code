const assert = require('assert')
const { filterSims, Age, Occult } = require('./file-v1')
const { betterFilterSims } = require('./file-v2')

describe('simple search sims tests', () => {
    describe('filter fn -- written during interview', () => {
        it('should return Alice Johnson for age TEEN', () => {
            assert.deepEqual(filterSims(`age=${Age.TEEN}`), [
                {
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    age: Age.TEEN,
                    occult: Occult.VAMPIRE,
                    salary: 400,
                },
            ])
        })
        it('should return Bob Brown and Jack Wilson for occult WEREWOLF', () => {
            assert.deepEqual(filterSims(`occult=${Occult.WEREWOLF}`), [
                {
                    age: Age.SENIOR,
                    firstName: 'Bob',
                    lastName: 'Brown',
                    occult: Occult.WEREWOLF,
                    salary: 700,
                },
                {
                    age: Age.YOUNG_ADULT,
                    firstName: 'Jack',
                    lastName: 'Wilson',
                    occult: Occult.WEREWOLF,
                    salary: 300,
                },
            ])
        })
        it('should return Jane Smith and Frank Green for salary ==600', () => {
            const urlEncoded = encodeURI('==600')
            assert.deepEqual(filterSims(`salary=${urlEncoded}`), [
                {
                    age: 3,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    occult: 1,
                    salary: 600,
                },
                {
                    age: 4,
                    firstName: 'Frank',
                    lastName: 'Green',
                    occult: 2,
                    salary: 600,
                },
            ])
        })
        it('should return Charlie Davis and Jill Wilson for salary <200', () => {
            const urlEncoded = encodeURI('<200')
            assert.deepEqual(filterSims(`salary=${urlEncoded}`), [
                {
                    age: 1,
                    firstName: 'Charlie',
                    lastName: 'Davis',
                    occult: 1,
                    salary: 0,
                },
                {
                    age: 3,
                    firstName: 'Jill',
                    lastName: 'Wilson',
                    occult: 2,
                    salary: 150,
                },
            ])
        })
    })

    describe('better filter fn -- written after interview', () => {
        describe('same tests from interview should pass', () => {
            it('should return Alice Johnson for age TEEN', () => {
                const searchQuery = { age: 'teen' }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        firstName: 'Alice',
                        lastName: 'Johnson',
                        age: Age.TEEN,
                        occult: Occult.VAMPIRE,
                        salary: 400,
                    },
                ])
            })
            it('should return Bob Brown and Jack Wilson for occult WEREWOLF', () => {
                const searchQuery = { occult: 'werewolf' }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: Age.SENIOR,
                        firstName: 'Bob',
                        lastName: 'Brown',
                        occult: Occult.WEREWOLF,
                        salary: 700,
                    },
                    {
                        age: Age.YOUNG_ADULT,
                        firstName: 'Jack',
                        lastName: 'Wilson',
                        occult: Occult.WEREWOLF,
                        salary: 300,
                    },
                ])
            })
            it('should return Jane Smith and Frank Green for salary ==600', () => {
                const searchQuery = { salary: [{ comparison: '==', value: 600 }] }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: 3,
                        firstName: 'Jane',
                        lastName: 'Smith',
                        occult: 1,
                        salary: 600,
                    },
                    {
                        age: 4,
                        firstName: 'Frank',
                        lastName: 'Green',
                        occult: 2,
                        salary: 600,
                    },
                ])
            })
            it('should return Charlie Davis and Jill Wilson for salary <200', () => {
                const searchQuery = { salary: [{ comparison: '<', value: 200 }] }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: 1,
                        firstName: 'Charlie',
                        lastName: 'Davis',
                        occult: 1,
                        salary: 0,
                    },
                    {
                        age: 3,
                        firstName: 'Jill',
                        lastName: 'Wilson',
                        occult: 2,
                        salary: 150,
                    },
                ])
            })
        })

        describe('combo searches and null occult', () => {
            it('should return Eve White for occult=null', () => {
                const searchQuery = { occult: null }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: 4,
                        firstName: 'Eve',
                        lastName: 'White',
                        occult: null,
                        salary: 550,
                    },
                ])
            })

            it('should return Jack Wilson for salary below 400, above 200', () => {
                const searchQuery = {
                    salary: [
                        { comparison: '>', value: 200 },
                        { comparison: '<', value: 400 },
                    ],
                }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: 3,
                        firstName: 'Jack',
                        lastName: 'Wilson',
                        occult: 8,
                        salary: 300,
                    },
                ])
            })

            it('should return Jill Wilson for salary < 200 and age young_adult', () => {
                const searchQuery = {
                    salary: [{ comparison: '<', value: 200 }],
                    age: 'young_adult',
                }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: 3,
                        firstName: 'Jill',
                        lastName: 'Wilson',
                        occult: 2,
                        salary: 150,
                    },
                ])
            })

            it('should return Frank Green for salary == 600 and occult WITCH', () => {
                const searchQuery = {
                    salary: [{ comparison: '==', value: 600 }],
                    occult: 'witch',
                }
                const results = betterFilterSims(searchQuery)
                assert.deepEqual(results, [
                    {
                        age: 4,
                        firstName: 'Frank',
                        lastName: 'Green',
                        occult: 2,
                        salary: 600,
                    },
                ])
            })
        })
    })
})
