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
let language = "English or French";
const country = "Canada";
const continent = "North America";
let population = 38;
const isIsland = false;

// 4. Basic Operators
// console.log((population /= 2));
let halfPopulation = population / 2;
console.log(halfPopulation);
population++;
console.log(population);

const finlandPopulation = 6;
let hasMorePeople = population > finlandPopulation;
console.log(hasMorePeople);

const averagePopulation = 33;
hasMorePeople = population > averagePopulation;
console.log(hasMorePeople);

const description1 =
   country +
   " is in " +
   continent +
   ", and its " +
   population +
   " million people speak " +
   language;
console.log(description1);
