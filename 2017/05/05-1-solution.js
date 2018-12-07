/**
 * counts the number of steps required to escape the maze
 * per spec defined in https://adventofcode.com/2017/day/5
 * @param {*} maze 
 */
function countStepsToEscapeTheMaze(maze) {
    let start = 0;
    let steps = 0;
    while (start > -1 && start < maze.length) {
        // sanitize input
        maze[start] = Number(maze[start]);
        move = maze[start];

        // handle movement
        maze[start]++;
        start = start + move;
        steps++;
    }
    return steps;
}

module.exports = countStepsToEscapeTheMaze;