/**
- sims
- list of characters with jobs like firefighter, etc
- filter list down to eg who are all the police, firefighters, etc

### Task 1 - Filter by one condition

Implement the `filter_sims` function. The function should return a list of sims that match the criteria.

For Task 1, assume `criteria` is an array with a single element, representing a single condition. This element can either be:

- One of the following strings: `baby`, `teen`, `young_adult`, `adult`, `senior`, `fairy`, `witch`, `vampire`, `werewolf`
- OR a tuple (or array in TypeScript) consisting of exactly three strings:
    - The first element is the string `salary`
    - The second element is one of the following strings: `==` , `<` , `>`
    - The third element is a numeric string (i.e., “300”)

You must filter sims according to the following rules:

- If the condition is a string representing an age (e.g., `teen` ), only return the sims that match that age. Don’t match sims that are younger or older than the condition.
- If the condition is a string representing an occult (e.g., `vampire` ), only return the sims that match that occult.
- If the condition is a tuple, only return the sims whose salary satisfies the boolean condition represented by the tuple. For example, if the tuple is `("salary", ">", "200")` , only return the sims who have a salary greater than 200.

Here are some example inputs for `criteria` :

- `["adult"]`
- `["teen"]`
- `["werewolf"]`
- `[("salary", "==", "550")]`
- `[("salary", "<", "600")]`
*/

// Typescript Boilerplate
// --- ENUMS & TYPES ---

const Age = {
    BABY: 1,
    TEEN: 2,
    YOUNG_ADULT: 3,
    ADULT: 4,
    SENIOR: 5,
}

const Occult = {
    FAIRY: 1,
    WITCH: 2,
    VAMPIRE: 4,
    WEREWOLF: 8,
}

// export interface Sim {
//   firstName: string;
//   lastName: string;
//   age: Age;
//   occult: Occult | null;
//   salary: number;
// }

/**
 * A filter that can be used to filter the sims.
 * This can be extended or modified as necessary.
 */
// export type Filter =  string | Array<string>;

// --- TEST DATA ---

// : Sim[]
const sims = [
    {
        firstName: 'Alice',
        lastName: 'Johnson',
        age: Age.TEEN,
        occult: Occult.VAMPIRE,
        salary: 400,
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        age: Age.ADULT,
        occult: Occult.WITCH,
        salary: 500,
    },
    {
        firstName: 'Jane',
        lastName: 'Smith',
        age: Age.YOUNG_ADULT,
        occult: Occult.FAIRY,
        salary: 600,
    },
    {
        firstName: 'Bob',
        lastName: 'Brown',
        age: Age.SENIOR,
        occult: Occult.WEREWOLF,
        salary: 700,
    },
    {
        firstName: 'Charlie',
        lastName: 'Davis',
        age: Age.BABY,
        occult: Occult.FAIRY,
        salary: 0,
    },
    {
        firstName: 'Eve',
        lastName: 'White',
        age: Age.ADULT,
        occult: null,
        salary: 550,
    },
    {
        firstName: 'Frank',
        lastName: 'Green',
        age: Age.ADULT,
        occult: Occult.WITCH,
        salary: 600,
    },
    {
        firstName: 'Grace',
        lastName: 'Harris',
        age: Age.ADULT,
        occult: Occult.VAMPIRE,
        salary: 650,
    },
    {
        firstName: 'Hannah',
        lastName: 'Scott',
        age: Age.ADULT,
        occult: Occult.WITCH,
        salary: 700,
    },
    {
        firstName: 'Ivy',
        lastName: 'Thompson',
        age: Age.ADULT,
        occult: Occult.FAIRY,
        salary: 750,
    },
    {
        firstName: 'Jack',
        lastName: 'Wilson',
        age: Age.YOUNG_ADULT,
        occult: Occult.WEREWOLF,
        salary: 300,
    },
    {
        firstName: 'Jill',
        lastName: 'Taylor',
        age: Age.ADULT,
        occult: Occult.WITCH,
        salary: 850,
    },
    {
        firstName: 'Jill',
        lastName: 'Wilson',
        age: Age.YOUNG_ADULT,
        occult: Occult.WITCH,
        salary: 150,
    },
]

// --- CODE ---

// Sim {
//   firstName: string;
//   lastName: string;
//   age: Age;
//   occult: Occult | null;
//   salary: number;
// }

/**
 * Filters the global 'sims' array based on an array of filters.
 *
 * @param criteria An array of filters to apply to the sims. This type can be extended or modified as necessary.
 * @returns An array of Sim objects that match the filters.
 */
// criteria: Filter[] => : Sim[]
const numMatcher = new RegExp(/\n+/g)
const zeroCharCode = '0'.charCodeAt(0)
const nineCharCode = '9'.charCodeAt(0)
function filterSims(query) {
    // age=adult&occult=werewolf&salary='==550'
    const queryParts = query.split('=')
    const [filterType, ...rawFilterValue] = queryParts
    const filterValue = decodeURI(rawFilterValue.join('='))

    switch (filterType) {
        case 'age': {
            return sims.filter(s => s.age == filterValue)
        }
        case 'occult': {
            return sims.filter(s => s.occult == filterValue)
        }
        case 'salary': {
            // TODO: confirm, probably still need to Number() it
            const first = filterValue[0]
            const second = filterValue[1]
            const secondCharCode = filterValue.charCodeAt(1)
            const hasTwoCharacters = secondCharCode < zeroCharCode || secondCharCode > nineCharCode
            const predicate = `${first}${hasTwoCharacters ? second : ''}`
            const filterValueNum = Number(filterValue.slice(hasTwoCharacters ? 2 : 1))
            switch (predicate) {
                case '==': {
                    return sims.filter(s => s.salary == filterValueNum)
                }
                case '>': {
                    return sims.filter(s => s.salary > filterValueNum)
                }
                case '<': {
                    return sims.filter(s => s.salary < filterValueNum)
                }
                default:
                    throw new Error('salary comparison not yet supported')
            }
            return filterValueNum
        }
        default:
            throw new Error('not implemented')
    }
}

// Here are some example inputs for `criteria` :

// - `["age=adult"]`
// - `["age=teen"]`
// - `["werewolf"]`
// - `[("salary", "==", "550")]`
// - `[("salary", "<", "600")]`

module.exports = {
    filterSims,
    Age,
    Occult,
    sims,
}
