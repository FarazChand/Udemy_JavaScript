'use strict';

///////////////////////////////////////////

// Default Parameters
// - can be useful to have functions where some parameters are set by default
// - this way, we don't have to pass them in manually if we don't want to change
//   the default value

//---

// Booking Function:

// const bookings = [];

// // ES6: SET DEFUALT PARAMETERS IN THE PARAMATER LIST:
// // - can use any expression in default parameters (2*2)
// // - can use any of the parameters set BEFORE within the value
// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers //numPass was set before price, works
// ) {
//   // ES5:
//   // numPassengers = numPassengers || 1;
//   // price = price || 199;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking('LH123'); // uses default values
// createBooking('LH123', 2, 800); // overwrites defualt values
// createBooking('LH123', 2); // price based on previous parameter
// createBooking('LH123', 5); // ^^

// createBooking('LH123', 1000); // cannot skip an argument, bug
// createBooking('LH123', undefined, 1000); // this is how you skip, keeps default

///////////////////////////////////////////

// // How Passing Arguments Work: Primitive vs Reference

// const flight = 'LH123';
// const jonas = {
//   name: 'Jonas Schmedtmann',
//   passport: 247623422342,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 247623422342) {
//     alert('Check in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, jonas);
// // Primitive value did not change even though we redifined it in function
// console.log(flight); // still 'LH123'
// // Reference value did change
// console.log(jonas); // changed to 'Mr. Jonas Schmedtmann'

// // This happens because when a Primitive type is passed as an argument, it becomes a copy of the original value - they have different addresses in the stack

// // Reference types copy the reference to the address of the object in the memory heap. This means that both the original object variable name and the argument variable name both point to the same object. In other words, both these variables have different addresses in the stack, but they hold the same value - that value being the address of the object in the memory heap.

// // it's the same as this:
// const flightNum = flight; //different variable addresses with the same value
// const passenger = jonas; // both variables point to the same object in memory

// //Because objects act this way, they can cause big problems if we dont account for them. Here is an example of what can happen:

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 1000000000000);
// };

// // Lets say you booked a flight with an original passport number
// // For some reason you had to change your passport number before you checked in

// newPassport(jonas); //passport changed before checkIn
// checkIn(flight, jonas); // Wrong passport number

// // Pass by Value vs Pass by reference
// // - JS does not have passing by reference, only passing by value
// // - the reference that we pass into the function is actually a variable that holds a value that references an object in the memory heap
// // - this means we are actually passing a value holding a reference, not a reference itself, different from c and c++

///////////////////////////////////////////

// First Class and Higher Order Functions
// - JavaScript has first class functions
// - this enables us to write higher order functions

// First Class Functions:
// - JavaScript treats functions as first-class citizens
// - this means functions are simply values
// - functions are just another 'type' of object
// - since functions are values we can do a lot of cool things with them
// - we can STORE functions in variables or properties
// - we can PASS functions as arguments to OTHER fucntions
// - we can also RETURN functions FROM functions
// - we can also call methods on functions

// Higher Order Functions
// - the fact that JavaScript has first class functions allows us to use and
//   write higher order functions
// - a higher order function is a function that receives another function as
//   an argument, that returns a new function, or both
// - a function that is passed in as an arguement is called a "call back" func..

///////////////////////////////////////////

// // Functions Accepting Call-Back Functions

// // Creating a Higher-Order Function:

// // Two Generic Functions
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// // Higher-Order Function: Takes in a Function as an argument
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// // Notice that we are only passing the function value, not calling the function we are passing
// transformer('JavaScript is the best!', upperFirstWord);
// transformer('JavaScript is the best!', oneWord);

// // Higher-Order Functions and Call-Back Functions are used everywhere in JS
// const high5 = function () {
//   console.log('👋');
// };
// // used in event listeners
// document.body.addEventListener('click', high5);
// // used in other built in JS functions, eg. ForEach function for arrays:
// ['Jonas', 'Martha', 'Adam'].forEach(high5);

// // Why are Call-Backs used so much and why are they so helpful?
// // - makes it easy to split up our code into more reusable and interconnected
// //   parts
// // - allows us to create abstraction, hides the details of code implementation
// //   because we don't really care about all that detail, this allows us to think
// //   about problems at a higher, more abstract level
// // - they also allow us to use different functions within the same higher-order
// //   function - we can pass any function we want and it will be called by the
// //   higher order function, as opposed to only having mulitple functions within
// //   a function - we would need if statements and other logic etc. in order to
// //   call the correct function

///////////////////////////////////////////

// // Functions Returning Functions

// // This function returns a function
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// // Passing a string to the HOF and returning a function which we store in a var
// // - this creates a new function with the implementation of the function we
// //   returned
// // - this happens because of 'closures', we will dive deeper into them later
// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// // We can actually do these steps all at once:
// //  - we call the HOF which returns a function value
// //  - then we immidiately call the function we just returned
// greet('Hello')('Jonas');

// // Whats the  of having function returning other functions?
// // - extremely important in certain situations
// // - 'functional programming', dive deeper later

// // Small Challenge: Rewrite the first function using only arrow functions

// const greet1 = greeting => name => console.log(`${greeting} ${name}`);

// // Test
// const greeterHey1 = greet1('Hey');
// greeterHey1('Jonas');
// greeterHey1('Steven');
// greet1('Hello')('Jonas');

///////////////////////////////////////////

// The Call and Apply Methods

// lufthansa airline
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

// 'this' from the 'book' method points to the 'lufthansa' object because that's what called it.
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(639, 'John Smith');
console.log(lufthansa);

// Lets say lufthansa created a new airline years later..
// - we want to use the same method from lufthansa, but copying and pasting
//   it in this object is a bad practise
// - instead we take the method and store it in an external function, now we
//   can reuse this function for all the different airlines.. BUT the 'this'
//   keyword wont work :(
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Storing the lufthansa's book method into an external variable
const book = lufthansa.book;

// Just a regular function call not a method, this keyword points to undefined
// - how do we fix this?
// book(23, 'Sarah Williams'); // bug, does not work

// We have to explicitly tell the 'this' keyword where we want it to point
// - three funcion methods that do this: call, apply and bind

// Call Method:
// - first argument is where we want the this keyword of the function we are
//   calling to point
// - the rest of the arguments are what ever other arguments the function takes
// - note that we are not calling the 'book' function directly, we are actually
//   calling the 'call' method which calls the 'book' function
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method
// - does the same thing as the 'call' method, but does not receive a list of
//   arguments after the this keyword argument
// - instead it takes an array of the arguments
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

// - 'apply' method is not used as often anymore, there is a better way
book.call(swiss, ...flightData);
console.log(swiss);

// So we just learned a very powerful set of tools when working with objects and object methods:
//  - we can store a method into an external variable (now its a normal func)
// - this allows us to reuse the method for other objects
// - we can manipulate where the 'this' keyword of that function points
// - we do this using the 'call' method on the new external function
// - note that the objects should have the same property names, or it might
//   interfear with how the code is implemented

///////////////////////////////////////////

// The Bind Method
// - just like the call method, allows us to set the 'this' keyword of any
//   function call
// - the difference is that 'bind' does not immediately call the function
// - instead it returns a new function where the 'this' keyword is bound

// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings);
// - this will return a new function
// - the 'this' keyword will always point to the 'eurowings' obeject for
//   this function
// - this means we no longer need to specify the 'this' keyword for this func
bookEW(23, 'Steven Williams');

// We can now do this for all the airlines
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
// - if we had to use book many flights, this saves us from having to use the
//   'call' method repeatedly

// We can also bind the other arguments we want to pass, these arguments will be set in stone once passed:
const bookEW23 = book.bind(eurowings, 23);

// Only need to pass name because the flight number has already been binded
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');
// - specifying parts of the argument beforehand is actualy a common pattern called 'partial application', which means parts of the argument of the original function are already applied/set

// There are other situations where using the bind method is very useful, for example, when we use objects together with event listners

// With event listners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// -> when clicked, this logs NAN
// -> This is because in an event handler function, the 'this' keyword always points to the element on which the handler is attatched to
// -> We still want the 'this' keyword to point to the lufthansa object itself, so what do we do to fix this?
// -> We can manually define the 'this' keyword by either using the 'call' or 'bind' methods
// -> in this case, we know that we need to pass a function, not call one, so we will use the 'bind' method to save the function into a variable that we can later pass to the event listner - or in this case, the bind method will return a function directly to the event listner

// Instead we do this:
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
