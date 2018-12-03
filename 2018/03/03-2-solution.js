const xyMarker = "@ ";
const xyDivider = ",";
const sizeMarker = ": ";
const sizeDivider = "x";

let grid;

// FIXME: clean this horrible mess; 3am is a terrible time to finish code!
function findOverlappingClaims(string, claimsDoneProcessing = false) {
    // "#45 @ 711,780: 19x23"
    let xyStart = string.indexOf(xyMarker) + xyMarker.length;
    let xyEnd = string.indexOf(sizeMarker);
    let sizeStart = xyEnd + sizeMarker.length;
    let xy = string.slice(xyStart,xyEnd).split(xyDivider);
    let xStart = Number(xy[0]);
    let yStart = Number(xy[1]);
    let size = string.slice(sizeStart).split(sizeDivider);
    let xSize = Number(size[0]);
    let ySize = Number(size[1]);

    let newOverlappingClaims = 0;
    for (let i = xStart; i < xStart + xSize; i++) {
        if (!Array.isArray(grid[i])) {
            grid[i] = [];
        }

        for (let j = yStart; j < yStart + ySize; j++) {
            let currentVal = grid[i][j];
            if (claimsDoneProcessing) {
                if (currentVal != 1) {
                    newOverlappingClaims++;
                }
            } else if (currentVal == 1) {
                grid[i][j] = 2;
                newOverlappingClaims++;
            } else if (currentVal != 2) {
                grid[i][j] = 1;
            }
        }
    }

    if (newOverlappingClaims == 0) {
        return -1;
    }

    return newOverlappingClaims;
}

const idStartMarker = "#";
const idEndMarker = " ";
function findSingleValidClaim(claims, size = 1000) {
    grid = new Array(size);

    let contestedSpace = 0;
    let mightBeTheOne = [];
    claims.forEach((c, i) => {
        let newlyContestedSpace = findOverlappingClaims(c);
        if (newlyContestedSpace == -1) {
            mightBeTheOne.push(i);
            newlyContestedSpace = 0;
        }
        contestedSpace += newlyContestedSpace;
    });

    let theOne = -1;
    mightBeTheOne.forEach(m => {
        let claim = claims[m];
        let idStart = claim.indexOf(idStartMarker);
        let idEnd = claim.indexOf(idEndMarker);
        let id = claim.slice(idStart, idEnd);
        let isThisClaimTheOne = findOverlappingClaims(claim, true) == -1;
        if (findOverlappingClaims(claim, true) == -1) {
            let idEnd = claim.indexOf(idEndMarker);
            theOne = claim.slice(idStart, idEnd);
        }
    });
    
    return theOne;
}

module.exports = findSingleValidClaim;