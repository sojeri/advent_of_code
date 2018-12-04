# advent of code 2018

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

### `npm run notes` will grab important comments from code-- like the above

example output:

```
>> npm run notes

> @ notes /path/to/2018
> ./node_modules/notes/bin/notes

* /path/to/2018/README.md
Line 7:    ☂ FIXME inevitable improvement will be running tests for a specific module, maybe something like `npm test -- 01`
```