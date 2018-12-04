# advent of code

<!--
jump links
- shout outs
- helpingful commands
    - running tests
    - scaffolding new day
    - grabbing notes from code
-->

## shout out

to my favorite piece of code so far: 2018 day 4 ( 53d693a7a51466daf8162f88b2898dbcb706048f ).

## npm scripts

### `npm run init -- <year> <day>` will scaffold the solution for year/day

you may need to run `npm run fixInit` to give the script permissions.

### `npm test` will run all tests

to run only a specific set of tests, use `.only` modifer on any level of mocha block, eg
```js
describe.only('the set of tests I want to run now', () => {
    // tests here
});
```

### `npm run notes` will grab important comments from code

example output:

```
>> npm run notes

> @ notes /path/to/root
> ./node_modules/notes/bin/notes

* /path/to/utils/js/scaffoldCurrentDirectory.js
  Line 40:   ✓ TODO better error handling
  Line 41:   ✓ TODO this should have tests to expose what it does
```