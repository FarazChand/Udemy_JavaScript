// // 1. Values and Variables
// let country = "Canada";
// let continent = "North America";
// let population = 38;

// console.log(country);
// console.log(continent);
// console.log(population);

// // 2. Data Types
// let isIsland = false;
// let language;

// console.log(typeof isIsland);
// console.log(typeof population);
// console.log(typeof country);
// console.log(typeof language);

//  3. let, const and var (changed above)
// let language = "English or French";
// const country = "Canada";
// const continent = "North America";
// let population = 38;
// const isIsland = false;

// // 4. Basic Operators
// // console.log((population /= 2));
// let halfPopulation = population / 2;
// console.log(halfPopulation);
// population++;
// console.log(population);

// const finlandPopulation = 6;
// let hasMorePeople = population > finlandPopulation;
// console.log(hasMorePeople);

// const averagePopulation = 33;
// hasMorePeople = population > averagePopulation;
// console.log(hasMorePeople);

// const description1 =
//    country +
//    " is in " +
//    continent +
//    ", and its " +
//    population +
//    " million people speak " +
//    language;
// console.log(description1);

// 4. Type Conversion and Coercion

// console.log("9" - "5"); //output: 4, type: number
// console.log("19" - "13" + "17"); //output: 617, type: string
// console.log("19" - "13" + 17); //output: 23, type: number
// console.log("123" < 57); //output: false, type:boolean
// console.log(5 + 6 + "4" + 9 - 4 - 2); //output: 1143, type: number

// 5. Equality Operators: == vs ===

// let numNeighbors = prompt(
//    `How many neighbor countries does your country have?`
// );

// // loose version of the code, not best practice:

// // if (numNeighbors == 1) {
// //    console.log(`Only 1 border!`);
// // } else if (numNeighbors > 1) {
// //    console.log(`More than 1 border.`);
// // } else {
// //    console.log(`No borders.`);
// // }

// if (numNeighbors === 1) {
//    console.log(`Only 1 border!`);
// } else if (numNeighbors > 1) {
//    console.log(`More than 1 border.`);
// } else {
//    console.log(`No borders.`);
// }

// // if the prompted number is exactly 1, it will out put the else statement. This is because the prompt input of '1' is seen as a string, not a number. In order to fix this we would have to explicitly convert the prompted input into numbers using the Number() function.

// numNeighbors = Number(
//    prompt(`How many neighbor countries does your country have?`)
// );

// if (numNeighbors === 1) {
//    console.log(`Only 1 border!`);
// } else if (numNeighbors > 1) {
//    console.log(`More than 1 border.`);
// } else {
//    console.log(`No borders.`);
// }

// // we should always use === in these types of situations because if we don't, we can create hard to spot bugs that result in incorrect output, as shown above with the loose equal operator. It's more organized to keep information that's supposed to represent numbers as having the type: number, instead of having the type: string.

// 6. Logical Operators

// // const speaksEnglish = true;
// // const under50Million = true;
// // const isIsland = false;

// // if (speaksEnglish && under50Million && !isIsland) {
// //   console.log(`This might be the right place for you Sarah.`);
// // } else {
// //   console.log(`Sorry Sarah, this ain't it. 💩`);
// // }

// const population = 38;
// const language = "English";
// const isIsland = false;

// if (language === "English" && population < 50 && !isIsland) {
//    console.log(`This might be the right place for you Sarah.`);
// } else {
//    console.log(`Sorry Sarah, this ain't it. 💩`);
// }

// 7. The Switch Statement

// const language = "arabic";

// switch (language) {
//    case "chinese":
//    case "mandarin":
//       console.log(`MOST number of native speakers!`);
//       break;
//    case "spanish":
//       console.log(`2nd place in number of native speakers`);
//       break;
//    case "english":
//       console.log(`3rd place`);
//       break;
//    case "hindi":
//       console.log(`Number 4`);
//       break;
//    case "arabic":
//       console.log(`5th most spoken language`);
//       break;
//    default:
//       console.log(`Great language too :D`);
// }

// 8. The Conditional Ternary Operator

const country = "Canada";
const population = "39";

// population > 38
//    ? console.log(`${country}'s population is above average.`)
//    : console.log(`${country}'s population is below average.`);

console.log(
   `${country}'s population is ${population > 38 ? "above" : "below"} average.`
);
