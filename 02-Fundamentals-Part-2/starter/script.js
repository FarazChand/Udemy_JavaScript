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

// function calcAverage(score1, score2, score3) {
//    return (score1 + score2 + score3) / 3;
// }
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

//Data 1
const avgDolphins1 = calcAverage(44, 23, 71);
const avgKoalas1 = calcAverage(65, 54, 49);
//Data 2
const avgDolphins2 = calcAverage(85, 54, 41);
const avgKoalas2 = calcAverage(23, 34, 27);

const checkWinner = function (avgDolphins, avgKoalas) {
   if (avgDolphins >= avgKoalas * 2) {
      console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
      return 100;
   } else if (avgKoalas >= avgDolphins * 2) {
      console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins} )`);
      return 200;
   } else {
      console.log(`Ignored`);
      return 0;
   }
};

const data1 = checkWinner(avgDolphins1, avgKoalas1);
const data2 = checkWinner(avgDolphins2, avgKoalas2);

console.log(data1, data2);
