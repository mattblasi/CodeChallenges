/*
The Hurdle Race Javascript Solution
https://www.hackerrank.com/challenges/the-hurdle-race/problem
*/

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the hurdleRace function below.
function hurdleRace(k, height) {
    /*
    All we need to do is get the maximum height from the hurdle height array (height)
    and then compare that to the max height the runner can jump (k). If the runner jump
    height is higher than return 0, else return the difference between the max hurdle height
    and the max height the runner can jump.
    */
    const maxHurdleHeight = Math.max(...height);
    return (maxHurdleHeight>k) ? maxHurdleHeight-k : 0;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const height = readLine().split(' ').map(heightTemp => parseInt(heightTemp, 10));

    let result = hurdleRace(k, height);

    ws.write(result + "\n");

    ws.end();
}
