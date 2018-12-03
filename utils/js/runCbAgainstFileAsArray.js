const fs = require('fs');

function runCallbackAgainstFileAsArray(callback, fileName) {
    let fileContents = fs.readFileSync(fileName);
    fileContents = fileContents.toString().split('\n');
    if (fileContents[fileContents.length-1] == '') {
        fileContents.pop();
    };
    return callback(fileContents);
}

module.exports = runCallbackAgainstFileAsArray;