/*
Balanced Bracket Javascript Solution
https://www.hackerrank.com/challenges/balanced-brackets/problem
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
 * Complete the 'isBalanced' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */
function isBalanced(s) {
    // Write your code here
    // comparison items
    const pairs = ["{}","()","[]"];
    const opens = ["{","(","["];
    const close = ["}",")","]"];
    
    // Initial disqualifiers we can check 
    if (s.length%2===1                      // if it's an odd length string it cannot be balanced
        || close.includes(s[0])             // if it's a close bracket to start it's not balanced
        || opens.includes(s[s.length-1]))   // if ends in an open it is not balanced
            return "NO";

    
    let isBalanced = true;  
    let testStr = s[0];
    let count = 1, strLen = s.length;

    // run through the string ONLY ONCE!
    while (count < strLen) {
        if (s[count] === "{" || s[count] === "(" || s[count] === "[") {
            // if it's an open bracket we update testStr
            testStr += s[count];
        } else {
            // if it's a close bracket we compare it to the last character in testStr
            // builder comparison string with last open test and current close
            let check = `${testStr[testStr.length-1]}${s[count]}`;
            
            // check if it's a matching pair
            if (pairs.includes(check)) {
                // they match so cancel out that set
                testStr = testStr.slice(0,-1);
            } else {
                // they don't match so break the loop
                isBalanced = false;
                break;
            }   
        }
        
        count++;
    }
    
    return isBalanced ? "YES" : "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const s = readLine();

        const result = isBalanced(s);

        ws.write(result + '\n');
    }

    ws.end();
}
