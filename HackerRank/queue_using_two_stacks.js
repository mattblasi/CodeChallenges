/*
Queue Using Two Stacks Javascript Solution
https://www.hackerrank.com/challenges/queue-using-two-stacks/problem
*/

function processData(input) {
    //Enter your code here
    const arr = input.split('\n');
    const numQueries = parseInt(arr[0]);
    const inStack = [];
    const outStack = [];

    function stackToQueue() {
        if (!outStack.length) {
        while (inStack.length) {
            outStack.push(inStack.pop());
        }
        }
    }

    for (let i = 1; i <= numQueries; i++) {
        let entry = arr[i].trim().split(' ');

        switch (entry[0]) {
        case '1':
            //enqueue
            inStack.push(entry[1]);
            break;
        case '2':
            //dequeue
            stackToQueue();
            outStack.pop();
            break;
        case '3':
            //print from front of queue
            stackToQueue();
            console.log(outStack[outStack.length - 1]);
            break;
        default:
            break;
        }
    }
    
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
