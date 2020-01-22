/*
The Birthday Bar
https://www.hackerrank.com/challenges/the-birthday-bar/problem
*/

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the birthday function below.
function birthday(s, d, m) {
    let lengths = 0,
        lastStartPoint = s.length - m + 1;

    /*
    For each item in array, add it together with the following numbers and test to see
    if the results are equal to the target. Checks inside the loop determine if any
    actions are actually taken to prevent unnecesary iterations.

    We end at the lastStartPoint because anything after that will not have enough numbers
    to complete the requored length of the target result. So there is no point running them
    through the calculations either.
    */
    for (let p = 0; p < lastStartPoint; p++) {
        // if only one piece, the piece must equal d
        if (s[p] == d && m == 1) lengths ++;

        /*
        if more than one piece and the first pieces isn't too large
        A number is too large if it is greater than the target - 1 for each remaining spot
            ex: target = 5, total length can be 2, then the largets the number can be is 4
                x = t - l + 1;
        */
        if (s[p] + m - 1 <= d && m > 1) {
            let sum = 0;
            loop1:
            for (let i = 0; i < m; i++) {
                sum = sum + s[p + i];
                /*
                break the for loop if the number is too large before it is completed
                saves un running through numbers that would not add up anyway
                */
                if (sum > d) break loop1;
            }
            if (sum == d) lengths++;
        }
    }

    return lengths;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const dm = readLine().replace(/\s+$/g, '').split(' ');

    const d = parseInt(dm[0], 10);

    const m = parseInt(dm[1], 10);

    const result = birthday(s, d, m);

    ws.write(result + '\n');

    ws.end();
}
