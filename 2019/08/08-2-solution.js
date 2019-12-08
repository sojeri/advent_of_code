function createImage(height, width) {
    let image = []
    for (let h = 0; h < height; h++) {
        let row = []
        for (let w = 0; w < width; w++) {
            row.push(' ')
        }
        image.push(row)
    }

    return image
}

// pixels, eg 123456789012
// width, eg 3
// height, eg 2
function solution(spaceImage, width, height) {
    if (Array.isArray(spaceImage)) {
        spaceImage = spaceImage[0]
    }

    let image = createImage(height, width)

    let layerSize = height * width

    let totalLayers = Math.floor(spaceImage.length / layerSize)
    for (let layer = 0; layer < totalLayers; layer++) {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let pixel = spaceImage[layer * layerSize + y * width + x]
                switch (pixel) {
                    case '0':
                        if (image[y][x] == ' ') {
                            image[y][x] = '#'
                        }
                        break
                    case '1':
                        if (image[y][x] == ' ') {
                            image[y][x] = '.'
                        }
                        break
                }
            }
        }
    }

    return image
}

function prettyPrintResult(arrayOfArrays) {
    arrayOfArrays.forEach(row => {
        console.log(row.join(''))
    })
}

module.exports = { solution, prettyPrintResult }
