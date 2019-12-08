// pixels, eg 123456789012
// width, eg 3
// height, eg 2
function solution(spaceImage, width, height) {
    if (Array.isArray(spaceImage)) {
        spaceImage = spaceImage[0]
    }

    let layerSize = height * width
    let leastZeros = layerSize
    let leastZerosLayer, leastZerosLayerOnes, leastZerosLayerTwos

    let layer = 0
    let layerZeros = layerSize
    let layerOnes = layerSize
    let layerTwos = layerSize
    for (let i = 0; i < spaceImage.length; i++) {
        if (i % layerSize == 0) {
            // check & update max state
            if (layerZeros < leastZeros) {
                leastZerosLayer = layer
                leastZeros = layerZeros
                leastZerosLayerOnes = layerOnes
                leastZerosLayerTwos = layerTwos
            }

            // reset layer state
            layer++
            layerZeros = 0
            layerOnes = 0
            layerTwos = 0
        }

        let pixel = spaceImage[i]
        switch (pixel) {
            case '0':
                layerZeros++
                break
            case '1':
                layerOnes++
                break
            case '2':
                layerTwos++
                break
        }
    }

    if (layerZeros < leastZeros) {
        leastZerosLayer = layer
        leastZeros = layerZeros
        leastZerosLayerOnes = layerOnes
        leastZerosLayerTwos = layerTwos
    }

    return leastZerosLayerOnes * leastZerosLayerTwos
}

module.exports = solution
