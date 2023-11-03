/*
Non Divisible Subset Javascript Solution
https://www.hackerrank.com/challenges/non-divisible-subset/problem

First note is that the brute force solution of creating all subsets
then starting with the largest and working down will result in a time
complexity of O(2^n * n²) because the first step of creating all subsets
takes O(2^n) and each step of checking is O(n²).
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

/*
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k, s) {
    
    // create empty count array
    const count = new Array(k).fill(0);

    // get the individual remainder for each
    // vaue in provided array (s) fill count array 
    for (let i = 0; i < s.length; i++) {
        const remainder = s[i] % k;
        count[remainder] += 1;
    }

    let ans = Math.min(count[0], 1);

    // if k is even 
    if (k % 2 === 0) {
        ans += Math.min(count[Math.floor(k / 2)], 1);
    }

    // get count for each pair
    for (let i = 1; i <= Math.floor(k / 2); i++) {
        if (i !== k - i) {
            ans += Math.max(count[i], count[k - i]);
        }
    }

    return ans;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
