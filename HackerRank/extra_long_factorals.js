/*
Extra Long Factorals
https://www.hackerrank.com/challenges/extra-long-factorials/
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

// Complete the extraLongFactorials function below.
function extraLongFactorials(n) {
    let fact=1;

    for (let a=2; a<=n; a++){

        if(Number.isSafeInteger(fact*a)){
            fact*=a;
        } else {
            /*
            too large for simple math, so instead I store it in strings. also instead of
            doing fact*factoral I resort to addition.
            10*10 = 10+10+10+10+10+10+10+10+10+10

            this minimized the loops I was running through because even when you do the
            multiplying on larger numbers, they still become too large and you resort to the
            same method of addition to add them together. the additional loops for multiplying
            and then adding resulted in timeouts for half of the test cases.
            */
            let factPlus = "0";  // holds the added factorals together
            for(let b=0; b<a; b++){
                let str1=(factPlus.length > fact.toString().length) ? factPlus : fact.toString(),
                    str2=(factPlus === str1) ? fact.toString() : factPlus,
                    sum='';

                let carry = 0; // number that is carried to next decimal place, initially zero.
                let strA, strB, strT, sSum; // strings to hold the individual numbers
                for (let c=0; c<str1.length; c++) {
                    // get the far right character/number of each string (or 0 if there is no number)
                    strA = parseInt(str1.charAt(str1.length - 1 - c));
                    strB = parseInt(str2.charAt(str2.length - 1 - c)) || 0;
                    // add the numbers along with the carry over from the previous run
                    strT = (carry + strA + strB).toString(); 
                    /*
                    anything over 9 gets carried over leaving the single digit
                    for the sum, and the carry for the next run. carry over is
                    set to 0 if there is none
                    */
                    sSum = strT.charAt(strT.length - 1);
                    carry = parseInt(strT.substring(0, strT.length - 1)) || 0;
                    sum = c === str1.length - 1 ? strT + sum : sSum + sum;
                }
                factPlus = sum;
            }
            fact = factPlus; // update value of fact before continuing the loop.
        }
    }

    console.log(fact);
    //return fact;
}

function main() {
    const n = parseInt(readLine(), 10);

    extraLongFactorials(n);
}
