# misc code puzzle solutions

a place for me to stash random code puzzle solutions, like:

- advent of code | [https://adventofcode.com](https://adventofcode.com)
- everybody codes | [https://everybody.codes](https://everybody.codes)
- project euler | [https://projecteuler.net](https://projecteuler.net)

## shout out

to a couple of my advent of code favorites:

- 2018 day 4 ( 53d693a7a51466daf8162f88b2898dbcb706048f ).
- [2021 day 4](./advent_of_code//2021/04-giant-squid)

## scripts

NOTE: if you don't have yarn installed, you can replace `yarn` below with `npm run`, eg `npm run new aoc 2028 1 some description here`

### `yarn new aoc <year> <day>` will scaffold the solution for year/day (day 1-25 only)

you may need to run `yarn fixNew` to give the script permissions.

### `yarn new sandbox <number>` will scaffold a sandbox the given number (1-999 only)

you may need to run `yarn fixNew` to give the script permissions.

### `yarn test` will run all tests

to run only a specific set of tests, use `.only` modifer on any level of mocha block, eg

```js
describe.only('the set of tests I want to run now', () => {
    // tests here
})
```

### `yarn notes` will grab important comments from code

example output:

```
>> yarn notes

> @ notes /path/to/root
> ./node_modules/notes/bin/notes

* /path/to/utils/js/scaffoldCurrentDirectory.js
  Line 40:   ✓ TODO better error handling
  Line 41:   ✓ TODO this should have tests to expose what it does
```
