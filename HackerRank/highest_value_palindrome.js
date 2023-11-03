/*
Highest Value Palindrome Javascript Solution
https://www.hackerrank.com/challenges/richie-rich/problem
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
 * Complete the 'highestValuePalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER n
 *  3. INTEGER k
 */

function highestValuePalindrome(s, n, k) {
    // Write your code here
    let lives = k;
    let mod = new Array(n).fill(false);
    let temp = s.split('');
    
    for (let i = 0; i < n / 2; i++) {
        let j = n - i - 1;
        if (temp[i] != temp[j]) {
            mod[i] = true;
            lives--;
        }
        if (temp[i] < temp[j])
            temp[i] = temp[j];
        else if (temp[i] > temp[j])
            temp[j] = temp[i];
        if (lives < 0)
            return "-1";
    }
    
    let j = 0;
    
    while ((lives > 0) && (j < n / 2)) {
        if (temp[j] != '9') {
            if (mod[j])
                lives++;
            if (lives > 1) {
                temp[j] = '9';
                temp[n - j - 1] = '9';
                lives -= 2;
            }
        }
        j++;
    }
    
    if (n % 2 == 1) {
        if (lives > 0)
            temp[Math.floor(n / 2)] = '9';
    }
    
    return temp.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine();

    const result = highestValuePalindrome(s, n, k);

    ws.write(result + '\n');

    ws.end();
}
