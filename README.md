# redux-worker

Experimental webpack setup with code splitting for client/worker redux stores with shared state.

## Motivation

Working on a redux web-app with pretty complex business encapsulated in middleware or complex reducers (code smell) can lead to unwanted blocking of the main process. It can be mitigated by moving expensive computation into web-worker (or shared worker).

There are existing tools like [redux-in-worker](https://www.npmjs.com/package/redux-in-worker) allowing store synchronization with update deltas.
While it has been design for redux it was also design for synching identical stores on different processes.  It requires running identical copy of the store and auto propagating changes back to a client with use of worker messaging API. Deltas are calculated on the worker per store update and then applied as patches into the main store.

Splitting application into different layers ([n-tier](https://en.wikipedia.org/wiki/Multitier_architecture) architecture) is not a new concept. Layers can share data shape, which improves code reusability and potentially reduces the size of the final bundle. However, enforcing state to be the same on all of the layers might not be the best idea.

That's where redux as a predictable state container comes to play. Described architecture is easily achievable with use of reducers and *transport actions* used to synchronize state between stores. Actions carry change deltas as their payload which then can be reduced into store on a given layer during regular action consumption.

Code in this repository is a proof of concept exercising just that.

## Features

- [x] build configuration with webpack 5x
- [x] client/worker transport wrapper
- [x] common sharable chunks reusable by the client and the worker
- [x] chunks are grouped into app, app-worker, vendor, shared
- [x] typescript setup for the client with esm module
- [x] utilizing webpack-dll plugin for improved performance
- [ ] redux devtools plugin for ease of debugging

## References
- [neomjs](https://github.com/neomjs/neo) - framework for creating multi-process apps with use of modern ES modules (.mjs).
