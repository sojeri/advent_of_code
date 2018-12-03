const fs = require('fs');


function getCurrentDirectory() {
    let currentPath = process.cwd();
    return currentPath.split('/').pop();
}

let path;
function getTemplatePath() {
    if (!path) {
        let currentPath = process.cwd().split('/');
        currentPath.pop();
        currentPath.pop();
        currentPath.push(...['utils', 'js', 'templates', ''])
        path = currentPath.join('/');
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

function scaffoldCurrentDirectory() {
    // get current directory number (eg 04)
    let name = getCurrentDirectory();

    // read template file, looping through lines
    templateFiles.forEach(fileName => {
        let writeStreams = templateVariants.map(v => fs.createWriteStream(name + v + fileName)) ;
        let readStream = fs.createReadStream(getTemplatePath() + fileName);
        readStream.on('data', (chunk) => {
            // - for each line, write to scaffold file in current directory
            // - if day line, replace marker with current directory number
            writeStreams.forEach((ws, i) => {
                let projectName = name + templateVariants[i];
                ws.write(updateContent(chunk, projectName));
            });
        });
        readStream.on('end', () => {
            writeStreams.forEach(ws => {
                ws.end();
            });
        });
        console.log(`scaffolded ${name}'s ${templateFiles}`);
    });

}

module.exports = scaffoldCurrentDirectory;