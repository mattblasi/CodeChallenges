/*
Count Luck
https://www.hackerrank.com/challenges/count-luck/problem
*/


'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', (inputStdin) => {
    inputString += inputStdin;
});

process.stdin.on('end', (_) => {
    inputString = inputString.replace(/\s*$/, '').split('\n').map((str) => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

class Queue {
    constructor() {
        this.queue = [];
    }
    enqueue(value) {
        this.queue.push(value);
    }
    dequeue() {
        if (this.size() > 0) return this.queue.shift();
        else return None;
    }
    size() {
        return this.queue.length;
    }
}

function getNeighbors(cell, matrix) {
    let neighbors = [];
    let [ x, y ] = cell.split(',');
    x = parseInt(x);
    y = parseInt(y);
    if (x < matrix.length - 1) {
        if (matrix[x + 1][y] == '.' || matrix[x + 1][y] == '*') neighbors.push([ x + 1, y ].join(','));
    }
    if (y < matrix[0].length - 1) {
        if (matrix[x][y + 1] == '.' || matrix[x][y + 1] == '*') neighbors.push([ x, y + 1 ].join(','));
    }
    if (x > 0) {
        if (matrix[x - 1][y] == '.' || matrix[x - 1][y] == '*') neighbors.push([ x - 1, y ].join(','));
    }
    if (y > 0) {
        if (matrix[x][y - 1] == '.' || matrix[x][y - 1] == '*') neighbors.push([ x, y - 1 ].join(','));
    }
    return neighbors;
}

function bfs(start, destination, matrix) {
    let queue = new Queue();
    let visited = new Set();
    queue.enqueue([ start ]);
    while (queue.size() > 0) {
        let path = queue.dequeue();
        let currentCell = path[path.length - 1];

        if (currentCell == destination) return path;

        if (!visited.has(currentCell)) {
            visited.add(currentCell);
            let neighbors = getNeighbors(currentCell, matrix);
            for (let neighbor of neighbors) {
                let currentPath = [ ...path ];
                currentPath.push(neighbor);
                queue.enqueue(currentPath);
            }
        }
    }
    return [];
}

function countLuck(matrix, k) {
    var start = null;
    var portkey = null;
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 'M') start = [ x, y ].join(',');
            if (matrix[x][y] == '*') portkey = [ x, y ].join(',');
        }
    }
    if (start == null || portkey == null) return 'Oops!';

    var path = bfs(start, portkey, matrix);

    var count = 0;
    var visited = new Set();
    for (let cell of path) {
        if (cell == portkey) break;
        visited.add(cell);
        let neighbors = getNeighbors(cell, matrix).filter((cell) => !visited.has(cell));
        if (neighbors.length > 1) count++;
        if (count > k) return 'Oops!';
    }
    return (count === k) ? 'Impressed' : 'Oops!';
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        let matrix = [];

        for (let i = 0; i < n; i++) {
            const matrixItem = readLine();
            matrix.push(matrixItem);
        }

        const k = parseInt(readLine(), 10);

        let result = countLuck(matrix, k);

        ws.write(result + '\n');
    }

    ws.end();
}
