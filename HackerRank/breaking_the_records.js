/*
Breaking the Records
https://www.hackerrank.com/challenges/breaking-best-and-worst-records/problem
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

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the breakingRecords function below.
function breakingRecords(scores) {
    let high=scores[0], low=scores[0], hCount=0, lCount=0;
    scores.shift(); // remove first item in array because we already set the initial values
    for(let l=scores.length; l>0; l--){
        let score = scores[scores.length-l];
        if (score>high) {
            high=score;
            hCount++;
        }
        if (score<low) {
            low=score;
            lCount++;
        }
    }
    return [hCount,lCount];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const result = breakingRecords(scores);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
