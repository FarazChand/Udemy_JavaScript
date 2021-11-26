// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = '23';

// const calcAge = birthYear => 2037 - birthYear;

// console.log(calcAge(1991));

////////////////////////////////////////////////////////////

// // PROBLEM 1:
// // We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

// const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// // 1) Understanding the problem
// // - What is temperature amplitude? Answer: difference between highest and lowest temp
// // -How to compute max and min temperatures?
// // - What's a sensor error? And what to do?

// // 2) Breaking up into sub-problems
// // - How to ignore errors?
// // - Find max value in temp array
// // - Find min value in temp array
// // - Subtract min from max and return it = amplitude

// const calcTempAmplitude = function (temps) {
//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     if (typeof temps[i] !== 'number') continue;

//     let curTemp = temps[i];
//     max = curTemp > max ? curTemp : max;
//     min = curTemp < min ? curTemp : min;
//   }
//   return max - min;
// };

// console.log(calcTempAmplitude(temperatures));

// // PROBLEM 2:
// //  Function should now receive 2 arrays of temperatures.

// // 1) Understanding the problem
// // - With 2 arrays, should we implement functionality twice?
// // NO! Just merge two arrays

// // 2) Breaking up into sub-problems
// // - How do we merge 2 arrays?

// const calcTempAmplitudeNew = function (t1, t2) {
//   let temps = t1.concat(t2);

//   let max = temps[0];
//   let min = temps[0];

//   for (let i = 0; i < temps.length; i++) {
//     if (typeof temps[i] !== 'number') continue;

//     let curTemp = temps[i];
//     max = curTemp > max ? curTemp : max;
//     min = curTemp < min ? curTemp : min;
//   }
//   return max - min;
// };

// console.log(calcTempAmplitudeNew(temperatures, [18, 0, 2, 4, -7]));

////////////////////////////////////////////////////////////

// const measureKelvin = function () {
//   const measurement = {
//     type: `temp`,
//     unit: `celsius`,
//     // C) FIX
//     value: Number(prompt(`Degrees celsius:`)),
//   };

//   // B) FIND
//   console.log(measurement);
//   console.table(measurement);

//   // console.log(measurement.value);
//   // console.warn(measurement.value);
//   // console.error(measurement.value);

//   const kelvin = measurement.value + 273;
//   return kelvin;
// };
// // A) IDENTIFY
// console.log(measureKelvin());

////////////////////////////////////////////////////////////

// Example: [17,21,23] will print "... 17 C in 1 days ... 21 C in 2 days ... 23 C in 3 days ..."
// TEST DATA 1: [17, 21, 23]
// TEST DATA 2: [12, 5, -5, 0, 4]

// 1) Understanding the problem
// - how do we map the array to display like the example?
// - how do we make sure the function can use an array of any length?
// - how do we make it look like the example text "... 17 C in 1 days ..." etc

// 2) Breaking up into sub-problems
// - make a new variable to hold the desired string
// - create a function called 'printForecast'
//    - takes in an array and logs a string like the example to the console
// - define the codeblock of the function:
//    - need to loop through the array starting at the first index, (i=0)
//    - need to loop through each index (i++)
//    - need to stop looping at the end of the array (i<arr.length)
//
//    - use the index of the current loop as well as the value and add to the string
//      at the end of the loop
//

const testData1 = [17, 21, 23];
const testData2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let newString = ``;

  for (let i = 0; i < arr.length; i++) {
    newString += `... ${arr[i]} C in ${i + 1} days `;
  }
  return newString + `...`;
};

console.log(printForecast(testData1));
console.log(printForecast(testData2));
