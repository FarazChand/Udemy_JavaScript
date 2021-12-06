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

//Hoisting with variables
console.log(me); // undefined, does not throw error - sneaky bug
// console.log(job); // Throws error
// console.log(year); // Throws error

var me = `Jonas`;
let job = `teacher`;
const year = 1991;

// Hoisting with Functions
console.log(addDecl(2, 3)); //function declarations are hoisted correctly
// console.log(addExpr(2, 3));  // Expression Throws error
// console.log(addArrow(2, 3)); // Expression Throws error
// console.log(addArrow(2, 3)); // Error: Undefined is not a function

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

var addArrow2 = (a, b) => a + b;

// Example

if (!numProducts) deleteShoppingCart(); // Undefined, sneaky bug

!numProducts ? deleteShoppingCart() : console.log(numProducts); // Undefined, sneaky bug

var numProducts = 10;

!numProducts ? deleteShoppingCart() : console.log(numProducts); // var finally defined as intended

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

var x = 1; // creates property on the global window object
let y = 2; // does not create property on the global window object
const z = 3; // does not create property on the global window object

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false
