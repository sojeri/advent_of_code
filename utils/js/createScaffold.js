#!/usr/bin/env node

const scaffoldCurrentDirectory = require('./scaffoldCurrentDirectory');

let args = process.argv.slice(2);
let aocYear = args[0];
let aocDay = args[1];

const exampleCommand = '`npm run init -- 2017 01`';
const exampleCommandWithPlaceholders = '`npm run init -- <year> <day>'
function validateNumberRange(value, valueName, min, max) {
    if (Number(value) == NaN) {
        throw new Error(`
            npm run init should be called with a numeric ${valueName} value
            eg '${exampleCommand}' (${exampleCommandWithPlaceholders})`);
    }

    value = Number(value);
    if (value > max) {
        throw new Error(`${valueName} ${value} is greater than maximum ${max}`);
    }
    if (value < min) {
        throw new Error(`${valueName} ${value} is less than minimum ${min}`);
    }
}

validateNumberRange(aocYear, 'year', 2000, 2100);
validateNumberRange(aocDay, 'day', 1, 25);
scaffoldCurrentDirectory(`${aocYear}/${aocDay}/${aocDay}`);