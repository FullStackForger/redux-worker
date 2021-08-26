# redux-worker

Experimental webpack setup for client/worker redux stores sharing common chunks.

## Motivation

Working on a redux web-app with pretty complex business encapsulated in middleware or complex reducers (code smell) can often lead to blocking of the main process. It can be mitigated by moving expensive computation into the web-worker (or shared worker), running copy of the store and auto propagating changes back to a client store via thin transport layer.

There are existing tools like [redux-in-worker](https://www.npmjs.com/package/redux-in-worker) allowing store synchronization between with update deltas.
While it has been design for redux it was also design for synching identical stores.

Alternatively, there is [neomjs](https://github.com/neomjs/neo) - framework for creating multi-process apps with use of modern ES modules (.mjs) and while it tackles a lot of complexities it for a bit different purpose.

Splitting application into different layers ([n-tier](https://en.wikipedia.org/wiki/Multitier_architecture) architecture) is not a new concept. Layers can share the shape of the data which improves code reusability and potentially reduces overall size of the final bundle. However, enforcing same state on all of the layers might not be the best idea.

That's where redux as a predictable state container comes to play. Described architecture is easily achievable with use of reducers and transport actions used to synchronize state between different layers. Such actions could carry change deltas as their payload which then can be simply reduced into appropriate store during action consumption.

## Features

[+] build configuration with webpack 5x
[+] client/worker transport wrapper
[+] common sharable chunks reusable by the client and the worker
[+] chunks are grouped into app, app-worker, vendor, shared
[+] typescript setup for the client with esm module
[+] utilizing webpack-dll plugin for improved performance
[-] redux devtools plugin for ease of debugging
