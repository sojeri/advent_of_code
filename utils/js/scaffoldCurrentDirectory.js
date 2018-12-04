const fs = require('fs');

const dirSeparator = '/';

function tryCreatePath(pathString) {
    try {
        fs.mkdirSync(pathString)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}

function createOutputPath(pathArray) {
    let currentPath = '';
    for (let i = 0; i < pathArray.length; i++) {
        currentPath += pathArray[i] + dirSeparator;
        tryCreatePath(currentPath);
    }
}

let path;
function getTemplatePath() {
    if (!path) {
        let currentPath = process.cwd().split(dirSeparator);
        currentPath.push(...['utils', 'js', 'templates', ''])
        path = currentPath.join(dirSeparator);
    }
    return path;
}

const dayMarker = '@@';
function updateContent(buffer, name) {
    let content = buffer.toString();
    return content.split(dayMarker).join(name);
}

const templateFiles = ['solution.js', 'test.js']
const templateVariants = ['-1-', '-2-']

// TODO: better error handling
// TODO: this should have tests to expose what it does
function scaffoldCurrentDirectory(prefix) {
    // get current directory number (eg 04)
    let path = prefix.split(dirSeparator);
    let day = path.pop();
    createOutputPath(path);

    // read template file, looping through lines
    templateFiles.forEach(fileName => {
        let writeStreams = templateVariants.map(v => fs.createWriteStream(prefix + v + fileName)) ;
        let readStream = fs.createReadStream(getTemplatePath() + fileName);
        readStream.on('data', (chunk) => {
            // - for each line, write to scaffold file in current directory
            // - if day line, replace marker with current directory number
            writeStreams.forEach((ws, i) => {
                let projectName = day + templateVariants[i];
                ws.write(updateContent(chunk, projectName));
            });
        });
        readStream.on('end', () => {
            writeStreams.forEach(ws => {
                ws.end();
            });
        });
    });
    
    console.log(`scaffolded ${path.join(dirSeparator)}'s ${templateFiles}`);
}

module.exports = scaffoldCurrentDirectory;