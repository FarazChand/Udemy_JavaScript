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
