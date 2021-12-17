'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log('called');
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

//////////////////////////////////////////

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// const test1 = {
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// };

// restaurant.orderDelivery(test1);

// // Destructuring Objects

// // Basic Destructuring
// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// // Renaming variables
// const {
//   name: restaurantName, // property: newVariableName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Default Values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters); // menu doesn't exist, default value is empty

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// ({ a, b } = obj);
// console.log(a, b);
// a = 100;
// console.log(obj.a, a);

// //Nested Objects
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// const {
//   openingHours: {
//     fri: { open: o, close: c },
//   },
// } = restaurant;
// console.log(o, c);

//////////////////////////////////////////

// DESTRUCTURING ARRAYS

// const arr = [2, 3, 4];
// // Retrieving indexes and storing into variables normally
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// // Destructuring array
// const [x, y, z] = arr; // same result as above, different variables

// console.log(a, b, c);
// console.log(x, y, z);
// console.log(arr); // original array still exists

// ////

// // dont have to take all of the elements, takes them in order
// // leave a hole to skip elements
// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// // // switching variables without destructuring
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// // console.log(restaurant.categories); // test

// // switching variable with destructuring
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// console.log(restaurant.order(2, 0));

// // Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// //Nested Destructuring
// const nested = [2, 3, [5, 6]];
// // const [i, , j, k] = nested;
// // console.log(i, j, k);

// // const [i, , [j, k]] = nested;
// // console.log(i, j, k);

// //Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

//////////////////////////////////////////

// // Spread Operator

// // Combining arrays the bad way
// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// // Combining arrays using the spread operator
// const newArr = [1, 2, ...arr];
// console.log(newArr); // same result, less code

// console.log(newArr); // logs the whole array as one value

// console.log(...newArr); // logs each individual value in array
// console.log(1, 2, 7, 8, 9); // same as above

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// const test1 = [newArr];
// const test2 = [...newArr];
// console.log(test1, test2);

// // Creating shallow copies of an array
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 or more arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// // Iterables: arrays, strings, maps, sets. NOT objects
// const str = 'Jonas';
// const letters = [...str, '', 's'];
// console.log(letters);
// console.log(...str); // J o n a s
// // console.log(`${...str}`); // will not work

// // //Real-world Example
// // const ingredients = [
// //   prompt("Let's make pasta! Ingredient 1?"),
// //   prompt('Ingredient 2?'),
// //   prompt('Ingredient 3?'),
// // ];
// // console.log(ingredients);

// // // noob way off passing an array as an argument
// // restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

// // //using the spread operator to pass an array as an argument
// // restaurant.orderPasta(...ingredients);

// //Objects
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
// console.log(newRestaurant);

// // creates shallow copy of object
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// // proof it's shallow
// restaurantCopy.starterMenu[0] = 'LOLOLOL';
// console.log(restaurant.starterMenu[0]);

//////////////////////////////////////////

// CODE WAR PROBLEM

// function expressionMatter(a, b, c) {
//   const outputList = [
//     a + b + c,
//     a + b * c,
//     (a + b) * c,
//     a + b * c,
//     a * (b + c),
//     a * b + c,
//     a * b * c,
//   ];

//   let high = outputList[0];

//   for (let i = 1; i < outputList.length; i++) {
//     if (high < outputList[i]) {
//       high = outputList[i];
//     }
//   }
//   return high;
// }

// REFACTORED

// function expressionMatter(a, b, c) {
//   const outputList = [
//     a + b + c,
//     a + b * c,
//     (a + b) * c,
//     a + b * c,
//     a * (b + c),
//     a * b + c,
//     a * b * c,
//   ];

//   const high = Math.max(...outputList);
//   return high;
// }

// //TESTING
// console.log(expressionMatter(2, 1, 2));
// console.log(expressionMatter(2, 1, 1));
// console.log(expressionMatter(1, 1, 1));
// console.log(expressionMatter(1, 2, 3));
// console.log(expressionMatter(1, 3, 1));
// console.log(expressionMatter(2, 2, 2));

// console.log(expressionMatter(2, 10, 3));
// console.log(expressionMatter(1, 8, 3));
// console.log(expressionMatter(9, 7, 2));
// console.log(expressionMatter(1, 2, 3));
// console.log(expressionMatter(1, 3, 1));
// console.log(expressionMatter(2, 2, 2));

//////////////////////////////////////////

// REST OPERATOR

// //-- 1) Destructuring --

// // SPREAD because on RIGHT side of =
// const arr = [1, 2, ...[3, 4]];

// // REST, because on LEFT side of =
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);
// // REST must be last, can only be one

// // REST with objects
// let { sat, ...weekdays } = restaurant.openingHours;
// console.log(sat, weekdays);

// // proof of shallow copy
// sat.open = 'loloolol';
// console.log(sat.open);
// console.log(restaurant.openingHours.sat.open);

// // -- 2)  Functions --
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// // using a spread operator as an argument to be compressed by a rest parameter
// const x = [23, 5, 6];
// add(...x);

// //
// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

// // Short Circuiting (&& and ||)

// // Use ANY data type, return ANY data type, short-circuiting

// console.log(`----- OR -----`);

// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'hello' || 23 || null);

// restaurant.numGuests = 0; // bug, will skip because false (see end)
// // restaurant.numGuests = 23;|

// // normal ternary operator to set default value
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// // using the || operator to set default value
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2);

// console.log(`----- AND -----`);

// console.log(0 && 'Jonas');
// console.log(7 && 'Jonas');

// console.log('Hello' && 23 && null && `Jonas`);

// //normal if statement
// // if (restaurant.orderPizza) {
// //   restaurant.orderPizza('mushrooms', 'spinach');
// // }

// // restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// //end
// // using Nullish Coalescing operator to allow 0 to work
// //Nullish: null and undefined (Not 0 or '');
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);

// Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

//OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;   // 0 will short circuit
// rest2.numGuests ||= 10;

// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10; // 0 will not short circuit, just undefined and null
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);
