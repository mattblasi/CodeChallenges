/*
Combine sticks/ropes whatever
*/

let combine = (sticks, expected = 0) => {
	// console.time('Combine Sticks');
	if (sticks == undefined || sticks.length < 0) return 'No sticks to combine';

	// array with one item or empty
	if (sticks.length == 0) return sticks[0] == undefined ? 'No sticks to combine' : 0;

	let queue = [ ...sticks.sort((a, b) => a - b) ], // don't mutate the original variable!
		total = 0;

	// run until there is only 1 number left, you will already have your total
	while (queue.length > 1) {
		/*
    grab first two items in array, add them together to get the cost
    add the cost to the running total
    push total back into array
    resort array to get lowest number
    */
		let a1 = queue.shift(),
			a2 = queue.shift(),
			cost = a1 + a2;
		total = total + cost;

		queue.push(cost);
		queue.sort((a, b) => a - b);
	}

	// console.timeEnd('Combine Sticks');
	// console.log('Passed? ', total == expected);
	return total == expected;
};

console.log('a', combine()); // no array provided
console.log('b', combine([])); // empty array provided
console.log('c', combine([ 400 ], 0)); // only one item in array
console.log('d', combine([ 2, 4, 3 ], 14));
console.log('e', combine([ 1, 8, 3, 5 ], 30));
console.log('f', combine([ 20, 4, 8, 2 ], 54));
console.log('g', combine([ 1, 2, 5, 10, 35, 89 ], 224));
console.log('h', combine([ 2, 2, 3, 3 ], 20));
