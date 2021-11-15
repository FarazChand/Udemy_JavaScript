"use strict";

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log(`I can drive :D`);

// // Reserved words...
// // const interface = "Audio";
// // const private = 312;
// // const if = 123;

////////////////////////////////////////////////////////////////

// function logger() {
//    console.log("My name is Jonas");
// }

// // calling / running / invoking function
// logger();
// logger();
// logger();

// function fruitProcessor(apples, oranges) {
//    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//    return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);
// // console.log(fruitProcessor(5, 0));

// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

// const num = Number("23");

////////////////////////////////////////////////////////////////

// // Function declaration

// function calcAge1(birthYear) {
//    return 2037 - birthYear;
// }
// const age1 = calcAge1(1991);

// //Function expression
// const calcAge2 = function (birthYear) {
//    return 2037 - birthYear;
// };
// const age2 = calcAge2(1991);

// console.log(age1, age2);

// console.log(`You are ${calcAge1(1991)} years old`);

////////////////////////////////////////////////////////////////

// //Arrow function
// const calcAge3 = (birthYear) => 2037 - birthYear;

// const age3 = calcAge3(1991);
// console.log(age3);

// const yearUntilRetirement = (birthYear, firstName) => {
//    const age = 2037 - birthYear;
//    const retirement = 65 - age;
//    //  return retirement;
//    return `${firstName} retires in ${retirement} years`;
// };

// console.log(yearUntilRetirement(1991, `Faraz`));
// console.log(yearUntilRetirement(1980, `Bob`));

////////////////////////////////////////////////////////////////

// function cutFruitPieces(fruit) {
//    return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//    const applePieces = cutFruitPieces(apples);
//    const orangePieces = cutFruitPieces(oranges);

//    const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.`;
//    return juice;
// }

// console.log(fruitProcessor(2, 3));

////////////////////////////////////////////////////////////////

//Arrow function

// const calcAge = function (birthYear) {
//    return 2037 - birthYear;
// };

// const yearUntilRetirement = function (birthYear, firstName) {
//    const age = calcAge(birthYear);
//    const retirement = 65 - age;

//    if (retirement > 0) {
//       console.log(`${firstName} retires in ${retirement} years`);
//       return retirement;
//    } else {
//       console.log(`${firstName} has already retired 🎉`);
//       return -1;
//    }

//    // return `${firstName} retires in ${retirement} years`;
// };

// console.log(yearUntilRetirement(1991, "Bob"));
// console.log(yearUntilRetirement(1950, "Mike"));

////////////////////////////////////////////////////////////////

// Coding Challenge #1

// // function calcAverage(score1, score2, score3) {
// //    return (score1 + score2 + score3) / 3;
// // }
// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// //Data 1
// const avgDolphins1 = calcAverage(44, 23, 71);
// const avgKoalas1 = calcAverage(65, 54, 49);
// //Data 2
// const avgDolphins2 = calcAverage(85, 54, 41);
// const avgKoalas2 = calcAverage(23, 34, 27);

// const checkWinner = function (avgDolphins, avgKoalas) {
//    if (avgDolphins >= avgKoalas * 2) {
//       console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
//       return 100;
//    } else if (avgKoalas >= avgDolphins * 2) {
//       console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins} )`);
//       return 200;
//    } else {
//       console.log(`Ignored`);
//       return 0;
//    }
// };

// const data1 = checkWinner(avgDolphins1, avgKoalas1);
// const data2 = checkWinner(avgDolphins2, avgKoalas2);

// console.log(data1, data2);

////////////////////////////////////////////////////////////////

// const friend1 = `Michael`;
// const friend2 = `Steven`;
// const friend3 = `Peter`;

// const friends = [`Michael`, `Steven`, `Peter`];
// console.log(friends);

// const y = new Array(1991, 1984, 2008, 2020);

// console.log(friends[0]);
// console.log(friends[2]);

// console.log(friends.length);
// console.log(friends[friends.length - 1]);

// friends[2] = `Jay`;
// console.log(friends);

// // cant reassign the array itself but you can reassign the individual elements
// // friends = [`Bob`, `Alice`]; - can't do this
// const firstName = `Faraz`;
// const faraz = [firstName, `Chand`, 2037 - 1993, `teacher`, friends];

// console.log(faraz);
// console.log(faraz.length);

// // Exercise

// const calcAge = function (birthYear) {
//    return 2037 - birthYear;
// };

// const years = [1990, 1967, 2002, 2010, 2018];

// // console.log(calcAge(years));  - can't do this

// const age1 = calcAge(years[0]);
// const age2 = calcAge(years[1]);
// const age3 = calcAge(years[years.length - 1]);

// console.log(age1, age2, age3);

// const ages = [
//    calcAge(years[0]),
//    calcAge(years[1]),
//    calcAge(years[years.length - 1]),
// ];

// console.log(ages);

////////////////////////////////////////////////////////////////

// const friends = [`Michael`, `Steven`, `Peter`];

// // Add elements
// const newLength = friends.push(`Jay`);
// console.log(friends);
// console.log(newLength);

// friends.unshift(`John`);
// console.log(friends);

// // Remove elements
// friends.pop(); // Removes Last
// const popped = friends.pop(); // Returns removed element
// console.log(popped);
// console.log(friends);

// friends.shift(); // Removes First, returns removed element as well
// console.log(friends);

// //Finding index
// console.log(friends.indexOf(`Steven`)); //returns the index of the element in the array
// console.log(friends.indexOf(`Bob`)); // returns -1, element does not exist

// friends.push(23);
// console.log(friends.includes(`Steven`)); // returns true or false based on if element exists in array
// console.log(friends.includes(`Bob`)); // will return false
// console.log(friends.includes(`23`)); // will return false because it uses strict =,23 !== '23'
// console.log(friends.includes(23)); // returns true

// if (friends.includes(`Steven`)) {
//    console.log(`You have a friend called Steven`);
// }

////////////////////////////////////////////////////////////////

// // Coding Challenge #2

// // const bill = 100;
// const bills = [125, 555, 44];

// // function calcTip(bill) {
// //    if (bill >= 50 && bill <= 300) {
// //       // console.log(bill * 0.15);
// //       return bill * 0.15;
// //    } else {
// //       // console.log(bill * 0.2);
// //       return bill * 0.2;
// //    }
// // }

// const calcTip = (bill) =>
//    bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

// const calcTotal = (bill, tip) => bill + tip;

// // calcTip(bill);

// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// console.log(bills);
// console.log(tips);

// // const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
// const total = [
//    calcTotal(bills[0], tips[0]),
//    calcTotal(bills[1], tips[1]),
//    calcTotal(bills[2], tips[2]),
// ];
// console.log(total);

////////////////////////////////////////////////////////////////

// storing related values in an array
const farazArray = [
   `Faraz`,
   `Chand`,
   2037 - 1993,
   `teacher`,
   [`Michael`, `Peter`, `Steven`],
];
console.log(farazArray);

//storing related values in an object using value pairs, object literal syntax
const faraz = {
   firstName: `Faraz`,
   lastName: `Chand`,
   age: 2037 - 1993,
   job: `teacher`,
   friends: [`Michael`, `Peter`, `Steven`],
};
console.log(faraz);

//Retrieving Data from objects - using dot notation

console.log(faraz.lastName);
console.log(faraz.firstName);

//Retrieving Data from objects - using using bracket notation

console.log(faraz[`lastName`]);
console.log(faraz[`firstName`]);

// Bracket notation can use any expression that results in a property, don't have to explicity write the string
const nameKey = `Name`;
console.log(faraz[`first` + nameKey]);
console.log(faraz[`last` + nameKey]);

// cannot use expressions in dot notation
// console.log(faraz.`last` + nameKey); // wont work

const interestedIn = prompt(
   `What do you want to know about Faraz? Choose between firstName, lastName, age, job, and friends`
);
console.log(interestedIn);
console.log(faraz.interestedIn); // will produce undefined, value does not exist

if (faraz[interestedIn]) {
   console.log(faraz[interestedIn]);
} else {
   console.log(
      `Wrong request! Choose between firstName, lastName, age, job, and friends`
   );
}

// adding properties to an object
faraz.location = `Canada`;
faraz[`twitter`] = `@farazChand`;
console.log(faraz.location);
console.log(faraz.twitter);

//Challenge
//"Faraz has 3 friends, and his best friend is Michael"

console.log(
   `${faraz.firstName} has ${
      faraz[`friends`].length
   } friends, and his best friend is called '${faraz.friends[0]}'`
);
