# TODO

Here are our goals in the exercises today. They're intended to be chances to use what you've learned, not puzzles or enigmas, so if it's not clear what to do ask me!

## TypeScript

All TypeScript work should be written in angular-2-exercise/typescript-exercise.

Run `npm run exercise` to start an interactive session. Each change you make to a TypeScript file will recompile your code and run the `exercise` module.

Write lots of `console.log()`s messages to yourself to test your understanding.

1. typescript-vars 
	1. in: exercises/typescript.ts
	1. define a const as a number, and assign it a string literal. What happens?
	1. define a const as an array of numbers, and assign it an empty array
		1. then assign it an array of strings
	1. define an object type with some properties. Create some vars with that type. Try and trick the compiler
	1. define some functions with:
		1. typed params
		1. typed return types
1. import-export
	1. in: exercises/typescript.ts and exercise/module.ts
	1. import `Greeter` from module - what compiler errors do you get?
	1. define a `Greeter` class in module.ts
	1. try out a few more import/exports
1. classes
	1. in: exercises/typescript.ts and exercise/module.ts
	1. in module.ts, define a Header class, with 2 public properties
	1. import into typescript.ts, and create an instance
	1. how does the type checking feel? is it good at inferring things?
	1. define some private properties, and try to access them elsewhere

## Angular 2

All Angular 2 work should be written in angular-2-exercise/app.

Run `npm start` to:

1. compile your code in `/app` on change
1. open a browser to a live-reloading page
1. if you don't see what you expect, right click and click 'Inspect'. Then open the console tab

1. hello-angular
	1. creating our first component
		1. define our first component - `App` in `app/App.component.ts`
		1. telling Angular it's a component
			1. use the `@Component` decorator to make it select `<app></app>` tags
			1. give it a simple `template` so you can see it has worked
	1. booting the application with our component
		1. our component will be the root of the application's component tree
		1. our `main.ts` - this will be responsible for starting the app
		1. import the `bootstrap` method - it's in `angular2/platform/browser`
		1. import our `App` component
		1. call `bootstrap` with `App` to boot up the application
		1. You should see the HTML from your template
		1. Inspect the page - look for the `<app>` tag, it should have your HTML
1. template-powers
	1. use this ([cheatsheet](https://angular.io/docs/ts/latest/cheatsheet.html)) for reference - there's lots of syntax!
	1. displaying data
		1. we want to display some data in our template
		1. define a `constructor` for your `App` component
		1. assign a string property with a name of your choice
		1. use the interpolation syntax to display it in the template 
		1. also try out the interpolation syntax out with the `title=` attribute of an element. Hover over it to see the browser title popup - does the interpolation work?
	1. configuring elements from data
		1. we want to use Angular to change the color of an element, controlled by a property
		1. define a property holding an HTML colour string
		1. use the attribute syntax to bind that to the `color` style attribute of an element in your `App` template
	1. responding to user input
		1. we want to define a + and - button that makes an element's text size grow and shrink
		1. define a `fontSize` attribute on `App`
		1. bind it to the `font-size` style property of an element 
		1. define a `changeTextSize(delta: number)` method on `App`
		1. create two `<button>` elements, one with a `+` and one `-`
		1. use event listener syntax to listen to click events, with positive and negative deltas
1. component-tree
	1. we want to make a component that'll control the display of a dataset
	1. define a new component called `ChartControl`, which binds to `<chart-control>` elements
	1. add in an `input type=range` in its template, and some text
	1. add `<chart-control>` into the template of `App`
	1. what happens? Think about why
	1. we need to inform Angular we're using a custom component.
	1. import `ChartControl` into `App`
	1. create a `directives` array in `App`'s component definition, and place `ChartControl` in that array
	1. you should now see your `ChartControl` component
1. input-output
	1. passing in values
		1. in `App`, define a `maxAge` property and assign `24 * 60 * 60 * 1000` to it
		1. using template syntax, pass in `maxAge` to the `ChartControl`
		1. you should see Angular complain that `maxAge` is not a "known native property"
		1. why? we'll fix this in the next step
	1. having our component accept input
		1. we need to tell Angular our `chart-control` component has an input for that type
		1. in `ChartControl`, define an input called `maxAge`. Type it as a `number`
		1. we'd like to see the value of our input for debugging
		1. add a `ngOnChanges(changes)` method, and `console.log(changes)`
		1. bind the `maxAge` property to the range's `max=` attribute. It should set itself on load
	1. listening to output
		1. we want to listen to `filtered` events from `ChartControl` in `App`, and handle them
		1. listen to a `filtered` event on the `chart-control` element in `App`, handling it and passing the `$event` variable into a new `App` method called `setFilter`
		1. you should see Angular complain that `filtered` is not a "known native property"
		1. why?
		1. we need to tell Angular we're emitting `filtered` events
		1. in `ChartControl`, define an output called `filtered`. It's an `EventEmitter`. Use the [cheatsheet](https://angular.io/docs/ts/latest/cheatsheet.html) to remind yourself how
		1. define `setFilter` as a simple console logger - we'll get it to fire later
	1. firing events
		1. we want to fire `filtered` events each time the user configures our `ChartControl` via our `maxAge` slider
		1. we need to store the state of our filter - define a `filter` propert and initialize it with `maxAge: 0`
		1. listen to the `change` event of our `input` in `ChartControl`. handling it with a `setMaxAge(maxAgeInput.value)`. You'll want to define a local variable `maxAgeInput` - use the cheat sheet
		1. in `setMaxAge(age: number)`, call `updateFilter({ maxAge: age })`
		1. define `updateFilter(changes)` as a method that
			1. uses [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to copy the current filter state, update it with changes, and reassign it to `filter`
			1. then uses `emit` on our `filtered` output, passing the new filter as the event
		1. when you move the maxAge slider, you should see your `setFilter` handler in `App` fire
1. http
	1. creating a service to load reddit data
		1. define a `Reddit.service` class, with a `frontpage` method
		1. import and ask for `Http` in the constructor and define it as a property
		1. import your new service into App, and ask for an instance of it in the constructor
		1. you should get an error - Angular doesn't know how to inject `Reddit` yet!
		1. to do this we need to do 2 things
			1. tell Angular how to inject Reddit - import and use `@Injectable()` on `Reddit`
			1. give Angular a provider for Reddit. In `App` define a `providers:` array on the `@Component`, and import and pass in `Reddit`
		1. you should now have a `reddit` property in `App`
	1. loading data
		1. we want to implement `frontpage` in `Reddit`
		1. make a get request to `https://www.reddit.com/.json` (yes the suffix looks weird - try it out in the browser)
		1. use `toPromise()` on the result
		1. log out the response via `.then((resp) => console.log(resp.json()))`
		1. we need to return a transformed version of the response, with just the interesting data
		1. in the `.then()` handler, use `.map` to get just the `.data` properties of the story data, and return it from `.then`
	1. triggering our load
		1. in `App`, assign `this.stories` to the result of calling `reddit.frontpage`
		
	1. using `*ngFor`
		1. I will take you through this step 
1. routing
	1. routing has a lot of moving parts, so I'll take you through this
1. d3
	1. our final challenge!
	1. define a `Chart` service
		1. import d3
		1. define a `render()` method, accepting an options object with `data` and `el`
		1. write some d3 code to simply draw a circle per data item
	1. define a `Chart` component
		1. import the `Chart` service
		1. make its template a single svg node
		1. use `ElementRef` to get a reference to the root node
		1. call `render()` and ensure we see some data
			1. `data: ` as with some dummy data (e.g [1,2,3])
			1. `el: ` as our elementRef, `.nativeElement.querySelector("svg")`
		1. define an `@Input()` to accept our `data` once we've loaded it
		1. replace your stubbed call with a call inside an `ngOnChanges` callback, passing in our `data` input
		1. now, once we change `.data`, we should see a rendered chart!
	1. pass data into `Chart`
		1. import `Chart` into `App`
		1. place it in the template
		1. let's test our data input
			1. assign a `.data` property, with stubbed data again
			1. pass it into the `data` input of our `Chart`
			1. ensure our `Chart` renders correct
		1. let's pass in real data
			1. in the `App` handler for our Reddit request, reassign the `.data` property
			1. we should see circles appear for each story!
	1. let's create a nice looking chart!
	
