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
function scaffoldCurrentDirectory(prefix) {
    // get current directory number (eg 04)
    let path = prefix.split(dirSeparator)
    let day = path.pop()
    let year = path[0]
    let dayDir = path[1]
    createOutputPath(path)

    // read template file, looping through lines
    templateFiles.forEach(fileName => {
        let writeFileNames = templateVariants.map(v => prefix + v + fileName)
        writeFileNames.forEach(f => {
            if (fs.existsSync(f)) {
                throw new Error(`directory previously scaffolded: ${f} already exists.`)
            }
        })

        let writeStreams = writeFileNames.map(f => fs.createWriteStream(f))
        let readStream = fs.createReadStream(getTemplatePath() + fileName)
        readStream.on('data', chunk => {
            // - for each line, write to scaffold file in current directory
            // - if day line, replace marker with current directory number
            writeStreams.forEach((ws, i) => {
                let projectName = day + templateVariants[i]
                ws.write(updateContent(chunk, projectName, year == '2019', `${year}/${dayDir}`))
            })
        })
        readStream.on('end', () => {
            writeStreams.forEach(ws => {
                ws.end()
            })
        })
    })

    console.log(`scaffolded ${path.join(dirSeparator)}'s ${templateFiles}`)
}

module.exports = scaffoldCurrentDirectory
