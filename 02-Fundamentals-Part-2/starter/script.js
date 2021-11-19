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

// // storing related values in an array
// const farazArray = [
//    `Faraz`,
//    `Chand`,
//    2037 - 1993,
//    `teacher`,
//    [`Michael`, `Peter`, `Steven`],
// ];
// console.log(farazArray);

// //storing related values in an object using value pairs, object literal syntax
// const faraz = {
//    firstName: `Faraz`,
//    lastName: `Chand`,
//    age: 2037 - 1993,
//    job: `teacher`,
//    friends: [`Michael`, `Peter`, `Steven`],
// };
// console.log(faraz);

// //Retrieving Data from objects - using dot notation

// console.log(faraz.lastName);
// console.log(faraz.firstName);

// //Retrieving Data from objects - using using bracket notation

// console.log(faraz[`lastName`]);
// console.log(faraz[`firstName`]);

// // Bracket notation can use any expression that results in a property, don't have to explicity write the string
// const nameKey = `Name`;
// console.log(faraz[`first` + nameKey]);
// console.log(faraz[`last` + nameKey]);

// // cannot use expressions in dot notation
// // console.log(faraz.`last` + nameKey); // wont work

// const interestedIn = prompt(
//    `What do you want to know about Faraz? Choose between firstName, lastName, age, job, and friends`
// );
// console.log(interestedIn);
// console.log(faraz.interestedIn); // will produce undefined, value does not exist

// if (faraz[interestedIn]) {
//    console.log(faraz[interestedIn]);
// } else {
//    console.log(
//       `Wrong request! Choose between firstName, lastName, age, job, and friends`
//    );
// }

// // adding properties to an object
// faraz.location = `Canada`;
// faraz[`twitter`] = `@farazChand`;
// console.log(faraz.location);
// console.log(faraz.twitter);

// //Challenge
// //"Faraz has 3 friends, and his best friend is Michael"

// console.log(
//    `${faraz.firstName} has ${
//       faraz[`friends`].length
//    } friends, and his best friend is called '${faraz.friends[0]}'`
// );

////////////////////////////////////////////////////////////////

// const faraz = {
//    firstName: `Faraz`,
//    lastName: `Chand`,
//    gender: `male`,
//    birthYear: 1993,
//    job: `teacher`,
//    friends: [`Michael`, `Peter`, `Steven`],
//    hasDriversLicense: false,

//    // calcAge: function (birthYear) {
//    //    return 2037 - birthYear;
//    // },

//    // calcAge: function () {
//    //    // console.log(this);
//    //    return 2037 - this.birthYear;
//    // },

//    calcAge: function () {
//       // console.log(this);
//       this.age = 2037 - this.birthYear;
//       return this.age;
//    },

//    //Challenge: the jonas way
//    getSummary: function () {
//       return `${this.firstName} is a ${this.calcAge()}-year old ${
//          this.job
//       }, and he has ${this.hasDriversLicense ? `a` : `no`} driver's license.`;
//    },

//    // //extra
//    // calcGender: function () {
//    //    if (this.gender === `male`) {
//    //       this.pronouns = {
//    //          they: `he`,
//    //          their: `his`,
//    //          them: `him`,
//    //       };
//    //    } else if (this.gender === `female`) {
//    //       this.pronouns = {
//    //          they: `she`,
//    //          their: `her`,
//    //          them: `her`,
//    //       };
//    //    } else {
//    //       this.pronouns = {
//    //          they: `they`,
//    //          their: `their`,
//    //          them: `them`,
//    //       };
//    //    }
//    // },
//    // //extra
//    // calcPossession: function () {
//    //    if (
//    //       (this.gender === `male` || this.gender === `female`) &&
//    //       this.hasDriversLicense
//    //    ) {
//    //       this.hasOrNot = `has`;
//    //    } else if (
//    //       (this.gender === `male` || this.gender === `female`) &&
//    //       !this.hasDriversLicense
//    //    ) {
//    //       this.hasOrNot = `does not have`;
//    //    } else if (
//    //       !(this.gender === `male` || this.gender === `female`) &&
//    //       this.hasDriversLicense
//    //    ) {
//    //       this.hasOrNot = `have`;
//    //    } else {
//    //       this.hasOrNot = `do not have`;
//    //    }
//    // },
//    // //extra
//    // getCalcs: function () {
//    //    this.calcAge();
//    //    this.calcGender();
//    //    this.calcPossession();
//    // },

//    // //Challenge: my way, the long and probably wrong way (extra)
//    // getSummary: function () {
//    //    if (this.hasDriversLicense) {
//    //       this.summary = `${this.firstName} is a ${this.age}-year old ${this.job}, and ${this.pronouns.they} ${this.hasOrNot} ${this.pronouns.their} driver's license with ${this.pronouns.them}.`;
//    //    } else {
//    //       this.summary = `${this.firstName} is a ${this.age}-year old ${this.job}, and ${this.pronouns.they} ${this.hasOrNot} ${this.pronouns.their} driver's license with ${this.pronouns.them}.`;
//    //    }

//    //    return this.summary;
//    // },
// };

// // console.log(faraz.calcAge(1993));
// // console.log(faraz[`calcAge`](1993));

// //// Final calcAge
// // console.log(faraz.calcAge());
// // console.log(faraz.age);
// // console.log(faraz.age);
// // console.log(faraz.age);

// //Challenge
// //"Faraz is a 44-year old teacher, and he has a driver's license"
// // faraz.getCalcs(); // extra
// console.log(faraz.getSummary());
// console.log(faraz.getSummary());
// console.log(faraz.getSummary());

////////////////////////////////////////////////////////////////

// const john = {
//    fullName: `John Smith`,
//    mass: 92,
//    height: 1.95,

//    calcBMI: function () {
//       this.BMI = this.mass / this.height ** 2;
//       return this.BMI;
//    },
// };

// const mark = {
//    fullName: `Mark Miller`,
//    mass: 78,
//    height: 1.69,

//    calcBMI: function () {
//       this.BMI = this.mass / this.height ** 2;
//       return this.BMI;
//    },
// };

// console.log(
//    `${john.fullName}'s BMI (${john.calcBMI()})' is ${
//       john.calcBMI() > mark.calcBMI() ? `higher` : `lower`
//    } than ${mark.fullName}'s BMI (${mark.BMI})'`
// );

////////////////////////////////////////////////////////////////

// //bad practice, not DRY
// console.log(`Lifting weights repetition 1 🏋️‍♂️`);
// console.log(`Lifting weights repetition 2 🏋️‍♂️`);
// console.log(`Lifting weights repetition 3 🏋️‍♂️`);
// console.log(`Lifting weights repetition 4 🏋️‍♂️`);
// console.log(`Lifting weights repetition 5 🏋️‍♂️`);
// console.log(`Lifting weights repetition 6 🏋️‍♂️`);
// console.log(`Lifting weights repetition 7 🏋️‍♂️`);
// console.log(`Lifting weights repetition 8 🏋️‍♂️`);
// console.log(`Lifting weights repetition 9 🏋️‍♂️`);
// console.log(`Lifting weights repetition 10 🏋️‍♂️`);

// //for loop keeps running while condition is TRUE
// for (let rep = 1; rep <= 10; rep++) {
//    console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
// }

////////////////////////////////////////////////////////////////

// // Lets console log each index of this array separately
// const farazArray = [
//    `Faraz`,
//    `Chand`,
//    2037 - 1993,
//    `teacher`,
//    [`Michael`, `Peter`, `Steven`],
// ];

// // just for practice
// const types = [];

// ////the wrong way
// // console.log(farazArray[0]);
// // console.log(farazArray[1]);
// // console.log(farazArray[2]);
// // console.log(farazArray[3]);
// // console.log(farazArray[4]);
// // farazArray[5] does not exist, i

// // using a for loop to iterate through the arrays index
// //conditional could also be: i < 5; or i <= 4;
// //if length or array changes, this would become a bug that would need to be updated
// for (let i = 0; i < farazArray.length; i++) {
//    //reading from first array
//    console.log(farazArray[i], typeof farazArray[i]);

//    // // storing the type of the first array in the new types array at the corresponding index
//    // types[i] = typeof farazArray[i];

//    // using the push method to do the same thing as above
//    types.push(typeof farazArray);
// }

// console.log(types);

// const years = [1991, 2007, 1969, 2020];

// const ages = [];

// for (let i = 0; i < years.length; i++) {
//    // ages[i] = 2037 - years[i];
//    ages.push(2037 - years[i]);
//    console.log(`Age #${i + 1}: ${ages[i]} years old.`);
// }
// console.log(ages);

// //continue and break

// console.log(`--- ONLY STRINGS ---`);
// for (let i = 0; i < farazArray.length; i++) {
//    if (typeof farazArray[i] !== `string`) continue; // skips to next iteration if true
//    console.log(farazArray[i], typeof farazArray[i]);
// }

// console.log(`--- BREAK WITH NUMBER ---`);
// for (let i = 0; i < farazArray.length; i++) {
//    if (typeof farazArray[i] === `number`) break; // exits entire for loop if true
//    console.log(farazArray[i], typeof farazArray[i]);
// }

////////////////////////////////////////////////////////////////

// const farazArray = [
//    `Faraz`,
//    `Chand`,
//    2037 - 1993,
//    `teacher`,
//    [`Michael`, `Peter`, `Steven`],
// ];

// // 0, 1, ..., 4 looping forwards
// // 4, 3, ..., 0 looping backwards

// for (let i = farazArray.length - 1; i >= 0; i--) {
//    console.log(i, farazArray[i]);
// }

// for (let exercise = 1; exercise <= 3; exercise++) {
//    console.log(`--- Starting Exercise #${exercise} ---`);
//    for (let rep = 1; rep <= 5; rep++) {
//       console.log(`Exercise #${exercise}: Rep #${rep} done!`);
//    }
//    console.log(`Exercise #${exercise} finished!!!`);
// }

////////////////////////////////////////////////////////////////

// for (let rep = 1; rep <= 10; rep++) {
//    console.log(`Lifting weights repetition ${rep} 🏋️‍♂️`);
// }

// let rep = 1;
// while (rep <= 10) {
//    // console.log(`WHILE-LOOP:Lifting weights repetition ${rep} 🏋️‍♂️`);
//    rep++;
// }

// //create a dice variable
// let dice = Math.trunc(Math.random() * 6) + 1;
// // console.log(dice);
// if (dice === 6) {
//    console.log(`You rolled a 6! GAME OVER before it even started..`);
// }

// while (dice !== 6) {
//    console.log(`You rolled a ${dice}!`);
//    dice = Math.trunc(Math.random() * 6) + 1;

//    if (dice === 6) {
//       console.log(`You rolled a 6! GAME OVER!`);
//    }
// }

////////////////////////////////////////////////////////////////

// Coding Challenge #4

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = (bill) =>
   bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

const calcTotal = (bill, total) => bill + total;

const calcAverage = function (arr) {
   let sum = 0;
   for (let i = 0; i < arr.length; i++) {
      // sum = sum + arr[i];
      sum += arr[i];
   }
   return sum / arr.length;
};

for (let i = 0; i < bills.length; i++) {
   tips.push(calcTip(bills[i]));
   totals.push(calcTotal(bills[i], tips[i]));
}
console.log(bills, tips, totals);
console.log(calcAverage(totals));
console.log(calcAverage(tips));
console.log(calcAverage(bills));

console.log(Math.trunc(10.079 * 100) / 100);
console.log(10 ** 0);

const roundNumber = function (value, decimalPlace) {
   let x = Number(Math.round(value + "e" + decimalPlace) + `e-` + decimalPlace);
   console.log(value, x);
};

roundNumber(5.555, 2);
console.log(Math.round(17.5 * 1) / 1); //works
console.log(Math.round(10.75 * 10) / 10); // works
console.log(Math.round(10.075 * 100) / 100); // doesn't round correctly as you increase decimal places..
console.log(Number(Math.round(10.075 + `e2`) + `e-2`)); // works once change to exponential notation
