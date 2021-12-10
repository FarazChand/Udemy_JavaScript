'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;

//   function printAge() {
//     let output = `${firstName}, You are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       let firstName = `Steven`;
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);

//       function add(a, b) {
//         return a + b;
//       }
//       // console.log(add(2, 3));
//       output = `NEW OUTPUT`;
//     }

//     // console.log(add(2, 3)); // reference error in strict mode
//     // console.log(str); // reference error
//     console.log(millenial);
//     console.log(output);
//   }
//   // console.log(millenial); // reference error

//   printAge();
//   return age;
// }

// let firstName = 'Jonas';
// calcAge(1991);
// console.log(firstName);
// // console.log(age);  // reference error
// // printAge(); // reference error

// //Hoisting with variables
// console.log(me); // undefined, does not throw error - sneaky bug
// // console.log(job); // Throws error
// // console.log(year); // Throws error

// var me = `Jonas`;
// let job = `teacher`;
// const year = 1991;

// // Hoisting with Functions
// console.log(addDecl(2, 3)); //function declarations are hoisted correctly
// // console.log(addExpr(2, 3));  // Expression Throws error
// // console.log(addArrow(2, 3)); // Expression Throws error
// // console.log(addArrow(2, 3)); // Error: Undefined is not a function

// function addDecl(a, b) {
//   return a + b;
// }

// const addExpr = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// var addArrow2 = (a, b) => a + b;

// // Example

// if (!numProducts) deleteShoppingCart(); // Undefined, sneaky bug

// !numProducts ? deleteShoppingCart() : console.log(numProducts); // Undefined, sneaky bug

// var numProducts = 10;

// !numProducts ? deleteShoppingCart() : console.log(numProducts); // var finally defined as intended

// function deleteShoppingCart() {
//   console.log(`All products deleted!`);
// }

// var x = 1; // creates property on the global window object
// let y = 2; // does not create property on the global window object
// const z = 3; // does not create property on the global window object

// console.log(x === window.x); // true
// console.log(y === window.y); // false
// console.log(z === window.z); // false

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAge(1991);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };

// calcAgeArrow(1980);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this);
//     console.log(2037 - this.year);
//   },
// };

// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };

// matilda.calcAge = jonas.calcAge;
// matilda.calcAge();

// const f = jonas.calcAge;

// f();

// var firstName = `Matilda`;

// const jonas = {
//   firstName: `Jonas`,
//   year: 1991,
//   calcAge: function () {
//     // console.log(this);
//     console.log(2037 - this.year);

//     // Solution 1:
//     // const self = this;
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.year >= 1981 && self.year <= 1996); //self = this
//     // };

//     // Solution 2(es6):
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1981 && this.year <= 1996); //self = this
//     };

//     isMillenial();
//   },

//   greet: () => {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   },
// };
// jonas.greet(); // "this" lexical scope is the global scope, bug
// jonas.calcAge();

// // Arguments Keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };

// addArrow(2, 5, 8); // throws error, argument keyword doesnt exist in =>

// let age = 30;
// let oldAge = age;

// age = 31;
// console.log(age); // age = 31
// console.log(oldAge); // age = 30

// const me = {
//   name: `Jonas`,
//   age: 30,
// };

// const friend = me;
// friend.age = 27; // only attempted to change the friends age property

// console.log('Friend:', friend); // age: 27
// console.log('Me', me); // age: 27???

///////////

// Primitive Types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference Types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// marriedJessica = {}; // will not work, different reference in heap

// Copying Objects

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

//Shallow copy, only copies the first object, not the object within
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log(jessica2);
console.log(jessicaCopy);
