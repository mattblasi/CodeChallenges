/*
String Similarity Javascript Solution
https://www.hackerrank.com/challenges/string-similarity/problem

Video to understand Z Algorithm
https://www.youtube.com/watch?v=1Z--FP48Y20
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
 * Complete the 'stringSimilarity' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function stringSimilarity(s) {
    // solution is to use Z algorithm
    // length of the provided string
    const strLen = s.length;
    
    // create count array
    const countArr = new Array(strLen).fill(0);
    
    // boundaries
    let left = 0, right = 0;
    
    // get z values for the string
    for (let i = 1; i < strLen; i++) {
        if (i <= right) {
            // if i is in right take the min of remaining length of z-box and corresponding z-val
            countArr[i] = Math.min(right - i + 1, countArr[i - left]);
        }
        while (i + countArr[i] < strLen && s[countArr[i]] == s[i + countArr[i]]) {
            // if i is not in the z-box extend the z-box to the next option
            countArr[i] += 1;
        }
        if (i + countArr[i] - 1 > right) {
            // update the z-box
            left = i;
            right = i + countArr[i] - 1;
        }
    }
    
    // get total value of common prefixes within each suffix
    let ans = countArr.reduce((a, b) => a + b, 0);
    
    // add length to final string and return
    return ans += strLen;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = stringSimilarity(s);

        ws.write(result + '\n');
    }

    ws.end();
}
