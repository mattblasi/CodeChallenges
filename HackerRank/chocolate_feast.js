/*
Chocolate Feast
https://www.hackerrank.com/challenges/chocolate-feast/problem
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

// Complete the chocolateFeast function below.
function chocolateFeast(n, c, m) {
    /*
    n = money to buy first bars
    c = cost per bar
    m = wrappers for free bar
    */

    // Get the initial bars, and initialize counter for wrappers
    let totalBars = Math.floor(n/c),
        remainingWappers = totalBars;

    /*
    Loop through getting new bars with wrappers until there are
    not enough wrappers to get new totalBars
    */
    while (remainingWappers >= m) {
        let freeBars = Math.floor(remainingWappers/m);
        totalBars += freeBars;
        remainingWappers = remainingWappers - (freeBars * m) + freeBars;
    }

    return totalBars;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const ncm = readLine().split(' ');

        const n = parseInt(ncm[0], 10);

        const c = parseInt(ncm[1], 10);

        const m = parseInt(ncm[2], 10);

        let result = chocolateFeast(n, c, m);

        ws.write(result + "\n");
    }

    ws.end();
}
