"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// Asynchronous JS:
// - its goal is to basically deal with long running tasks that basically run in the background
// - the most common use case of asychronous JS is to fetch data from remote servers in so called 'AJAX' calls

// Asynchronous JS, AJAX and APIs
// - most frequent use of Asnyc JS is to make AJAX calls to APIs

// Synchronous:
// - most code is synchronous
// - means that it is executed line by line
// - each line of code waits for previous line to finish
// - can create problems if some code takes longer to execute
// - long operations BLOCK code execution, e.g. an alert window

// Asynchronous:
// - Asynchronous code is executed after a task that runs in the 'background' finishes, e.g. a timer with a callback
// - aysnchronous code in non- blocking
// - Execution does not wait for an asynchronous task to finish its work, so the rest of the code can keep running normally
// - callback functions ALONE do not make code asynchronous, e.g. the .map methood for arrays
// - event listeners ALONE do not make code asynchronous..
// - for example, an event listener listening for a click is not doing any work in the background, it's simply waiting for a click to happen

// Asynchrous JS is all about coordinating the behaviour of a program over a period of time

// AJAX:
// - Asynchronous Java Script and Xml
// - allows us to communicate with remote web servers in an asynchronous way
// - with AJAX calls, we can request DATA from web servers dynamically, aka without loading the page
// - lets a client do an http request to a server for some data, the server will then send back a response containing the data requested.. happens asynchronously
// - when we ask a server to send us some data, this server usually has a web API that contains the data that we're asking for - making APIs improtant

// API:
// - Application Programming Interface
// - a piece of software that can be used by another piece of software, in order to allow applications to talk to eachother and exchange information
// - not true just for programming in JS, but in programming in general
// - there may be many APIs in web development

// 'Online' API:
// - Application running on a server, that recieves request for data, and send data back as response
//  - in practise, these are just called APIs or web APIs..
// - note that the term web API is also used for other things
// - we can build our own web APIs, but that requires back-end development e.g. with node.js
// - we can also use 3rd party APIs
