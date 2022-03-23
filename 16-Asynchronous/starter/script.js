'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////

// Creating a function that generates a card to our page with the information of the country that we specify
const getCountryData = function (country) {
  // Old-school: XML http request function:
  const request = new XMLHttpRequest();
  // Sending a GET request, seems like you have to set this up first
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

  // Sending request, fetches data in the background, emits a load event when finished:
  request.send();
  // Using an event listener to listen for the load event emitted by the Send request:
  request.addEventListener('load', function () {
    console.log(this.responseText);
    // Turning JSON into an OBJECT:
    const [data] = JSON.parse(this.responseText);
    // Console logging the new object, makes it easier to look at the structure:
    console.log(data);

    // Creating some content using the newly received data:
    const html = `
    <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
    <h3 class="country__name">${data.name.official}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}m people</p>
      <p class="country__row"><span>🗣️</span>${
        Object.entries(data.languages)[0][1]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.entries(data.currencies)[0][1].name
      }</p>
      </div>
      </article>
      `;

    console.log(html);
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// These AJAX calls all happen at the same time:
// - these AJAX calls are all fired immediately
// - note that these AJAX calls all get fired way before the AJAX calls are complete
// - requests may not arrive at the same time, might fire one before the other
// - this means that returning data actually comes back in a random order, making it sometimes appear in a different order on the page
// - if we wanted a predefined order, we would have to chain the requests
// - this means making the second request only after the first request is finished
getCountryData('portugal');
getCountryData('tanzania');
getCountryData('canada');

// https://restcountries.com/v3.1/name/{name}

// Old-school: XML http request function:
// ======================================
// - use the new keyword followed by the function and store it in a variable
// - use the 'open' method and pass the type of request we want as the first arg, and the URL we want to request from as the second arg
// - on github's public API lists, you can see a list of API's available
// - they also specify if 'Auth' , HTTPS, and CORS are enabled?
// - it's really important for 'CORS' aka 'Cross Origin Resource Sharing' to be enabled, without it - we can't access a 3rd party API from our own code

// Sending request, fetches data in the background:
// - after we send our "GET" request, we now have to request a "SEND" so that we can receive the data - once finished, a load event is emitted
// - this process takes long and runs in the background, so we can't just store the result in a variable, because that line of code would execute before the request even finished

// Using an event listener to listen for the load event emitted by the Send request:
// - instead, we listen for the load event and run a callback function once it happens
// - we are sent back a JSON string which is saved into one of the request object's properties
// - we can look at the data by accessing the request objects '.responseText' property
// - what we get in return is a JSON formatted string containing the information we requested
// - we just have to turn this result into an object now|

// Turning JSON into an OBJECT:
// - we do this by passing the JSON string into the 'JSON.parse' method
// - in this case, this returns an array of one index containing the new object - this is because of how the JSON was formatted, we can simply destructure this

//////////////////////////////////////////////////

// Asynchronous JS:
// - its goal is to deal with long running tasks that basically run in the background
// - the most common use case of asynchronous JS is to fetch data from remote servers in so called 'AJAX' calls

// Asynchronous JS, AJAX and APIs
// - most frequent use of Asynchronous JS is to make AJAX calls to APIs

// Synchronous:
// - most code is synchronous
// - means that it is executed line by line
// - each line of code waits for previous line to finish
// - can create problems if some code takes longer to execute
// - long operations BLOCK code execution, e.g. an alert window

// Asynchronous:
// - Asynchronous code is executed after a task that runs in the 'background' finishes, e.g. a timer with a callback
// - asynchronous code in non- blocking
// - Execution does not wait for an asynchronous task to finish its work, so the rest of the code can keep running normally
// - callback functions ALONE do not make code asynchronous, e.g. the .map method for arrays
// - event listeners ALONE do not make code asynchronous..
// - for example, an event listener listening for a click is not doing any work in the background, it's simply waiting for a click to happen

// Asynchronous JS is all about coordinating the behavior of a program over a period of time

// AJAX:
// - Asynchronous Java Script And Xml
// - allows us to communicate with remote web servers in an asynchronous way
// - with AJAX calls, we can request DATA from web servers dynamically, aka without loading the page
// - lets a client do an http request to a server for some data, the server will then send back a response containing the data requested.. happens asynchronously
// - when we ask a server to send us some data, this server usually has a web API that contains the data that we're asking for - making APIs important

// API:
// - Application Programming Interface
// - a piece of software that can be used by another piece of software, in order to allow applications to talk to each other and exchange information
// - not true just for programming in JS, but in programming in general
// - there may be many APIs in web development

// 'Online' API:
// - Application running on a server, that receives request for data, and send data back as response
// - in practice, these are just called APIs or web APIs..
// - note that the term web API is also used for other things
// - we can build our own web APIs, but that requires back-end development e.g. with node.js
// - we can also use 3rd party APIs

// XML:
// - a data format that used to be widely used to transmit data on the web
// - these days basically no API uses XML anymore
// - the term AJAX is a very popular term that got famous back in the day, and is still used today
// - the 'x' in AJAX stands for XML, even though no one really uses XML anymore
// - instead, most API's these days use the JSON format
// - JSON is the most popular object these days because it's basically just a JS object, but converted to a string
// - this makes it very easy to send across the web, and also to use in JS once it arrives

// Alternate URLS for this section:
// https://restcountries.com/v2/
// https://restcountries.com/v3.1/

//////////////////////////////////////////////////
