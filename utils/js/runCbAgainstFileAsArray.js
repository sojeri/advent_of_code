const fs = require('fs')

/**
 * loads a file and runs a callback against its contents
 * @param {*} callback the fn to dump file contents into :)
 * @param {*} fileName a file name to attempt to load
 * @param {*} sanitizeInput whether to sanitize input (return array[0] if array size is 1)
 */
function runCallbackAgainstFileAsArray(callback, fileName = 'input.txt', sanitizeInput = false) {
    let fileContents = fs.readFileSync(fileName)
    fileContents = fileContents.toString().split('\n')
    if (fileContents[fileContents.length - 1] == '') {
        fileContents.pop()
    }

    if (sanitizeInput && fileContents.length == 1) {
        fileContents = fileContents[0]
    }

    return callback(fileContents)
}

module.exports = runCallbackAgainstFileAsArray
