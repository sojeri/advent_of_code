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

to a couple of my favorites:

-   2018 day 4 ( 53d693a7a51466daf8162f88b2898dbcb706048f ).
-   [2021 day 4](./2021/04-giant-squid)

## scripts

### `yarn new <year> <day>` will scaffold the solution for year/day

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
