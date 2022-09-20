# RxjsDemo

This project was generated for demonstrating RxJS features on a real world application.

## Installation

1. Go to the target directory in terminal `$ cd rxjs-demo` 
2. Install necessary packages using `$ npm i` 
3. Run development server using `$ ng serve`  
4. Run fake backend service using `$ npx json-server --watch db.json` 
5. Go to demo project from a browser `http://localhost:4200/demo`


## Expectations

1. Please refactor author service and profile component from procedural approach to reactive approach. </br> </br>
`Hint: While refactoring profile component higher order mapping operators might be useful to go from route to regarding request.` 

2. There is also a bug, post owners can not be seen please consider it while refactoring the author service.  

The expected look of the page can be seen below.

![alt text](/img/expected.png)

## Optional Tasks

1. Add error catching using the operators catchError and throwError.
2. Do researchs on shareReplay() operator and use it for caching http responses.
3. Change currentUser subject from replaySubject to behaviorSubject.


