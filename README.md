# redux-worker

Experimental webpack setup for client/worker redux stores sharing common chunks.

## Motivation

I have been working on a web-app with pretty complex business logic blocking main process. Most of which is encapsulated in redux middleware.
I wanted to moving some of it into a worker and only auto propagate changes back to a client store via thin transport layer. That is done by dispatching event-actions with required change deltas that then are reduced into client store.

The catch is allowing possible shape differences between the client and the worker store, which excludes possibility of using library like [redux-in-worker](https://www.npmjs.com/package/redux-in-worker), which propagates store deltas keeping both store in synchronized state which is not the case here.

It is also an attempt of setting up typescript dev server running with module type (\*CommonJS) different to one used while compiling client typescript code (ESM).

\*) node 16.x (latest as of right now) doesn't support ESM yet outside of experimental mode.

## Features

[+] build configuration with webpack 5x
[+] client/worker transport wrapper
[+] common sharable chunks reusable by the client and the worker
[+] typescript setup for the client with esm module
[+] example code
[-] typescript setup for the back-end with commonjs module
[-] server created with express.js
[-] server run with ts-node
[-] server auto reload with nodemon
