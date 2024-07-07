/**
 * https://adventofcode.com/2022/day/7
 * @param {*} input
 * @returns
 */
function solution(input) {
    const dirMap = calcDirSizes(input)
    return findSmallDirSum(dirMap)
}

function findSmallDirSum(dirs, size = 100_000) {
    let sum = 0
    Object.keys(dirs).forEach(dir => {
        if (dirs[dir] < size) sum += dirs[dir]
    })
    return sum
}

/**
 * 
 * @param {*} history str[] a series of CLI commands and their outputs
 *
 eg input array
 ```
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
 ```
which means:
 ```
 - / (dir)
 -- a (dir)
  --- e (dir)
   ---- i (file, size=584)
  --- f (file, size=29116)
  --- g (file, size=2557)
  --- h.lst (file, size=62596)
 -- b.txt (file, size=14848514)
 -- c.dat (file, size=8504156)
 -- d (dir)
  --- j (file, size=4060174)
  --- d.log (file, size=8033020)
  --- d.ext (file, size=5626152)
  --- k (file, size=7214296)
```
 * @returns 
```
{
    />a>e: 584,
    />a: 94_853,
    />d: 24_933_642,
    /: 48_381_165,
}
```
 */
function calcDirSizes(history) {
    let dirs = {},
        dirHist = []
    let dir
    const cdDotDot = () => {
        const subDir = dirHist.pop()
        dir = dirHist[dirHist.length - 1]
        dirs[dir] += dirs[subDir]
    }
    const getDirPrefix = () => {
        return dirHist.length ? `${dirHist[dirHist.length - 1]}>` : ''
    }
    history.forEach(line => {
        if (isCommand(line)) {
            const [_, cmd, instr] = line.split(' ')
            switch (cmd) {
                case 'cd':
                    if (instr === '..') {
                        cdDotDot()
                    } else {
                        dir = `${getDirPrefix()}${instr}`
                        dirHist.push(dir)
                        if (!dirs[dir]) dirs[dir] = 0
                    }
                    break
                case 'ls':
                    break
                default:
                    throw new Error('unknown command', cmd)
            }
        } else {
            const [size, _] = line.split(' ')
            if (size !== 'dir') {
                dirs[dir] += Number.parseInt(size)
            }
        }
    })

    while (dirHist.length > 1) {
        cdDotDot()
    }

    return dirs
}

const isCommand = l => l[0] === '$'

module.exports = { solution, calcDirSizes }
