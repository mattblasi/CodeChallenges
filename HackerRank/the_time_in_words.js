/*
The Time in Words
https://www.hackerrank.com/challenges/the-time-in-words/problem
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

// Complete the timeInWords function below.
function timeInWords(h, m) {
    // make sure they are integers as inputs makes for easier more reliable comparisons
    let hours = parseInt(h),
        min = parseInt(m);

    /*
    Build and array of all possibilities for hours, there are only twelve
    determine which to use by getting the place in the array
    remember arrays are zero based!
    */
    let hourText = [
        "one","two","three","four","five","six",
        "seven","eight","nine","ten","eleven","twelve"];
    let hourString = (min <= 30) ? hourText[hours-1] : hourText[hours];

    /*
    Build an array of all the possiblities for minutes. There are only 31 because the
    second half of the hour changes to from count from the current hour, to counting up
    to the next hour.
    */
    let minText = [
        "o' clock","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve",
        "thirteen","fourteen","quarter","sixteen","seventeen","eighteen","nineteen","twenty","twenty one",
        "twenty two","twenty three","twenty four","twenty five","twenty six","twenty seven","twenty eight",
        "twenty nine","half"];
    let minString = (min <= 30) ? minText[min] : minText[60-min];

    // set remaining part of the string based on the min and if it's top or bottom of the hour
    if (min !== 15 && min !== 30 && min !== 45 && min !== 0 && min !== 1) minString += " minutes";
    if (min == 1) minString += " minute";
    if (min <= 30 && min !== 0) minString += " past";
    if (min > 30) minString += " to";

    // return string changes order for solid hour
    return (min === 0) ? hourString + " " + minString : minString + " " + hourString;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine(), 10);

    const m = parseInt(readLine(), 10);

    let result = timeInWords(h, m);

    ws.write(result + "\n");

    ws.end();
}
