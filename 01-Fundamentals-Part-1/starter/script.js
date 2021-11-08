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


////Type Conversion

// Converting strings to numbers
const inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);
// Number function just gives us the string in number form, does not change the original variable

console.log(Number("Faraz")); // will produce NaN aka not a number
console.log(typeof NaN); // will say the type of number, it's actually an invalid number

// Converting numbers to strings
console.log(String(23), 23);

////Type Coercion
console.log("I am " + 23 + " years old"); // operator triggers type coercion, 23 changed to string in this occasion
console.log("I am " + "23" + " years old"); // produces the same output as above

console.log("23" + "10" + 3); // + operator converts numbers to strings

console.log("23" - "10" - 3); // - operator coverts string to numbers, opposite of the +
console.log("23" * "2"); // also converted to numbers, works this way with / as well
console.log("23" > "18"); // also converts to numbers

let n = "1" + 1;
n = n - 1;
console.log(n);

//////////////////////////////////////

// 5 falsy values: 0, '', undefined, null, NaN
// Everything else is a truthy value

console.log(Boolean(0)); // outputs false with the type of boolean
console.log(Boolean(undefined)); // outputs false with the type of boolean
console.log(Boolean("Faraz")); // outputs true with the type of boolean
console.log(Boolean({})); // outputs true?? with the type of boolean (not one of the 5)
console.log(Boolean("")); // outputs false with the type of boolean

// const money = 0; //fails if statement
const money = 200; //passes if statement, any number that is not 0 passes.

if (money) {
   console.log(`Don't spend it all ;)`);
} else {
   console.log(`You should get a job!`);
}

// let height; // will fail if statement
// let height = 123; // will pass if statement
let height = 0; // will fail if statement, but is defined - this is a bug

if (height) {
   console.log(`YAY! Height is defined`);
} else {
   console.log(`Height is UNDEFINED`);
}
// in an if condition, JS coerces any value into a boolean

//////////////////////////////////////


// // = assignment
// // == loose comparison, does perform type coercion
// //=== strict comparison, does not perform type coercion

// // const age = 18;
// const age = "18";

// if (age === 18) console.log("You just became an adult :D (strict)");
// if (age == 18) console.log("You just became an adult :D (loose)");

// console.log("18" == 18); //output is true, type coercion
// console.log("18" === 18); //output is false, no type coercion
// // generally avoid the loose comparison as it introduces a lot of bugs sometimes

// // const favorite = prompt("What's your favorite number?"); // for loose example
// const favorite = Number(prompt("What's your favorite number?")); // for strict example

// console.log(favorite);
// console.log(typeof favorite);

// // if (favorite == 23) {
// //    // this works because of type coercion, but we dont want that
// //    // '23' == 23
// //    console.log(`Cool, 23 is an amazing number`);
// // }
// // the strict === would not work with this logic, must convert the input to number

// if (favorite === 23) {
//    // 23 == 23
//    console.log(`Cool, 23 is an amazing number`);
// } else if (favorite === 8) {
//    console.log(`8 is also is an amazing number`);
// } else if (favorite === 24) {
//    console.log(`24 is also is an amazing number`);
// } else {
//    console.log(`Your number sucks 💩`);
// }

// if (favorite !== 23) {
//    // the different operator, strict version
//    console.log(`Why not 23?`);
// }

//////////////////////////////////////

const hasDriversLicense = true; // A
let hasGoodVision = false; // B

console.log(hasDriversLicense && hasGoodVision); //false
console.log(hasDriversLicense || hasGoodVision); //true
console.log(!hasDriversLicense); // false

hasDriversLicense && hasGoodVision;

// if (hasDriversLicense && hasGoodVision) {
//    console.log(`Sarah is able to drive!`);
// } else {
//    console.log(`Someone else should drive.`); // will trigger else
// }

const isTired = false; // C
console.log(hasDriversLicense || hasGoodVision || isTired); // true
console.log(hasDriversLicense && hasGoodVision && isTired); // false

hasGoodVision = true;

if (hasDriversLicense && hasGoodVision && !isTired) {
   console.log(`Sarah is able to drive!`); // will pass if statement, all variables true
} else {
   console.log(`Someone else should drive.`);
}

//////////////////////////////////////


// Coding Challenge #3

//Test Data #1

// Dolphins scores
let a = 96;
let b = 108;
let c = 89;
// Koalas scores
let d = 88;
let e = 91;
let f = 110;

let dolphinAvgScore;
let koalasAvgScore;

function scores() {
   dolphinAvgScore = Math.round(((a + b + c) / 3) * 10) / 10;
   koalasAvgScore = Math.round(((d + e + f) / 3) * 10) / 10;
}
function winner() {
   if (dolphinAvgScore > koalasAvgScore && dolphinAvgScore >= 100) {
      console.log(
         `The final score is: D - ${dolphinAvgScore} to K - ${koalasAvgScore}. Dolphins win!`
      );
   } else if (dolphinAvgScore < koalasAvgScore && koalasAvgScore >= 100) {
      console.log(
         `The final score is: D - ${dolphinAvgScore} to K - ${koalasAvgScore}. Koalas win!`
      );
   } else if (dolphinAvgScore === koalasAvgScore && dolphinAvgScore >= 100) {
      console.log(
         `The final score is: D - ${dolphinAvgScore} to K - ${koalasAvgScore}. It's a tie!`
      );
   } else {
      console.log(`No one got a score over 100, so no one wins.`);
   }
}

scores();
winner();

//Test Data #2

// Dolphins scores
a = 97;
b = 112;
c = 101;
// Koalas scores
d = 109;
e = 95;
f = 123;

scores();
winner();

//Test Data #3

// Dolphins scores
a = 97;
b = 112;
c = 101;
// Koalas scores
d = 109;
e = 95;
f = 106;

scores();
winner();

// Test Data #4

// Dolphins scores
a = 20;
b = 30;
c = 41;
// Koalas scores
d = 20;
e = 30;
f = 40;

scores();
winner();

//////////////////////////////////////

const day = "monday";

// switch (day) {
//    case "monday": // day === 'monday'
//       console.log(`Plan course structure`);
//       console.log(`Go to coding meetup`);
//       break;
//    case "tuesday":
//       console.log(`Prepare theory videos`);
//       break;
//    case "wednesday":
//    case "thursday":
//       console.log(`Write code examples`);
//       break;
//    case "friday":
//       console.log(`Record videos`);
//       break;
//    case "saturday":
//    case "sunday":
//       console.log(`Enjoy the weekend :D`);
//       break;
//    default:
//       console.log(`Not a valid day!`);
// }

if (day === "monday") {
   console.log(`Plan course structure`);
   console.log(`Go to coding meetup`);
} else if (day === "tuesday") {
   console.log(`Prepare theory videos`);
} else if (day === "wednesday" || day === "thursday") {
   console.log(`Write code examples`);
} else if (day === "friday") {
   console.log(`Record videos`);
} else if (day === "saturday" || day === "sunday") {
   console.log(`Enjoy the weekend :D`);
} else {
   console.log(`Not a valid day!`);
}

//////////////////////////////////////

*/
