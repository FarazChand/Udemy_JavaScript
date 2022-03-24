'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

// Consuming Promises:

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
console.log(request);

const getCountryData = function (country) {
  // Calling the fetch function, which immediately returns a promise:
  fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (
    response
  ) {});
};

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
