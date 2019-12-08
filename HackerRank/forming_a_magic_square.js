/*
Forming a Magic Square
https://www.hackerrank.com/challenges/magic-square-forming/
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

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
    /*
    I tend to approach math questions by first wanting to understand the forumal on paper. For me
    it just workes easier because if I can write the problem out, then I can figure out the best
    way to code it from there.

    In this case I started researching what magic squares were, and it turns out there are only 9
    possible combinations of a 3x3 magic square.

    From there it was really just a matter of taking the provided data, and comparing it to each
    of the possible solutions and taking the lowest option from those comparisons.
    */

    // combine the matrix into a simple array
    let arr=s.reduce((a,b)=>{ return a.concat(b) });
    let options=[];
    // hard coded the possible options as a single array as well
    let ms = [
            [8, 1, 6, 3, 5, 7, 4, 9, 2],
            [6, 1, 8, 7, 5, 3, 2, 9, 4],
            [4, 9, 2, 3, 5, 7, 8, 1, 6],
            [2, 9, 4, 7, 5, 3, 6, 1, 8],
            [8, 3, 4, 1, 5, 9, 6, 7, 2],
            [4, 3, 8, 9, 5, 1, 2, 7, 6],
            [6, 7, 2, 1, 5, 9, 8, 3, 4],
            [2, 7, 6, 9, 5, 1, 4, 3, 8]
        ];

    // loop through each option
    for(let x=0; x<ms.length; x++){
        let row=ms[x];
        let total=0;
        // compare one value at a time against the provided data
        for(let y=0; y<row.length; y++){
            total+=Math.abs((arr[y]-row[y]));
        }
        // push the total for each row to an array
        options.push(total);
    }
    // return the lowest number in the array.
    return Math.min(...options);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
