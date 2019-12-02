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

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
    /*
    - n: an integer, the number of rows and columns in the board
    - k: an integer, the number of obstacles on the board
    - r_q: integer, the row number of the queen's position
    - c_q: integer, the column number of the queen's position
    - obstacles: a two dimensional array of integers where each 
    element is an array of 2 integers, the row and column of an obstacle
    */

    // board isn't big enough for attacks
    if (n <= 1) return 0;

    // if no obstacles
    if (k === 0) {
        // horizontal and vertical will always be (n-1);
        let hvAtt = (n - 1) * 2; 
        let diAtt = 0;
        if (r_q === n || r_q === 0 || c_q === n || c_q === 0) {
            // queen is in along the edge
            diAtt = n - 1;
        } else {
            // queen is somewhere in the middle
            diAtt =
                Math.min(n-c_q, r_q-1) +
                Math.min(n-c_q, n-r_q) +
                Math.min(c_q-1, r_q-1) +
                Math.min(c_q-1, n-r_q);
        }
        return diAtt + hvAtt;
    } else {
        // find the closest obstacle in each direction
        let cr = n - c_q,   
                cl = c_q - 1,
                ru = n - r_q,
                rd = r_q - 1;

        let oB=-1,
                oT=-1,
                oR=-1,
                oL=-1,
                oTL=-1,
                oTR=-1,
                oBL=-1,
                oBR=-1;

        for(let o=0; o<k; o++){
            // left
            if(obstacles[o][0]===r_q && obstacles[o][1]<c_q){
                if(obstacles[o][1]>oL || oL===-1) oL=obstacles[o][1];
            }

            // top left
            if((c_q-obstacles[o][1]===obstacles[o][0]-r_q) && obstacles[o][1]<c_q && obstacles[o][0]>r_q) {
                if(obstacles[o][1]>oTL || oTL===-1) oTL=obstacles[o][1];
            }

            // top
            if(obstacles[o][1]===c_q && obstacles[o][0]>r_q){
                if(obstacles[o][0]<oT || oT===-1) oT=obstacles[o][0];
            }

            // top right
            if((obstacles[o][1]-c_q===obstacles[o][0]-r_q) && obstacles[o][1]>c_q && obstacles[o][0]>r_q) {
                if(obstacles[o][1]<oTR || oTR===-1) oTR=obstacles[o][1];
            }

            // right
            if(obstacles[o][0]===r_q && obstacles[o][1]>c_q){
                if(obstacles[o][1]<oR || oR===-1) oR=obstacles[o][1];
            }

            // bottom right
            if((r_q-obstacles[o][0]===obstacles[o][1]-c_q) && obstacles[o][1]>c_q && obstacles[o][0]<r_q ){
                if(obstacles[o][1]<oBR || oBR===-1) oBR=obstacles[o][1];
            }

            // bottom
            if(obstacles[o][1]===c_q && obstacles[o][0]<r_q){
                if(obstacles[o][0]>oB || oB===-1) oB=obstacles[o][0];
            }

            // bottom left
            if((r_q-obstacles[o][0]===c_q-obstacles[o][1]) && obstacles[o][1]<c_q && obstacles[o][0]<r_q ){
                if(obstacles[o][1]>oBL || oBL===-1) oBL=obstacles[o][1];
            }

        }

        // available attacks
        let b = (oB != -1) ? r_q - oB - 1 : r_q - 1,
                t = (oT != -1) ? oT - r_q - 1 : n - r_q,
                r = (oR != -1) ? oR - c_q - 1 : n - c_q,
                l = (oL != -1) ? c_q - oL - 1 : c_q - 1;

        let tr = (oTR != -1) ? oTR - c_q - 1 : Math.min(n-c_q, n-r_q),
                tl = (oTL != -1) ? c_q - oTL - 1 : Math.min(c_q-1, n-r_q),
                br = (oBR != -1) ? oBR - c_q - 1 : Math.min(n-c_q, r_q-1),
                bl = (oBL != -1) ? c_q - oBL - 1 : Math.min(c_q-1, r_q-1);

        return b + t + r + l + tr + tl + br + bl;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const r_qC_q = readLine().split(' ');

    const r_q = parseInt(r_qC_q[0], 10);

    const c_q = parseInt(r_qC_q[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    let result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + "\n");

    ws.end();
}
