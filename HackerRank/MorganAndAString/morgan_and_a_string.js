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

// Complete the morganAndString function below.
function morganAndString(a, b) {

    a += 'z';
    b += 'z';

    let final = '';
    let i = 0, j = 0;

    loop1: for (i = 0, j = 0; i < a.length || j < b.length; ) {
        if (a.charAt(i) === 'z') {
            i++;
            break loop1;
        }
        if (b.charAt(j) === 'z') {
            j++;
            break loop1;
        }
        if (a.charAt(i) < b.charAt(j)) {
            // a is lower
            final += a.charAt(i);
            i++;
        } else if (a.charAt(i) > b.charAt(j)) {
            // b is lower
            final += b.charAt(j);
            j++;
        } else {
            // charaters are equal
            if (a.charAt(i) === 'z' || b.charAt(j) === 'z') {
                i++;
                j++;
            }

            let startingI = i,
                startingJ = j,
                prev = '';

            loop2: while (a.charAt(i) === b.charAt(j)) {
                i++;
                j++;

                if (i >= a.length && j >= b.length) {
                    i = startingI;
                    j = startingJ;
                    break loop2;
                } else if (i >= a.length) {
                    prev = b.charAt(startingJ);
                    while (b.charAt(startingJ) <= prev) {
                        final += b.charAt(startingJ);
                        startingI++;
                    }
                    i = startingI;
                    j = startingJ;
                } else if (j > b.length) {
                    prev = a.charAt(startingI);
                    while (a.charAt(startingI) <= prev) {
                        final += a.charAt(startingI);
                        startingI++;
                    }
                    i = startingI;
                    j = startingJ;
                }
            }

            if (a.charAt(i) <= b.charAt(j)) {
                prev = a.charAt(startingI);
                while (a.charAt(startingI) <= prev) {
                    final += a.charAt(startingI);
                    prev = a.charAt(startingI);
                    startingI++;
                }
                i = startingI;
                j = startingJ;
            }

            if (a.charAt(i) > b.charAt(j)) {
                prev = b.charAt(startingJ);
                while (b.charAt(startingJ) <= prev) {
                    final += b.charAt(startingJ);
                    prev = b.charAt(startingJ);
                    startingJ++;
                }
                i = startingI;
                j = startingJ;
            }
        }
    }
    // append remaining string to final answer
    if (i < a.length) {
        final += a.substring(i);
    }
    if (j < b.length) {
        final += b.substring(j);
    }

    return final=final.replace('z','');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const a = readLine();

        const b = readLine();

        let result = morganAndString(a, b);

        ws.write(result + "\n");
    }

    ws.end();
}
