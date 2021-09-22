1. How long did you spend on the coding assignment? 
	I spent around 5 hours on this assignment. Some time after work on 9/21, and some time during lunch break on 22nd.
	a.What would you add to your solution if you had more time?
	- There are many to add.
	- First, documentation for each function for readability.
	- Off course, need to fix compiling level warnings.
	- Add es-lint to the environment for code styling.
	- Add husky for commit level git hooks.
	- More tests from unit tests on each individual component to the integration test to handle different types of responses(like error, 0 books, query support of different languages) from the server.
	- Make the site looks prettier and more user friendly, like adding a loading cricle while it is trying to querying books, preparing text hint to users while the querying result is not available, basically proper handling given different user inputs.
	- Add caching function for cover images downloded to enhancing rendering speed.
	- I used axe devtool for validating WCAG, due to limit of time I only fixed critical-level voilations, there are still some warning level and moderate level violations, I will fix those.
	- Caching the user selection of sort methodology.

2.	What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
	- Optional Chaining
	```
        author={book.author_name?.toString()}
	```
	- Nullish Coalescing
	```
      	`${publishedDate ?? ''}`}</div>
	```

3.	How would you track down a performance issue in production? Have you ever had to do this?
	- I used to use profiler function on react devtool for track performance issue.
	- Yes, I encountered a perfromance issue while building a slider. The slider should fire a query upon user stop, however due to some bad implementation it fires query contantly. I solved that by adding a de-bouncing function to make sure it has some buffer before sending out queries.
4.	How would you improve the API that you just used?
	- The API documentation really needs more clarification. I spent too much time trying to figure out why there's only 100 docs returned, and how to get more result. Finally I noticed I can make a use of `page` parameter where I found from the network call of the open library website.
	- The API only supports 100 docs returned at a time. This may due to some server side performance consideration, however, a better way can be returning a unique id for each docs, and user can query the details of the book through that.
5.	Please describe yourself using correctly formatted JSON.
	```
	{
	    'name': 'Zihao Fang',
	    'hometown': 'Suzhou',
	    'personalities': ['selfless', 'chill', 'logical', 'strong-curiosity', 'minimal', 'introvert'],
	    'programming_skills':['Javascript', 'Python'],
	    'is_opensource_enthusiastic': true,
	    'hobbies': ['movie', 'gaming']
	}
	```
