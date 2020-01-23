/*
function int[]/list fun(str haystack, str needle)
haystack = 'aaabcdddbbdddabcdefghi',
needle = 'abc'
*/

let findNeedle = (haystack, needle) => {
    /*
    solution 1
    run through the entire array, for every character that matches
    the first cahracter in the array check to see if it is the string

    Time complexity:
        O(hn); h and n are the size of haystack and needle

    The only thing I don't like is that I am touching items in the array
    more than once, I would like to get to only exploring an element one time
	*/
	console.time('solution 1');
	let startingPoints = []; // array of all indexes where the needle begins

	// If there is no needle, then return an empty array;
	if (!needle.length) return 'There is no needle to find';

	for (let i = 0; i < haystack.length - needle.length + 1; i++) {
		if (haystack[i] === needle[0]) {
			let isMatch = true,
				count = 1;
			/*
            check following items to see if it matches the needle
            as soon as you get to a point of not matching end the check
            no need to check further if you already know it's not a match
            */
			while (isMatch && count < needle.length) {
				if (haystack[i + count] != needle[count]) {
					isMatch = false;
				}
				count++;
			}

			if (isMatch) startingPoints.push(i);
		}
	}
	console.timeEnd('solution 1');
	return startingPoints.length ? startingPoints : 'No Needles Found';
};

let haystack = 'aaabcdddbbdddabcdefghi',
	//haystack = "zzzzzzz",
	needle = 'abc',
	matches = findNeedle(haystack.split(''), needle.split(''));

console.log('matches1', matches);
