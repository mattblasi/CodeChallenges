/*
Last Stone Weight
https://leetcode.com/problems/last-stone-weight/

We have a collection of rocks, each rock has a positive integer weight.

Each turn, we choose the two heaviest rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

If x == y, both stones are totally destroyed;
If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)
*/

let smash = (stones, expected) => {
	// console.time('Smash');
	// no array provided for stones
	if (stones == undefined || stones.length < 0) return 'No stones to smash';

	// array with one item or empty
	if (stones.length == 0) return stones[0] == undefined ? 'No stones to smash' : stones[0];

	// array has 2 items same size
	if (stones.length == 2 && stones[0] == stones[1]) return 0;

	let queue = [ ...stones.sort((a, b) => b - a) ];

	while (queue.length > 1) {
		let y = queue.shift(),
			x = queue.shift();

		if (x != y) queue.push(y - x);
		queue.sort((a, b) => b - a);
	}

	if (queue.length == 0) return 0 == expected; // you smashed them all

	// console.timeEnd('Smash');
	return queue[0] == expected;
};

console.log('a', smash()); // no array provided
console.log('b', smash([])); // empty array provided
console.log('b', smash([ 2, 2 ], 0)); // 2 stones of same size
console.log('c', smash([ 5 ], 5)); // only one stone, nothing to smash
console.log('d', smash([ 2, 7, 4, 1, 8, 1 ], 1));
console.log('e', smash([ 9, 3, 2, 10 ], 0)); // handle smashing them all
