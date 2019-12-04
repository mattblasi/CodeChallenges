/*
Apple and Orange Javascript Solution
https://www.hackerrank.com/challenges/apple-and-orange
*/

'use strict';

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

// Complete the countApplesAndOranges function below.
function countApplesAndOranges(s, t, a, b, apples, oranges) {
    // range is between s & t
    /*
    the process for both fruit is exactly the same and the house
    never moves, so there is no reason to duplucate the logic.
    */
    const fallenFruit = (fruit, tree) => {
        let onHouse = 0;
        // does the fruit land between the range of the house
        // if so increment the counter
        for(let f=0; f<fruit.length; f++){
            if((fruit[f]+tree)>=s && (fruit[f]+tree)<=t) onHouse++;
        }
        return onHouse;
    }

    let applesOnHouse = fallenFruit(apples, a);
    let orangesOnHouse = fallenFruit(oranges, b);
    console.log(applesOnHouse + "\n" + orangesOnHouse);
}

function main() {
    const st = readLine().split(' ');

    const s = parseInt(st[0], 10);

    const t = parseInt(st[1], 10);

    const ab = readLine().split(' ');

    const a = parseInt(ab[0], 10);

    const b = parseInt(ab[1], 10);

    const mn = readLine().split(' ');

    const m = parseInt(mn[0], 10);

    const n = parseInt(mn[1], 10);

    const apples = readLine().split(' ').map(applesTemp => parseInt(applesTemp, 10));

    const oranges = readLine().split(' ').map(orangesTemp => parseInt(orangesTemp, 10));

    countApplesAndOranges(s, t, a, b, apples, oranges);
}
