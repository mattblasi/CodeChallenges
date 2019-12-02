# Morgan and a String
https://www.hackerrank.com/challenges/morgan-and-a-string/


## Notes
My first attempts in this were not the best, while I was able to pass some of the test cases, I was not able to pass all of them. This came about because of my way of approaching the problem. I was trying to overcomplicate the issue in my head. When I took some time to step back from the problem (thanks to a holiday, and Mandy) I was able to notice this. So I came back and started from the beginning.

The code is fairly simple to follow. First we just check to see if we're at the end of one of the strings and if we are we break out of the loop. Proceeding from there we check to see the simplest of cases, which is the direct one to one comparison of the first characters. The place where I was overcomplicating things was in this next step where we get into how to handle the same character.

My initial attempt had the system iterating through the strings multiple times, and so I was hitting the timeout threshold put on more than half of the test cases. I was able to see that I was passing those cases when I ran them one by one so I knew where the issue had to be. So how did I end up managing this? Well I have a loop that runs through and first finds out where the difference end, and while doing that I am also comparing and adding characters to the final string and the count. This means I'm no longer reading characters more than once. After breaking out of the loop I then go into another one until we get to another matching scenario. At this point the loop just mounces back and forth.

Finally once one string hits it's end, I simply append the remaining characters from the other string to the final response.
