/*
Divisible Sum Pairs
https://www.hackerrank.com/challenges/divisible-sum-pairs/problem
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

// Complete the divisibleSumPairs function below.
function divisibleSumPairs(n, k, ar) {
    let pairs = 0;

    // for each number in the provided array add it to the other numbers after it
    for (let p = 0; p < ar.length; p++){
        for (let q = p + 1; q < ar.length; q++){
            let test = (ar[p] + ar[q])/k; // get result of the division
            if ( test - Math.floor(test) === 0) pairs++; // if test is a whole number it is a valid pair
        }
    }

    return pairs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));

    let result = divisibleSumPairs(n, k, ar);

    ws.write(result + "\n");

    ws.end();
}
