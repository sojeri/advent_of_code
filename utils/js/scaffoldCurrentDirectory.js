const fs = require('fs')

const dirSeparator = '/'

function tryCreatePath(pathString) {
    try {
        fs.mkdirSync(pathString)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}

function createOutputPath(pathArray) {
    let currentPath = ''
    for (let i = 0; i < pathArray.length; i++) {
        currentPath += pathArray[i] + dirSeparator
        tryCreatePath(currentPath)
    }
}

let path
function getTemplatePath() {
    if (!path) {
        let currentPath = process.cwd().split(dirSeparator)
        currentPath.push(...['utils', 'js', 'templates', ''])
        path = currentPath.join(dirSeparator)
    }
    return path
}

const dayMarker = '@@'
const importMarker = '%%'
const importIntcode =
    "const { addInput, getIntcodeComputer, loadProgram, runProgram, PAUSE_EXECUTION_MARKER, PROCESS_TERMINATED_MARKER, } = require('../intcode-computer')"
const importFileMarker = '##'
function updateContent(buffer, name, is2019, dirName) {
    let content = buffer.toString()
    content = content.split(importMarker).join(is2019 ? importIntcode : '')
    return content
        .split(dayMarker)
        .join(name)
        .split(importFileMarker)
        .join(dirName)
}

const templateFiles = ['solution.js', 'test.js']
const templateVariants = ['-1-', '-2-']

// TODO: better error handling
// TODO: this should have tests to expose what it does
/**
 * scaffoldCurrentDirectory creates the desired part 1 and part 2 solution and
 * test files. In addition, it creates empty example & input text files. :)
 * If `yarn new` was called with args `2020 11 example`, then this method
 * will scaffold in folder in `<project root>/2020/11-example`
 * @param {*} param0 an unnamed object representing the desired path and file
 * prefixes, eg { aocYear: '2020', aocDayDir: '11-example', aocDay: '11' }
 */
function scaffoldCurrentDirectory({ aocYear, aocDayDir, aocDay }) {
    createOutputPath([aocYear, aocDayDir])
    const pathPrefix = `${aocYear}/${aocDayDir}/`

    templateFiles.forEach(fileName => {
        let writeFileNames = templateVariants.map(v => pathPrefix + aocDay + v + fileName)
        writeFileNames.forEach(f => {
            if (fs.existsSync(f)) {
                throw new Error(`directory previously scaffolded: ${f} already exists.`)
            }
        })

        let writeStreams = writeFileNames.map(f => fs.createWriteStream(f))
        let readStream = fs.createReadStream(getTemplatePath() + fileName)
        readStream.on('data', chunk => {
            writeStreams.forEach((ws, i) => {
                let projectName = aocDay + templateVariants[i]
                ws.write(updateContent(chunk, projectName, aocYear == '2019', `${aocYear}/${aocDayDir}`))
            })
        })

        readStream.on('end', () => {
            writeStreams.forEach(ws => {
                ws.end()
            })
        })
    })

    createEmptyFile(pathPrefix + 'example.txt')
    createEmptyFile(pathPrefix + 'input.txt')

    console.log(`scaffolded ${pathPrefix}'s ${templateFiles}`)
}

function createEmptyFile(fileName) {
    fs.open(fileName, 'w', err => {
        if (err) throw err
    })
}

module.exports = scaffoldCurrentDirectory
