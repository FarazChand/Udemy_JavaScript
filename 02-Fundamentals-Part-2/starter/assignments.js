"use strict";

// 1. Functions

// function describeCountry(country, population, capitalCity) {
//    const countryDescription = `${country} has ${population} million people and its capital city is ${capitalCity}`;

//    return countryDescription;
// }

// const canadaDescription = describeCountry(`Canada`, 38, `Ottowa`);
// const usDescription = describeCountry(`US`, 330, `Washington`);
// const finlandDescription = describeCountry(`Finland`, 6, `Helsinki`);

// console.log(canadaDescription);
// console.log(usDescription);
// console.log(finlandDescription);

// 2. Function Declarations vs Expressions

// function percentageOfWorld1(population) {
//    return (population / 7900) * 100;
// }

// const canadaPopulationPercentage1 = percentageOfWorld1(38);
// const usPopulationPercentage1 = percentageOfWorld1(330);
// const finlandPopulationPercentage1 = percentageOfWorld1(6);

// console.log(canadaPopulationPercentage1);
// console.log(usPopulationPercentage1);
// console.log(finlandPopulationPercentage1);

// //break
// console.log(`-------------------`);
// //break

// const percentageOfWorld2 = function (population) {
//    return (population / 7900) * 100;
// };

// const canadaPopulationPercentage2 = percentageOfWorld1(38);
// const usPopulationPercentage2 = percentageOfWorld1(330);
// const finlandPopulationPercentage2 = percentageOfWorld1(6);

// console.log(canadaPopulationPercentage2);
// console.log(usPopulationPercentage2);
// console.log(finlandPopulationPercentage2);

// //break
// console.log(`-------------------`);
// //break

// 3. Arrow Functions

// const percentageOfWorld3 = (population) => (population / 7900) * 100;

// const canadaPopulationPercentage3 = percentageOfWorld1(38);
// const usPopulationPercentage3 = percentageOfWorld1(330);
// const finlandPopulationPercentage3 = percentageOfWorld1(6);

// console.log(canadaPopulationPercentage3);
// console.log(usPopulationPercentage3);
// console.log(finlandPopulationPercentage3);

// 4. Functions calling Other Functions

// function percentageOfWorld1(population) {
//    return (population / 7900) * 100;
// }

// // const describePopulation3 = (country, population) => {};
// // function describePopulation2(country, population){};

// const describePopulation1 = function (country, population) {
//    const percentagePopulation = percentageOfWorld1(population);

//    return `${country} has ${population} million people, which is about ${percentagePopulation}% of the world`;
// };

// console.log(describePopulation1(`Canada`, 38));
// console.log(describePopulation1(`US`, 330));
// console.log(describePopulation1(`Finland`, 6));

// 5. Introduction to Arrays

// const populations = [38, 330, 6, 1402];

// console.log(populations.length === 4);

// function percentageOfWorld(population) {
//    return (population / 7900) * 100;
// }

// const percentages = [
//    percentageOfWorld(populations[0]),
//    percentageOfWorld(populations[1]),
//    percentageOfWorld(populations[2]),
//    percentageOfWorld(populations[populations.length - 1]),
// ];

// console.log(percentages);

// 6. Basic Array Operations(Methods)

// const neighbours = [`USA`, `Mexico`, `NP`];
// console.log(neighbours);

// neighbours.push(`Utopia`);
// console.log(neighbours);

// neighbours.pop();
// console.log(neighbours);

// if (!neighbours.includes(`Germany`)) {
//    console.log(`Probably not a European country :D`);
// } else {
//    console.log(`Must be a European country :D`);
// }

// neighbours[neighbours.length - 1] = `North Pole`;
// console.log(neighbours);

// 7. Introduction to Objects

const myCountry = {
   country: `Canada`,
   capital: `Ottowa`,
   language: `English`,
   population: 38,
   neighbors: [`US`, `Mexico`, `NP`],
};

console.log(myCountry);

// 8. Dot vs Bracket Notation

console.log(
   `${myCountry.country} has ${myCountry.population} million ${myCountry.language} speaking people, ${myCountry.neighbors.length} neighbouring countries and a capital called ${myCountry.capital}.`
);

// myCountry.population = Number.parseInt(myCountry.population) + 2;
// myCountry.population = myCountry[`population`] - 2;
myCountry.population += 2;
console.log(myCountry.population);

// myCountry[`population`] = 36;
myCountry[`population`] -= 2;
console.log(myCountry.population);
