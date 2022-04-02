'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  // Creating some content using the newly received data:
  const html = `
      <article class="country ${className}">
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
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong..') {
  // Returning the result of the chain
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
//////////////////////////////////////////////////
/*

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
    // Data that is sent back:
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
// - note that these AJAX calls all finish firing way before any of the AJAX calls are complete
// - requests may not arrive at the same time, might fire one before the other
// - this means that returning data actually comes back in a random order, making it sometimes appear in a different order on the page
// - if we wanted a predefined order, we would have to chain the requests
// - this means making the second request only after the first request is finished
// - these functions are basically running in parallel
// - we cannot control which one finishes first
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
// - this process takes long and runs in the background, so we can't just store the result in a variable, because that line of code would execute before the request even finished - making the value stored undefined?

// Using an event listener to listen for the load event emitted by the Send request:
// - instead, we listen for the load event and run a callback function once it happens
// - we are sent back a JSON string which is saved into one of the request object's properties
// - we can look at the data by accessing the request objects '.responseText' property
// - what we get in return is a JSON formatted string containing the information we requested
// - we just have to turn this result into an object now

// Turning JSON into an OBJECT:
// - we do this by passing the JSON string into the 'JSON.parse' method
// - in this case, this returns an array of one index containing the new object
// - this is because of how the JSON was formatted, we can simply destructure this
// - by doing so, we will be dealing with a single obeject with all the data sent back from the request

*/
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
// - asynchronous code is non- blocking
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

// How the Web Works: Requests and Responses:
// - whenever we try to access a web server, the browser - which is the client, sends a request to the server
// - the server will then send  back a response
// - this response contains the data or the web page that we requested
// - this process works the exact same way, no matter if we are accessing an entire webpage, or just some data from a web API
// - this whole process is called the "Reequest-response model" or the "Client-server architecture"

// URLs:
// Example: https://restcountries.com/v3.1/name/${country}

// - Every URL gets an 'http' or an 'https', which is for the protocol that will be used on this connection
// then, we have the 'domain name', which is 'restcountries.com' in this case
// then also, after a backslash, we have the so called 'resource' that we want to access, which is '/v3.1/name/${country}' in this case

// - now, the shown domain name in the Example url is actually NOT real the address of the server
// - it's really just a nice name that is easy for us to memorize
// - what this means is that we a need a way of converting the domain name to the real address of the server
// - this happens through a so called 'DNS', which stands for 'Domain Name Server'
// - DNS are a special kind of server - they are basically like the phone books of the internet

// - The first step that happens when we access any web server:
// - the browser makes a request to a DNS
// - this special server will then simply match the web address of the url to the servers REAL IP address
// - this all happens through your internet service provider
// - after the IP address has been sent back to the browser, we can finally call it

// IP:
// Example: https://104.17.142.889.443
// - this is what the real address looks like
// - it still has the protocol in the beginning (http/https)
// - then comes the IP address
// - the last numbers are the port that we access on the server (443)

// - this port number is really just to identify a specific service that is running on a server
// - so you can think of it like a sub address
// - the default '443' for HTTPS, 80 for HTTP
// - the port number has nothing to do with the resource part of the URL that we want to access

// - one we have the real IP address, a TCP (TCP/IP ?) socket connection is established between the browser and the server - meaning they are now connected
// - this connection is typically kept alive for the entire time that it takes to transfer all files of the website or all data

// TCP: the transmission control protocol
// IP: the internet protocol
// - together, they are communication protocols that define exactly how data travels across the web
// - they are basically the internets fundamental control system
// - this is because they are the ones that set the rules on how data moves on the internet

// - now its time to finalLy make our request
// - the request we make is a http protocol
// - http stands for 'hyper text transfer protocol'
// - after tcp/ip, http is another communication protocol
// - a communication protocol is simply a system of rules that allows two or more parties to communicate
// - in the case of 'http', it's just a protocol that allows that allows clients and web servers to communicate
// - this works by sending request and response messages from clients to server an back

// LOOK AT VIDEO TO SEE EXAMPLE OF AN HTTP REQUEST
// - the beginning of an http request is called a 'start line', which contains the http method that is used in the request, then the request target, and also the http version
// - there are many http methods available - but the most important ones are GET, POST, PUT and PATCH
// - GET simply requests data
// - POST sends data
// - PUT and PATCH basically modifies data

// - the request target is where the server is told that we want to access the specified resource (from the URL)
// - if the target is empty, we would just be accessing the websites root

// - the next part of the request are the request headers (many different possibilities)
// - which is just some information that we send about the request itself
// - there are tons of standard different headers

// - in the case that we are sending data to a server, there will also be a request body
// - this body will contain the data that we are sending, for example, coming from an HTML form

// - Now of course, it's not us developer who manually write these http requests
// - it's still helpful and valuable to understand what an http request and also a response look like

// - the main difference between http, and https is that https is encrypted using TLS or SSL - which are yet some more protocols
// - besides that, the logic behind http requests and responses still apply to https

// - so once our request is formed, it then hits the server - which will then be working on it until it has our data or webpage ready to send back
// - once it's ready, it will send it back using an http response
// - the http response message actually looks quite similar to the request (video)
// - it also contains a startline, headers and a body
// - the startline of a response message has a version, a status code and a status message
// - these are used to let the client know whether the request has been successful or failed, e.g. 200 means OK... or 404 Page not found
// - the response headers are information about the response itself, many possiblities, in fact, we can actually make up our own
// - the last part of the response is again the body, which is present in most responses
// - this body usually contains the JSON data coming back from an API or the HTML of the webpage we requested.. or something similar

// - an API only requires one request, a website might require many
// - this is because for a website, the first request will return an HTML address, which contains the information on all the assets that it needs
// - these assets being: JavaScript files, CSS files, Images, and other assets
// - this information is scanned by the browser
// - for each different file, there will be a new http request made to the server
// - there can be multiple requests happening at the same time, but the amount is still limited - otherwise the connection would start to slow down
// - when all the files have finaly arrived, then the webpage can be rendered in the browser according to the HTML, CSS JavaScript Specifications that we already know

// TCP/IP:
// - the communtication protocols that define how data travels accross the web
// - the job of TCP is to break the requests and responses down into thousands of small chunks called 'packets' before they are sent
// - once these small packets arrive at their final destination, TCP will reassemble all the packets into the original request or response
// - this is necessary so that each packet can take a different route through the internet
// - this way, the message arrives at the destination as quick as possible, which would not be possible if we sent the entire data simply as a big chunk

// - the job of the IP protocol is to actually send and route these packets through the internet
// - it ensures that they arrive at the destination they should go by using IP addresses on each packet

/////////////////////////////////////////
/*

// Welcome to Callback Hell

const renderCountry = function (data, className = '') {
  // Creating some content using the newly received data:
  const html = `
      <article class="country ${className}">
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
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// Creating a function that generates a card to our page with the information of the country that we specify
const getCountryAndNeighbor = function (country) {
  // Ajax call country1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // Using an event listener to listen for the load event emitted by the Send request:
  request.addEventListener('load', function () {
    // Data that is sent back:
    console.log(this.responseText);
    // Turning JSON into an OBJECT:
    const [data] = JSON.parse(this.responseText);
    // Console logging the new object, makes it easier to look at the structure:
    console.log(data);

    // Render Country 1
    renderCountry(data);

    // Get neighbor CountryL Happens after Country 1 completes:
    // - in other words, it depends on the first country to finish loading before it can start
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // Ajax call country2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // - note that we are now using the country code instead of the country name
      // - this means that we are getting data from a different URL
      // - we have to check that we are still receiving information in the same format and not assume that it is the same
      // - in this case, it is - but if for some reason the creator of this API made it so you received only an object for codes, we not have to destructure the JSON object...
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbor('Usa');

// - Here we have nested call backs
// -If we wanted to keep getting neighbouring countries, we would have to keep nesting call-backs
// - We have a name for these type of situations, it's called "Call-Back Hell"

// - Call-back Hell is when we have a lot of nested call-backs in order to execute asynchronous tasks in sequence
// - this happens to all asynchronous tasks which are handled by call-backs, and not just AJAX calls

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// - this triangular shape caused by indentation is a clear indication of call-back hell
// - makes our code really messy
// - makes our code very hard to understand and reason about
// - this means our code will have more bugs and is just generally worse code

// - fortunately for us, since ES6, there is a way of escaping call-back hell by using something called 'promises'

*/
/////////////////////////////////////////
/*

// Promises and the Fetch API

// // Old-school: XML http request function:
// const request = new XMLHttpRequest();
// // Sending a GET request, seems like you have to set this up first
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// // Sending request, fetches data in the background, emits a load event when finished:
// request.send();

// Modern AJAX calls:
// ==================

// Using the fetch function:
const request = fetch(`https://restcountries.com/v3.1/name/${'canada'}`);
// Promise is returned from the fetch function:
console.log(request);

// Modern AJAX calls:
// ==================

// Using the fetch function:
// - there are actually more options that we can specify if we'd like
// - these are for more complex AJAX calls, which can take an object of options
// - for a simple GET request like this one, all we really need is to pass in the URL

// Promise is returned from the fetch function:
// - so we started the request, stored the result into a variable and logged that variable to the console
// - we immediately got the promise, which is store in the request variable

// What is a Promise?
// ==================
// - an object that is used as a placeholder for the future result of an asynchronous operation
// - its like a container for an asynchronously delivered value
// - less formal, a container for a future value, for example, a response coming from an AJAX call

// - when we start the AJAX call, there is no value yet, but we know there will be some value in the future
// - we can use a promise to handle this future value
// - the advantage of promises is that we no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results
// - we can also chain promises for a sequence of asynchronous operations
// - this means no more nesting callbacks.. no more callback hell!

// - since promises work with asynchronous operations, they are time sensitive.. they change over time
// - this means that promises can be in different states
// - this is what we call the lifecycle of a promise

// Pending:
// - at the start, we say that a promise is 'pending'
// - this is before any value resulting from the asynchronous task is available
// - during this time, the asynchronous task is still doing its work in the background

// Settled:
// - then, once the asynchronous task has finished, we say that the promise has 'settled'
// - there are two different types of settled promises: fulfilled promises and rejected promises
// - fulfilled: a promise that has successfully resulted in a value, as we expected
// - rejected: there has been an error during the asynchronous task

// - we are able to handle these different states in our code
// - we can use them to do something as a result of either a successful promise or a rejected one

// - another important thing about promises is that a promise is only settled once
// - from there, the state will remain unchanged forever
// - it's either fulfilled or rejected, but its impossible to change that state

// Consume:
// - these states are relevant and useful when we use a promise to get a result, which is called to consume a promise
// - we consume a promise when we already have a promise, e.g. a promise returned from a fetch function
// - in order for a promise to exist in the first place, it must first be built
// - in the case of the fetch API, it's the fetch function that builds the promise amd return it for us to consume
// - in this case we don't have to build the promise ourselves in order to consume it

// - most of the time we will actually just consume promises, which is also the easier and more useful part
// - but sometimes, we also have to build a promise, and not just consume it

*/
/////////////////////////////////////////
/*

// Consuming Promises:

// Modern AJAX calls:
// ==================

// // Old-school: XML http request function:
// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// Modern AJAX calls:
// ==================

// Using the fetch function:
const request = fetch(`https://restcountries.com/v3.1/name/${'canada'}`);
// Promise is returned from the fetch function:
// console.log(request);

const getCountryData = function (country) {
  // Calling the fetch function, which immediately returns a promise:
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      // Looking at the response, which is what the promise passes once fulfilled:
      console.log(response);
      // Calling the json method on the response, creating a promise and returning it:
      return response.json();
    })
    // Calling .then on the newly returned promise from the json method:
    .then(function (data) {
      // Looking at the response object:
      console.log(data);
      // Passing the data to our function in order to render the card:
      renderCountry(data[0]);
    });
};

// Function without comments, console logs, and with arrow functions
const getCountryDataClean = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

// Uncomment to see results:
// getCountryData('portugal');
// getCountryDataClean('portugal');

// Calling the fetch function, which immediately returns a promise:
// - in the beginning, the promise is still pending
// - eventually, the promise will be settled in either a fulfilled or rejected state
// - for this example, we will assume that it is fulfilled

// Calling the then method:
// - on all promises, we can call the 'then' method
// - into the then method, we need to pass a callback function that we want to be executed as soon as the promise is fulfilled - as soon as the result is available
// - this callback function will actually receive one argument when it is called by JS
// - this argument is the resulting value of the fulfilled promise
// - we're calling it 'response' because it is the response of an AJAX call in this case
// - it is actually an object

// Looking at the response, which is what the promise passes once fulfilled:
// - notice that this response contains properties that look extremely similar to an http request... e.g. status code, headers
// - the body property is the property that contains the data we are after
// - also note that the 'body' property contains a value of 'Readable Stream' that we can't really look at or get any real information from

// Calling the json method on the response, creating a promise and returning it:
// - in order to read that data contained in the body,  we need to call the '.json' method on the response
// -'.json' is a method that is available on all response objects of the fetch function, aka all of the resolved values of the fetch function
// - the problem here is that this json method itself is actually also an asynchronous function
// - this means that it will also return a new promise
// - we don't know why it was implemented this way, this is just how it works
// - we want to continue to work with the value that this promise produces once fulfilled, so we return it

// Calling .then on the newly returned promise from the json method:
// - since we returned the promise from the json method, we can now call the .then method on it as well
// - once again, the .then method takes a call-back function which in this case receives the resolved value from the promise it is called on as an argument
// - we will be calling this argument 'data' in this example

// Looking at the resolved value:
// - if we log the resolved value to the console, we will see that we can now access the data we intended to
// - what is returned in this case is an array with one index containing an object that contains all the data we are looking for

// Passing the data to our function in order to render the card:
// - we can just pass the first index of data since it is an array with one index, we just need the info from the object, not the whole array that contains the object

//
//
// Overview:
// - we create a function that takes an argument which represents the name of the country we want to get data from
// - in the body of our function, the first thing we do is call the fetch function
// - we pass the function the url where we want to get data from, and replace the relevant field with our country argument - accessing the url where the data we want is located
// - this creates a promise, which starts as pending but ends up being fulfilled in this case
// - one fulfilled, we then call a method on this promise(kind of like stringing methods here)
// - the method we call is called the 'then' method, which all fulfilled promises have access to
// - this method receives an argument that represents the response object of the promise made by the fetch function
// - this allows us to work with this response object

// - however, we cannot access the data directly from this object, we have to call the .json method on it in order to access the data
// - the .json method is available on all the fulfilled promises - on their response objects
// - the problem with this method is that it is also an asynchronous function, so it also creates a promise
// - this means that we can call the .then method on it as well
// - we do this to continue working with the chain of events

*/
//////////////////////////////////////////////
/*

// Chaining Promises:
// - we actually already have a chain of promises because of the json function
// - the two 'then' methods called in sequence are already a small chain
// - we will now chain two sequential AJAX calls
// - we already have the data about the country, we now want to get the data about the neighbouring country
// - the second AJAX call depends on the first call, so they need to be done in sequence

const getCountryAndNeighbor = function (country) {
  // First AJAX call: Getting the data for the first country:
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // Promise resolved, returned the response object - convert to usable data with '.json':
    .then(response => response.json())
    // Promise resolved, returned data we can use, chaining another '.this':
    .then(data => {
      console.log(data[0]);
      // Rendering the card for the first country:
      renderCountry(data[0]);
      // Getting the country code for the second country:
      const neighbour = data[0].borders[0];
      // Gaurd clause for the case where there is no neighboring country:
      if (!neighbour) return;

      console.log(neighbour);
      // Second AJAX call: Getting data for the neighbour country:
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    // Promise resolved, returned response object - convert to usable data with '.json':
    .then(response => response.json())
    // Promise resolved, returned data we can use, using it to render neighbor card:
    .then(data => renderCountry(data[0], 'neighbour'));
};

// Cleaned up version:
const getCountryAndNeighborClean = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};

// Uncomment to see results:
// getCountryAndNeighbor('canada');
// getCountryAndNeighborClean('canada');

//

// In the last lecture, Jonas actually over simplified how things really work
// - the 'then' method always returns a promise no matter if we actually return anything or not
// - but if we do return a value, then that value will become the 'fulfillment value' of the returned promise
// - all promises have a 'then' method which we can use to handle the promise once it has been fulfilled
// - so the data that we receive as an argument of our 'then' method will be the fulfillment value of the promise that we are handling aka the promise we called the method on
// - while using the 'then' method on a promise, if we return another promise - for example, we return another fetch function call, then the fulfilled value of the NEXT 'then' method will be the fulfilled value of the returned promise.
// - in other words, the returned promise will be fulfilled, and the fulfillment value that it produced will be used as the argument for the next 'this' method
// - promises really allow us to handle these complex asynchronous operations with as many steps as we want
// - promises still use callback, but we don't have to deal with callback hell, makes everything easy to understand and to read

// First AJAX call: Getting the data for the first country:
// - we use the URL that is specifically for country NAMES

// Second AJAX call: Getting data for the neighbour country:
// - we use the URL that is specifically for country CODES
// - we return the promise (result of the fetch function)
// - we do this so we can chain the 'this' method
// - similar steps as before

//

// Overview:
// - the fetch function creates a promise, this promise is returned
// - the 'then' method is called on this promise only AFTER it has been fulfilled, aka after the asynchronous function finishes execution and a value is returned
// - in other words, we are calling the 'then' method on the resolved value of the promise
// - in this case, the promise returns a 'response object', which I assume has to do with an http request
// - this is why when we define the callback function of the 'this' method, we name the argument 'response'
// - but dont get confused, the argument is still the resolved value of the promise that the 'then' method has just been called on
// - the 'then' keyword always returns a promise, whether we return anything or not
// - if we do return a value, then that value will become the "fulfillment value" of the returned promise... aka it will become the resolved value
// - so the 'then' method returns a promise whose resolved value equals what we return
// - in this case, we return the response object of the previous promise, but after it has the 'json' method called on it
// - the 'json' method is also asynchronous, which means it will create a promise as well
// - just remember that we are returning the result of this, and that result will be the resolved value of the 'then' method
// - once the promise that the 'then' method returns has been fulfilled, we chain another 'then' method on it
// - in this case, the promises's resolved value is the result of the previous promise after the 'json' method has been called on it, which produces the data we want
// - this is why when we define the callback method of the 'this' method, we name the argument 'data'
// - we access the first index of this argument because of how it is stored(not explaining this right now)
// - we use this data to render the country card
// - we then use its border property to check if it has neighbors
// - if it doesn't, the

*/
//////////////////////////////////////////////////
/*

// General:

// Handling Rejected Promises:
// - remember that a promise in which an error happened is a rejected promise
// - the only way a fetch promise rejects is when the user loses their internet connection
// - that will be the error we are handling here
// - we can simulate this by going into our browser console, going to the network tab and changing the speed to 'offline'
// - we also need to add a button that will attempt the AJAX calls when pressed
// - so what we do is allow the page to load, then change the speed to offline, then press the button

// There are two ways of handling rejections:
//  We can pass a second callback function into the 'then' method:
// - the first callback is always going to be called for the fulfilled method
// - but we can also pass in a second callback which will be called when the promise is rejected
// - this second callback will be called with an argument which is basically the error itself
// - this will 'catch' the error, which is what we call it when we handle an error
// - we would have to do this for every 'then' method... which sucks
// - however, we can do this in a much cleaner and easier way
// - we can actually chain a method at the very end of the chain called 'catch', and pass the callback to handle errors  as an argument
// - this 'catch' method at the end of the chain will basically catch any errors that occur in any place in this whole promise chain, no matter where that is
// - errors basically propagate down the chain until they are caught
// - we only get the 'uncaught' error if the error is not caught anywhere
// - we can handle this error by logging it to the console
// - note that 'catch' itself also returns a promise, allowing us to chain the 'finally' method which we talk about further down

// - usually, just logging the information to the console is not enough in a real application with a real UI
// - so instead, we can also display an error message for the user to see
// - in this case we will use the renderError function that we created earlier

// Note:
// - the error generated by the 'catch' method is actually a real JS object
// - we can create errors in JS with a constructor, ex just like a map or a set
// - any error in JS that was created like this contains the message property
// - we can use this to only print the message of that error and not the whole object itself

// There is one more method that is available on all methods: FINALLY:
// - besides 'then' and 'catch', there is also the 'finally' method
// - also takes a callback as an argument, this callback will be called ALWAYS, whether the whole chain was successful or if it fails
// - this method is not always useful, but it can be sometimes
// - we use this method for something that needs to happen no matter the result of the promise
// - one example of that is to hide a loading spinner
// - some applications show a spinner when an asynchronous operation starts, and then hide it once the operation completes
// - this happens regardless of the operations success, which is a perfect situation to use the finally method
// - in our case, we always need to change the container's opacity to visible so that we can render either the country or the error depending on the success of the operation

// Handling Rejected Promises:
const getCountriesError = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    // Catching any possible errors in the chain, at the end of the chain:
    .catch(err => {
      // Printing error object to console:
      console.error(`${err} 💩💩💩`);
      // Printing error message to UI:
      renderError(`Something went wrong 💩💩 ${err.message}. Try agiain!`);
    })
    // Rendering the container, regardless of success status:
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Adding a button - when pressed, executes the function containing the AJAX calls
btn.addEventListener('click', function () {
  // Will cause an 'uncaught' error if internet connection fails
  getCountriesError('canada');
});

//Explaining comments:

// Catching any possible errors in the chain, at the end of the chain:
// - we use the 'catch' method at the end of the chain of promises to do this
// - we pass a callback as an argument, which will be executed if there is an error in order to handle it
// - the 'catch' method actually returns a promise as well

// Printing error object to console:
// - we can console.error a custom error message to make it easier for us to understand what went wrong

// Printing error message to UI:
// - we can also render an error in the UI to make things easier for the user to understand what went wrong

// Rendering the container, regardless of success status:
// - we can actually use the 'finally' method to handle certain situations regardless of the success status of the asynchronous operations
// - in this case, we know that both the 'renderCountry' and the 'renderError' methods render a div within the 'contriesContainer' div
// - this 'countiresContainer' div has its display set to none as default
// - we know that whether the promise chain fulfills or rejects, we still need this container to be visible so that either our error message or country card appears
// - so we use the 'finally' method to change the opacity of the container, regardless of the outcome

*/
//////////////////////////////////////////////////
/*

// Throwing Errors Manually
// - when we input a nonsense value into our function, it inserts it into the URL that we pass to the fetch function
// - during the fetch, there is a 404 error because our API cannot find a country with that name
// - even though there was a obviously a big problem with this request, the fetch function still did not reject in this case

// Taking a look at the response object:
// - looking at the 'ok' property of this object, we can see that it is set to false
// - the reason for that is the status code 404
// - note: if the 'property' is true, it will have the status code of 200, meaning the request went well
// - we can use the fact that the response object has an 'ok' value that can be set to false - we use it to reject the promise ourselves manually
// - we can do this by creating a new error a new error, yes - we can create errors lol
// - we do this by using the constructor function 'error()', passing in a message that we want to be the error message

// Checking if the 'ok' property of the response object is false:
// - if it is false we throw an error
// - we can also set the new error message
// - we do this by using the constructor function 'error()', passing in a message that we want to be the error message
// - then we use the throw keyword, which will immediately terminate the current function, just like return does
// - the effect of creating and throwing an error in any 'then' method is that the promise will immediately reject
// - in other words, the 'then' method that the error has been thrown in will return a rejected promise, which will propagate to the 'catch' handler
// - note that the 'throw' keyword acts like a return keyword, ending the function but also returning the new error object
// - this error method clearly reflects the actual problem
// - this will also cause the 'catch' method to catch this error

const getCountriesError2 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    // Changed the implicit arrow function into an arrow function with a block:
    .then(response => {
      // Taking a look at the response object from the fetch function:
      console.log(response);

      // Checking if the 'ok' property of the response object is false:
      // if (!response.ok)
      // throw new Error(`Country not found (${response.status})`);

      // Since we added the block back, we have to return the response explicitly
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      // const neighbour = data[0].borders[0];
      const neighbour = 'sdfsgsgs';

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      // Doing the same thing here, but this makes our code not DRY:
      console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💩💩💩`);
      renderError(`Something went wrong 💩💩 ${err.message}. Try agiain!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//  Produces 404 error during the fetch function, but doesn't catch it:
// getCountriesError2('asdfasdfa'); //uncomment to first thrown error
// getCountriesError2('canada'); //uncomment to test second thrown error

//  Produces a 404 error during the fetch function , but doesn't catch it:
// - this produces a weird error, telling us "cannot read property 'flag' of undefined" - this is the error that gets caught
// - this happens because the API can't find a country that matches our input, so when it tries to access that property - obviously it doesn't exist
// - this also means that the error is caught during the 'renderCountry' method's execution
// - but that is not where the error actually originates, it's not the original cause of the problem, so this information is misleading
// - this error doesn't really reflect the true error, which is simply that our API cannot find any country with the name we passed
// - this is reflected with the status code of 404
// - note that the fetch function only rejects when there is no internet connection
// - with the 404 error, the fetch promise will still get fulfilled, which is why the error isn't caught at the fetch function - where it origiinated
// - since there is no rejection, our catch function cannot pick up on this error
// - in this case, we really want to tell the user that 'no country was found with this name' - which is the origin of the problem

// - just to be clear, the 404 error still happens, what is important to note is that the 'catch' method doesn't catch it
// - so what ever code we set up to deal with errors in the body of the 'catch' function simply won't run

// Why do we handle errors?
// - it's the only/best way we can produce an accurate error message in the UI for the user
// - it's a bad practise to leave a rejected promise hanging around

// Same idea but we are going to export the repetetive functionality into a helper function:
// - this helper function will wrap up the fetch, the error handling, and also the conversion to JSON
// - we do this because it is annoying to do all these steps every time
// - so instead, we are going to encapsulate all of it into one nice function

// New helper function to deal with the fetch function, turning the promise into JSON, and handling the event of an error in that process:
const getJSON = function (url, errorMsg = 'Something went wrong..') {
  // Returning the result of the chain
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountriesError3 = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      // const neighbour = 'sdfsgsgs';
      // Throwing an error for the case where a country actually has no neighbours:
      // - creates a custom message for this scenario that makes sense
      if (!neighbour) throw new Error(`No neighbour found!`);

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💩💩💩`);
      renderError(`Something went wrong 💩💩 ${err.message}. Try agiain!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//  Produces 404 error during the fetch function, but doesn't catch it:
// getCountriesError3('canada');
// getCountriesError3('asdada');

// NOTE!!!:!:!:!:
// - the fetch function can only return a rejected promise if there is no internet connection
// - that means that the only way a 'catch' method will catch an error from a fetch function is if the error is caused because of internet problems
// - THE .THEN METHOD DOES NOT WORK THIS WAY
// - the 'then' method will return a rejected promise if the function throws an error.. or if we explicitly return a rejected promise
// - so if something goes wrong during the execution of the body of the 'then' methods call back function, a rejected promise will be returned and can be caught
// - this explains the behaviour of our 2nd function example

// Recap:
// - when ever we want to create some error that we want handled in the catch handler, all we need to do is to throw and create a new error
// - of course we can do that for multiple reasons
// - above, we did it for the case where no neighbor can be found

*/
///////////////////////////////////////////////////////////////////////
/*

// Coding Challenge #1:

const whereAmI = function (lat, lng) {
  fetch(
    ``https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en``
  )
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Something went wrong. (${response.status})`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}.`);
      return getCountriesError3(data.countryName);
    })
    .catch(err => {
      console.error(`${err.message} 😒`);
    });
};

// whereAmI(9999999, 999999);
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////////////////////////////////////////////////////////////////

// Asynchronous Behind the Scenes: The Event Loop:

// JS RUntime Review:
// - A JS runtime is basically a container that includes all the different pieces that are necessary to execute JS code
// - the heart of every JS runtime is the engine
// - the engine is where code is actually executed and where objects are stored in memory
// - these two things happen in the call stack and in the heap
// - JS has only one thread of execution, so it can only do one thing at a time
// - there is absolutely no multi-tasking happening in JS itself
// - other languages like Java can execute multiple pieces of code at the same time, but not JS
// - next we have the WEB api's environment
// - these are some api's provided to the engine, but are actually not part of the JS language itself
// - these are thing's like the DOM, TIMERS, fetch API, etc
// - next up is the call-back queue
// - this is a data structure that holds all the ready to be executed call-back functions that are attached to some event that has occurred
// - finally, whenever the call stack is empty the event loop takes call backs from the callback queue and puts them in the callstack so they can be executed
// - so the event loop is the essential piece that makes asynchronous behavior possible in js
// - it's the reason we can have a non-blocking concurrency model in JS
// - a concurrency model is simply how a language handle multiple things at the same time

// - how does this non-blocking concurrency actually work, and why is the event loop so important?

// - focusing on the important parts of the runtime: the call stack, the event loop, the Web APIs and the callback queue
// - A JS engine is built around the idea of a single thread, but if this is the case, how can non blocking code be executed in an asynchronous way?

// - everything related to the DOM is not really part of JS, but of the Web APIs
// - so it's in the web APIs environment where the asynchronous tasks related to the DOM will run
// - e.g. Image loading, Timers, AJAX calls, and really all other asynchronous tasks
// - these asynchronous tasks will all run in the web APIs environment of the browser
// - in the case of an image loading, if we want to do something once the image is finished loading, we have to listen for the 'load' event
// - we do this by adding an event listener to the image element
// - in practice, this means to register this call-back in the web APIs environment exactly where the image is loading
// - the call back will stay there until the load event is emitted

// - asynchronous tasks run in the background - the background being not the engine but the web api environment
// - when a callback is assigned to one of these asynchronous tasks, they are sent to the web api environment with the task
// - call-backs attached to asynchronous tasks  will remain in the web api environment until the task finishes its process.
// - once the task has finished, the callback is moved to the end of the callback queue
// - the callback queue only starts executing the code it contains once the callstack is empty
// - note that the callback queue also includes non-asynchronous dom events like clicks and key presses. They work pretty much the same way except that they don't have any asynchronous process to wait for

// - the event loop is actually what controls when the callback queue can start moving the stored call backs into the call stack
// - The event loop looks into the callstack to see if it's empty, and if it is, it starts executing callback functions from the callback queue in the callstack

// Ex.
const eventLoopTest = function () {
  console.log('Test Start');
  setTimeout(() => console.log('0 sec timer'), 0);
  Promise.resolve('Resolved promise 1').then(res => console.log(res));
  console.log('Test End');
};

// eventLoopTest(); // Uncomment to test

// Test Start
// Test End
// Resolved promise 1
// 0 sec timer

// - top level code gets executed first
// - both the setTimeout and promise are sent to their respective queues immediately (because we programmed it that way)
// - micro-tasks take precedent over normal asynchronous tasks, which is why the promise is printed before the timer

////////////////////////////////////////

// Building a Simple Promise

// Creating a promise:
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  // Setting timer to make this asynchronous:
  setTimeout(function () {
    // If true, we win the lottery
    if (Math.random() >= 0.5) {
      // If we win, fulfull the promise - using the resolve argument:
      resolve('You WIN 💰');
    } else {
      // If we lose, reject the promise:
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying:
// - wrapping callback based functions into promises, in other words -
// - converting callback based asynchronous behavior to promised based

// Creating a promise using the 'new promise' constructor:
// - uses the 'new promise' constructor, stored in a variable of our choice
// - passing it an 'executor' function as an argument, which executes as soon as the promise runs
// - 'executor' function takes two arguments; the 'resolve' and 'reject' functions
// - the 'executor' function contains the promise's asycnchronous behavior that we are trying to handle with the promise
// - it should eventually produce a resolved value, aka the future value of the promise

// If we win, fulfull the promise - using the "resolve" argument:
// - this resolve function marks this promise as fulfilled
// - we pass the fulfilled value of the promise into to this function
// - this allows it to be later consumed by the 'then' method

// If we lose, reject the promise:
// - calling the 'reject' function marks the promise as rejected
// - this is the value that will be passed to the 'catch' method

// Promisifying the setTimeout function:

`const wait = function (seconds) {
  // Returning a promise:
  // - don't need to pass a reject argument in this case
  // - this is because it is impossible for a timer to fail
  return new Promise(function (resolve) {
    // Passing the resolve function to the timer:
    // - all we want to happen at the end of the timer is for our promise to be resolved
    setTimeout(resolve, seconds * 1000);
  });
};`

// We want something to happen after a timer of 2 seconds:
wait(2)
  .then(() => {
    // This is what we want to happen after the timer:
    console.log('I waited for 2 seconds');
    // We want something to happen after a timer of 1 second - in sequence of the first timer:
    // - we must return the function - the function returns a promise which will be resolved
    return wait(1);
  })
  // This is what we want to happen after the second timer:
  // - takes the resolved value of the promise the last 'this' method returned
  .then(() => console.log('I waited for 1 seconds'));

  */
// //////////////////////////////////////////////
/*

const getPosition = function () {
  // This function returns a promise that we build using this executor function:
  return new Promise(function (resolve, reject) {
    // OKAY way of getting the geolocation to either resolve or reject:
    // - returns the position if successful, error if failed

    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // Better way to resolve or reject this callback based function:
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Will console log the position object that is returned from 'getPosition':
getPosition().then(pos => console.log(pos));

// Better way to resolve or reject this callback based function:
// - the first argument of the geolocation api always takes position object as an argument for it's callback function
// - the second argument always takes the error object for it's callback function
// - we instead pass the resolve and reject functions as callbacks
// - this tells the function to either resolve if successful or reject if failed
// - if it resolves, it automatically takes the position object as an argument, which in turn becomes the fulfilled value of the promise
// - if it rejects, it does the same but with the error object

*/
//////////////////////////////////////////////////////////////////
/*

//  Coding Challenge #2

// Selecting the container we want to add the image:
let imageContainer = document.querySelector('.images');
// Creating a global variable in which to store our current image:
// - this is so we have access to it later on in order to hide the image
let currentImg;

const wait = function (seconds) {
  // Returning a promise, allows chaining and avoids callback hell:
  return new Promise(function (resolve) {
    // Passing the resolve function to the timer:
    // - promise only executes the resolve function after the specified time has passed
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  // Returning Promise, allows chaining:
  return new Promise(function (resolve, reject) {
    // Creating new image and setting src:
    const img = document.createElement('img');
    img.src = imgPath;

    // Listening for the image to successfully load:
    img.addEventListener('load', function () {
      // This code only executes upon success of loading:
      imageContainer.append(img);
      resolve(img);
    });

    // Listening if the image fails to load:
    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// Testing:
createImage('./img/img-1.jpg')
  // Consumes the promise returned from createImage and does something with the resolved value:
  .then(img => {
    // Saves the value of the image to a global variable for future use:
    currentImg = img;
    console.log('Image 1 loaded');
    // Waiting two seconds, also returning this function will return a promise, allowing further chaining:
    return wait(2);
  })
  // Consumes the promise returned from the 'then' method and does something with it's resolved value:
  .then(() => {
    // Accesses the current image through the global variable and hides it:
    currentImg.style.display = 'none';
    // Returning this function because we want to implement its functionality AND allow it to continue to chain once it returns a promise:
    return createImage('./img/img-2.jpg');
  })
  // Same process as above
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  // Setting up a 'catch' method to catch any rejected promises:
  .catch(err => console.error(err));

*/
////////////////////////////////////////////////////

// Consuming Promises with Async/Await:
// - since es2017, there is an even better and easier way to consume promises called 'Async/Await

// Error Handling with try...catch
// - we can wrap our function's code in a try block
// - we can then tell it what to do if an error happens using a catch block
// - if no error happens, the code executes normally
// - works very similarly to the catch method, receives the error object as an argument

// fetch(`https://restcountries.com/v3.1/name/${country}`).then(res =>
//   console.log(res)
// ); // old way

/*

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Adding the 'async' keyword makes this function asynchronous:
const whereAmI = async function () {
  // Wrapping code in a try block:
  try {
    // Geolocation:
    const pos = await getPosition();
    const { lattitude: lat, longitute: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );
    // Handles any error in this fetch, makes any caught error contain a useful message:
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country Data:
    // Inside an async function, we can have one or more 'await' statements:
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.countryName}`
    );
    // Handles any error in this fetch, makes any caught error contain a useful message:
    if (!res.ok) throw new Error('Problem getting country data 💩');

    // We can use another await to get the json from res:
    const data = await res.json();
    renderCountry(data[0]);
    // Returning a value from an async function:
    return `You are in ${data[0].name.common}`;

    // Handling errors with a catch block:
  } catch (err) {
    // Console logging error for our use:
    console.error(`${err}`);
    // Rendering error to UI for the user:
    renderError(`${err.message}`);
    // Reject promise returned from async function, returns the error to the function call:
    throw err;
  }
};

console.log('Getting location...');

// whereAmI()
//   .then(country => console.log(country))
//   .catch(err => console.error(err.message))
//   .finally(() => console.log('Finished getting location'));

// Immediately invoking an async function expression:
// - allows you to wrap the function implementation into a try/catch block
// - also allows you to do this without having to create a whole new function
// - allows you to avoid using the 'then', 'catch' and 'finally' methods
(async function () {
  try {
    console.log(await whereAmI());
  } catch (err) {
    console.error(`${err.message} ⛔`);
  }
  console.log('Finished getting location');
})();

*/

// Inside an async function, we can have one or more 'await' statements:
// - the await statements are used on asynchronous functions that return promises
// - in this example, the fetch function will return a promise
// - we use the await keyword to wait for the result of that promise
// - the await keyword STOPS the execution of the async function until the promise of the asynchronous function is resolved
// - this is not a problem, since the function we used await on itself is executing asynchronously in the background
// - this doesn't block the main thread of execution
// - once the promise is resolved, the value of the whole await expression is going to be the resolved value of the promise
// - we can store this value in a variable
// - removes the need to use callback functions or consume promises with the then method
// - important to note that async/await is simply syntactic sugar over promises and the then method

// We can use another await to get the json from res:
// - before we would have to return the promise this produces, followed by the use of the 'then' method in order to use the resolved value
// - now we just store the resolved value in a variable and use the data right away

// Creating a new error for fetch functions incase of failure:
// - remember that fetch functions only reject when there is no internet connection
// - this means when other errors arise, they don't get caught by the catch block, the promise still gets returned and is seen as resolved
// - we create a new error if the response fails - this allows us to reject the promisea
// - we do this because it allows us to more accurately deduce where the problem originated
// - this also allows use to create descriptive error messages that help anyone debugging understand what the problem is, as well as being able to render the error to the user

// Returning values from Async functions:
// - the value that we return from an async function will become the fulfilled value of the promise that is returned by the function
// - we return this resolved value by simply using the 'return' keyword within the async function
// - we can access this resolved value using the 'then' method
// - note that if any error happens in the try block before the return keyword, the return will never be reached because the code will immediately jump to the catch block
// - for some reason this causes the promise returned from the async function to not be rejected, even if there was an error in the try block
// - in other words, even if there is an error with the async function, the promise that the async function returns is still fulfilled and not rejected

// The Confusing bit:
// - in the case that the async function has an error, the catch block is what the 'then' method is expecting a value from.
// - we have to explicitly throw an error here as well because the catch block should only be triggered if an error occurs, and it receives that error as an argument
// - if we don't throw an error, the async function thinks that the catch block is returning a resolved value for its promise
// - and since there is nothing explicitly returned in the catch block, the 'then' method receives a value of undefined
// - so basically the async function still resolves and that means that the then method will still trigger, it will not go to the catch method because it doesn't think the promise was rejected
// - this only happens when returning a value from an async function

// - now, if we throw an error in the catch block, we do so by using the argument that was passed to the catch block (which is the caught error from the async function)
// - this is important because it allows us to use that information about the error and pass it forward to the catch method
// -throwing the error at the end of the catch block causes the async functions promise to be rejected, which in turn will not trigger the 'then' method, but will trigger the 'catch' method
// - we also have the added benefit of keeping the detailed error message

////////////////////////////////////

/*

const get3Countries = async function (c1, c2, c3) {
  try {
    // Handling unrelated asynchronous functions in sequence, wastes time - much slower:
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

    // Handling unrelated asynchronous data in parallel, much faster:
    // - we use Promise.all, which is a promise combinator
    // - allows us to pass an array of promises that run in parallel
    // - returns an array of the resolved values, in this case, the json objects
    // - when the promises don't rely on each other, its best to run them in parallel
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    // Accessing the values using the map method:
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.log(err.message);
  }
};
get3Countries('portugal', 'canada', 'tanzania');

*/

// Note:
// - if any of the promises are rejected, the whole combinator gets rejected,  when this happens we say it short circuits
// - if you are not using async/await, you can use the 'then' method to do the same thing
// - but its probably better to just use the async function
// - promise combinators allow us to combine multiple promises, there are multiple combinators

// See video on combinators

/////////////////////////////////////////////////////

// Selecting elements we will use later:
const imageContainer = document.querySelector('.images');

// Creating the promisified createImage function:
const createImage = function (imgPath) {
  // Returning a promise:
  return new Promise(function (resolve, reject) {
    // Creating the new img element and giving it a src of the imgPath:
    const img = document.createElement('img');
    img.src = imgPath;

    // Listening for the 'load' event from the img element:
    img.addEventListener('load', function () {
      // Adding the new element to the right div:
      imageContainer.append(img);
      // Resolving the promise, setting the resolved value to the new img element:
      resolve(img);
    });

    // Listening for the 'error' event (from the img element?):
    img.addEventListener('error', function () {
      // Setting the resolved value to a new error with a specific error message:
      reject(new Error(`Image couldn't load.. ⛔`));
    });
  });
};

// Creating the promisified wait function:
const wait = function (seconds) {
  // Returning a promise:
  return new Promise(function (resolve) {
    // Passing the resolve function to the timer as the call back, marks promise as resolved:
    setTimeout(resolve, seconds * 1000);
  });
};

// Testing
// createImage('./img/img-1.jpg');

const loadNPause = async function () {
  try {
    // Creating the first image, waiting then hiding:
    let newImg = await createImage('./img/img-1.jp');
    console.log(newImg);
    await wait(2);
    newImg.style.display = 'none';

    // Creating the second image, waiting then hiding:
    newImg = await createImage('./img/img-2.jpg');
    await wait(2);
    newImg.style.display = 'none';

    // Catching the errors
  } catch (err) {
    console.error(err);
    renderError(err.message);
    // throw err; // This is only needed if we are expecting a returned value from the try block
  }
};

// Testing:
// loadNPause(); //WHY DOESN'T THIS WORK THOUGH???????????????? Uncaught promise.... how???????
// loadNPause().catch(err => console.error(err));  // so I did this to fix it... but must be another way

// Creating the load all async function:
const loadAll = async function (imgArr) {
  try {
    // Looping through the passed array:
    const newArr = imgArr.map(async imgPath => await createImage(imgPath));
    // Async callback only gave the map method unsettled promises:
    console.log(newArr);
    // We 'await' the 'all' combinator and pass the new array in order to receive the settled values of each index of the array of promises:
    const newArrEl = await Promise.all(newArr);
    console.log(newArrEl);

    // Doing something with the resolved values of the array of promises:
    newArrEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

const imgArr = ['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg'];

// Testing:
loadAll(imgArr);

// Weird bits:

// Looping through the passed array:
// - callback for the map method is an async function
// - this allows us to use await within the callback
// - however, async functions always return a promise
// - so the new array that the map method produces will be composed of 3 promises if we console log it
// - we can't really work with these values in this condition

// We 'await' the 'all' combinator and pass the new array in order to receive the settled values of each index of the array of promises:
// - since the map method used an async callback, it returned promises for each of the new arrays indexes instead of actual values
// - we want the settled values of these promises so that we can actually work with them
// - so what we do is use the Promise.all combinator, which takes an array of promises and runs them in parallel
// - we await this combinator and store the values in a new variable
// - this pauses execution until all of the promises in the array are fulfilled OR until one of them has an error
//

// FOR SOME REASON WE DON"T NEED TO USE THE CATCH METHOD AFTER WE CALL LOADALL, BUT WE DO WHEN WE CALL LOADNPAUSE.. I HAVE SEARCHED FOR A LONG TIME AND HAVE NOT FOUND THE REASON FOR THIS
// - note that you only need to throw an error in situations where there is also a possible return value
// - for example, if you have a promisified function that returns a value if successful, you should also return a new error if that function fails
// - or if you have an asyc function with a try block that you expect to return a value on success, you should also throw an error in the catch block
// - what I mean is, if you want a resolved value from an async function/promise, and you want to handle this resolved value...
// - .. by either using the 'then' method or by calling the async function within an IIFE..... aka you are expecting a value
// - you must also throw an error for the cases where this function/promise fails
// - this is because an async function always returns a promise.. meaning that it is always seen as resolved - even if an error occurs
// - that means that it will always enter the try/then blocks... even with an error
// - in order for this to not happen, we have to throw an error.
// - this allows the promise to return an error/rejected promise and therefor skip the try/then blocks and go straight to the catch block/catch method.
// - this means that any errors that happen within the async function will actually be caught, instead of that weird uncaught error that we kept getting
