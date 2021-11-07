/*
let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "Jonas";
console.log(firstName);
console.log(firstName);
console.log(firstName);

//////////////////////////////////////

true;
let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof javascriptIsFun);
// console.log(typeof true);
// console.log(typeof 23);
// console.log(typeof "Jonas");

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;
console.log(year);
console.log(typeof year);

console.log(typeof null);

//////////////////////////////////////

// let is used when we want a variable's value to be able to change aka mutate
let age = 30;
age = 31;

// const is used when we want the value to be constant aka immutable
const birthYear = 1991;

// trying to mutate will produce an error because the variable is a const
// e.g. birthYear = 1990;

// cannot declare an empty const, the code below will produce an error
// e.g. const job;

// best practice is to use const as a default, and only use let when necessary.

// var is an older way of declaring variables, should be avoided
// works similar to let, but there are differences that will be explored

var job = "programmer";
job = "teacher";

// you actually don't even have to declare variables
// doing it like this makes it global though, not in the current scope
// should be avoided mostly
lastName = "Chand";
console.log(lastName);

//////////////////////////////////////

// Operators allow use to transform values or combine multiple values
// Arithmetic operators:

const now = 2037;
const ageFaraz = now - 1993;
const ageSarah = now - 2018;
console.log(ageFaraz, ageSarah);

console.log(ageFaraz * 2, ageFaraz / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2x2x2

const firstName = "Faraz";
const lastName = "Chand";

console.log(firstName + " " + lastName);
//typeof() is also an operator

// Assignment operators:

// = is an operator;
// + operator is executed before the = operator, operator precedence
let x = 10 + 5; //15
console.log(x);

x += 10; // x = x + 10;
console.log(x); //25

x *= 4; // x = x * 4;

x++; //x= x + 1;
x--;
x--;
console.log(x); //99

// Comparison operators:
console.log(ageFaraz > ageSarah); //true --  >, <, >=, <=
console.log(ageSarah >= 18); //true

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);

//////////////////////////////////////

const now = 2037;
const ageFaraz = now - 1993;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y;

x = y = 25 - 10 - 5; //x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageFaraz + ageSarah) / 2;
console.log(ageFaraz, ageSarah, averageAge);

//////////////////////////////////////

const firstName = "Faraz";
const job = "teacher";
const birthYear = "1993";
const currentYear = 2037;

const faraz =
"I'm " +
firstName +
", a " +
(currentYear - birthYear) +
" year old " +
job +
"!";

console.log(faraz);

const farazNew = `I'm ${firstName}, a ${
  currentYear - birthYear
} year old ${job}!`;
console.log(farazNew);

console.log(`Just a regular string...`);

console.log("String with \n\
multiple\n\
lines");

console.log(`String
multiple
lines`);

//////////////////////////////////////



const age = 15;

if (age >= 18) {
   console.log(`Sarah can start getting her driving license 🚗`);
} else {
   const yearsLeft = 18 - age;
   console.log(
      `Sarah isn't old enough to drive, try again in ${yearsLeft} years. 💩`
   );
}

const birthYear = 2012;
let century;

if (birthYear <= 2000) {
   century = 20;
} else {
   century = 21;
}

console.log(century);

//////////////////////////////////////


*/

// Coding Challenge #1, #2:

//Test Data 1:
console.log("Test Data 1");
let markWeight = 78;
let markHeight = 1.69;
let johnWeight = 92;
let johnHeight = 1.95;

let markBMI = Math.round((markWeight / markHeight ** 2) * 10) / 10;
let johnBMI = Math.round((johnWeight / johnHeight ** 2) * 10) / 10;
console.log(markBMI, johnBMI);

function testing() {
   if (markBMI > johnBMI) {
      console.log(
         `Mark's BMI (${markBMI}) is higher than John's (${johnBMI}!)`
      );
   } else {
      console.log(
         `John's BMI (${johnBMI}) is higher that Mark's (${markBMI}!)`
      );
   }
}
// console.log(markBMI, johnBMI);
testing();

console.log("------");

//Test Data 2:
console.log("Test Data 2");

markWeight = 95;
markHeight = 1.88;
johnWeight = 85;
johnHeight = 1.76;

markBMI = Math.round((markWeight / markHeight ** 2) * 10) / 10;
johnBMI = Math.round((johnWeight / johnHeight ** 2) * 10) / 10;
console.log(markBMI, johnBMI);

testing();

//////////////////////////////////////
