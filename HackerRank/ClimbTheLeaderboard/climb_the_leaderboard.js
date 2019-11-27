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

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
    let aliceRank = [];
    let scoreCard = [...new Set(scores)]; // new array removing any possible duplicates in the array, may not be necessary
    let index = scoreCard.length-1;

    loop1:
    for (let a=0; a<alice.length; a++){
        /*
        Check the score against the scoreboard. Before looping through the entire list,
        we check to see if you are in first or last place. Then while looping through the
        scores we track the index so that on the next pass we do not need to reun through
        the entire array again to get to where we left off.

        Remember we know that the keader scores will be in decending order, and the scores
        for Alice will be in ascending order.
        */
        if (alice[a] >= scoreCard[0]) {
            aliceRank.push(1);
        } else if (alice[a] < scoreCard[scoreCard.length-1]) {
            aliceRank.push(scoreCard.length + 1);
        } else if (alice[a] == scoreCard[scoreCard.length-1]) {
            aliceRank.push(scoreCard.length);
        } else {
            loop2:
            for (let s=index; s<scoreCard.length; s--) {
                if (scoreCard[s]>alice[a]) {
                    aliceRank.push(s+2);
                    index = s;
                    break loop2; // break just the internal loop to prevent running through the entier array.
                }
            }
        }
    }
    return aliceRank;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
