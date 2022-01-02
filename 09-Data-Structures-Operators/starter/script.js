'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[2 + 3]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // hours: openingHours,
  // Enhanced object Literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log('called');
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
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

//////////////////////////////////////////

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

// // Logical Assignment Operators

// const rest1 = {
//   name: 'Capri',
//   // numGuests: 20,
//   numGuests: 0,
// };

// const rest2 = {
//   name: 'La Piazza',
//   owner: 'Giovanni Rossi',
// };

// //OR assignment operator
// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;
// // rest1.numGuests ||= 10;   // 0 will short circuit
// // rest2.numGuests ||= 10;

// // nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10; // 0 will not short circuit, just undefined and null
// rest2.numGuests ??= 10;

// // AND assignment operator
// // rest1.owner = rest1.owner && '<ANONYMOUS>';
// // rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1);
// console.log(rest2);

//////////////////////////////////////////

// CODING CHALLENGE 1

//////////////////////////////////////////

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// // 1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3.

// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, 'Thiggo', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// // 5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// //6.
// const printGoals = function (...players) {
//   for (let i = 0; i < players.length; i++) {
//     console.log(players[i]);
//   }
//   console.log(`${players.length} goal(s) were scored.`);
// };

// // TEST
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals(...game.scored);

// // 7.

// team1 < team2 && console.log(team1, 'Team 1 is the Likely winner');
// team1 > team2 && console.log(team2, 'Team 2 is the Likely winner');

//////////////////////////////////////////

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// // Old way, normal for loop
// // for (let i = 0; i < menu.length; i++) {
// //   console.log(menu[i]);
// // }

// // new way, for of loop - gives current element
// for (const item of menu) console.log(item);

// // to get index
// // for (const item of menu.entries()) {
// //   console.log(`${item[0] + 1}: ${item[1]}`);
// // }

// for (const [i, el] of menu.entries()) {
//   console.log(`${i}: ${el}`);
// }

// console.log([...menu.entries()]);

//////////////////////////////////////////

// //Optional Chaining

// //Without
// if (restaurant.openingHours && restaurant.openingHours.mon) {
//   console.log(restaurant.openingHours.mon.open);
// }

// if (restaurant.openingHours && restaurant.openingHours.fri) {
//   console.log(restaurant.openingHours.fri.open);
// }

// //With Optional Chaining
// console.log(restaurant.openingHours.mon?.open); //checks if mon exists then accesses
// // returns undefined if property does not exist

// // checks both properties, both exist, returns value
// console.log(restaurant.openingHours?.fri?.open);

// //Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const [i, day] of days.entries()) {
//   const open =
//     restaurant.openingHours[day]?.open ?? `... actually we are closed`;
//   console.log(`On ${day} we open at ${open}`);
// }

// //Methods
// console.log(restaurant.order?.(0, 1) ?? `Method does not exist`);
// console.log(restaurant.orderALL?.(0, 1) ?? `Method does not exist`);

// //Arrays
// const users = [{ name: `Jonas`, email: `hello@jonas.io` }];

// console.log(users[0]?.name ?? `User does not exist`);
// console.log(users[1]?.name ?? `User does not exist`);

//////////////////////////////////////////

// Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);
// let openStr = `We are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Entire Object
// const entries = Object.entries(openingHours);
// console.log(entries);

// for (const [key, { open: o = 0, close: c = 0 }] of Object.entries(
//   openingHours
// )) {
//   console.log(`On ${key} we are open at ${o} and close at ${c}`);
// }

//////////////////////////////////////////

// // CODING CHALLENGE

// // 1.
// // - Loop over game.scored, print each name
// // - Ex: "Goal 1: Lewandowski"

// for (const [i, name] of game.scored.entries()) {
//   console.log(`Goal ${i + 1}: ${name}`);
// }

// // 2.
// // - Use a loop to calculate the average odd
// // - log to console

// let odds = Object.values(game.odds);
// let totalOdds = 0;
// for (const odd of odds) {
//   totalOdds += odd;
// }
// let avgOdds = totalOdds / odds.length;
// console.log(avgOdds);

// // 3.
// // - Print the 3 odds to the console in a formatted way
// //  - Get team names directly from the game object, only hardcode "draw":
// //      `Odd of victory team1: value`
// //      `Odd of draw team1: value`
// //      `Odd of victory team2: value`

// // console.log(`Odd of victory ${game.team1}: ${odds[0]}`);
// // console.log(`Odd of draw : ${odds[1]}`);
// // console.log(`Odd of victory ${game.team2}: ${odds[2]}`);

// const keyPairs = Object.entries(game.odds);
// console.log(keyPairs);

// for (const [key, value] of keyPairs) {
//   // console.log(key);

//   // //New new way
//   key === `x` && console.log(`Odd of draw: ${value}`);
//   key !== 'x' && console.log(`Odd of victory ${game[key]}: ${value}`);

//   // // New way not working
//   // !(key === `x`) &&
//   //   console.log(`Odd of draw: ${value}`) &&
//   //   console.log(`Odd of victory ${game[key]}: ${value}`);

//   // Old way
//   // if (key === `x`) {
//   //   console.log(`Odd of draw: ${value}`);
//   //   continue;
//   // }
//   // console.log(`Odd of victory ${game[key]}: ${value}`);
// }

// // BONUS
// // - Create object called 'scorers'
// // - contains the names of the players who scored as properties(keys)
// // - contains the number of goals as the value

// const scorers = {};

// for (const [i, name] of game.scored.entries()) {
//   //  1st Way:
//   scorers[name] ??= 0;
//   scorers[name]++;
//   console.log(name, scorers[name]);

//   // 2nd Way:
//   // scorers[name] &&= scorers[name] + 1;
//   // scorers[name] ??= 1;
//   // console.log(name, scorers[name]);
// }

// console.log(scorers);

//////////////////////////////////////////

// // ****** Sets ******

// // A collection of unique values, cannot have any duplicates:
// const orderSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(orderSet);

// // - Similar to an array
// // - No Key Value pairs, just a bunch of values grouped into an array
// // - Sets are iterables
// // - Sets are still very different from arrays
// // - its elements are unique
// // - the order of elements in a set is irrelevant

// // - can pass in a string because it is also an iterable:
// console.log(new Set('Jonas'));
// // - can also have an empty set:
// console.log(new Set());

// // - can get the size of a set with the 'size' method:
// console.log(orderSet.size);

// // - can check if a certain element is in a set with the 'has' method:
// console.log(orderSet.has('Pizza')); // true
// console.log(orderSet.has('Bread')); // false

// // - can add new elements to a set with the 'add' method:
// orderSet.add('Garlic Bread');
// orderSet.add('Garlic Bread'); // will be ignored, not unique
// console.log(orderSet);

// // - can also delete elements with the 'delete' method:
// orderSet.delete('Risotto');
// console.log(orderSet);

// // - can delete all the values within a set using the 'clear' method:
// // orderSet.clear();
// console.log(orderSet);

// // - cannot retrieve values from a set
// // - there are no indexes in a set, no way of getting values out of a set
// // - we only need to know if a certain value exists in a set or not (has)
// // - if you needed to retrieve values you would just use an array

// // - since sets are iterable, we can loop over them:
// for (const order of orderSet) console.log(order);

// // - a normal application of sets in a real coding scenario would be to remove
// //   duplicate values of arrays

// // Example:

// // An array that contains all the staff of the restaurant:
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// // What are the unique positions of this restaurant?
// const uniqueStaff = [...new Set(staff)];
// console.log(uniqueStaff);

// // - We also put the new set inside of an array and used the spread operator in order
// //   to unpack the results of the set into a new array that we can now work with
// // - Remember that we can use the spread operator on sets because they are iterable

// // if we just wanted to know the size of the set
// console.log(new Set(staff).size); // 3

// // can count how many unique letters there are in a string
// console.log(new Set('jonasschmedtmann').size); // 11

// // Conclusion

// // - Sets are not intended to replace arrays
// // - If you need to manipulate data or have duplicate data or have data in an order,
// //   just stick to arrays
// // - Sets are useful because they can only have unique elements
// // - Sets can remove duplicates from an array
// // - Sets also have very straight forward methods
// // - Overall, not as important as arrays but still useful

//////////////////////////////////////////

// // ****** Maps: Basics ******

// // - a data structure we can use to map values to keys, like an object
// // - unlike objects, in maps - the keys can have any type (objects, arrays, numbers)
// // - can lead to really advanced uses
// // - Much more useful than sets

// // creating an empty map:
// const rest = new Map();

// // adding key value pairs to the map using the 'set' method:
// // first value is the key, second is the value
// rest.set('name', 'Classico Italiano');

// // can use any datatype that we want:
// rest.set(1, 'Firenze, Italy');

// // when 'set' is called, it returns the updated map:
// console.log(rest.set(2, 'Lisbon, Portugal'));

// // since it returns the updated map, we can chain the 'set' method:
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('closed', 23)
//   .set(true, 'we are open :D')
//   .set(false, 'we are closed :(');

// // in order to read data from a map we use the 'get' method:
// console.log(rest.get('name'));
// console.log(rest.get(true));
// console.log(rest.get(1));
// console.log(rest.get('true')); // undefined, datatype matters
// console.log(rest.get('1')); // undefined, datatype matters

// // the fact that we can use boolean types as keys is useful:
// let time = 20;
// // evaluates to boolean value, should be true in this case
// console.log(rest.get(time > rest.get('open') && time < rest.get('closed')));

// // should be false in this case
// time = 8;
// console.log(rest.get(time > rest.get('open') && time < rest.get('closed')));
// // - clever, but not very readable. Should not be overused
// // - this just shows us the power of using boolean as map keys

// // More Map Methods:

// // check if a certain map has a certain key by passing the key to the 'has' method:
// console.log(rest.has('categories')); //true

// // can also delete elements from the map by passing the key to the 'delete' method:
// rest.delete(2);
// console.log(rest);
// // Note: objects have similar methods as 'has' and 'delete' that will be covered later

// // maps also have the size property:
// console.log(rest.size);

// // can also remove all the elements from the map using the 'clear' method:
// //rest.clear();

// // using arrays or objects as map keys:
// rest.set([1, 2], 'Test');
// console.log(rest);
// console.log(rest.get([1, 2])); // returns undefined, the two arrays are not the same object

// const arr = [1, 2];
// rest.set(arr, 'Test');
// console.log(rest.get(arr)); // will work :D

// // can be useful with DOM elements (nothing more than a special type of object)
// rest.set(document.querySelector('h1'), 'Heading');

// // ******* Maps: Iteration: *******

// // - we can populate a new map without having to use the set method
// // - less cumbersome when there are a lot of values

// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'Correct 🎉'],
//   [false, 'Try again!'],
// ]);
// console.log(question);

// // - easy to add a bunch of key values when creating a new Map
// // - should still use the set method when adding new key values after creation

// // Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // - iteration is possible on maps because maps are iterables
// // - we did something similar with objects previously, but needed the entries method
// // - objects are not iterables but can be converted into iterables using that method

// // Quiz app
// console.log(question.get('question'));

// // Lets only log the elements with keys that have the type of 'number'
// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
// }
// // const answer = Number(prompt('Your answer'));
// const answer = 3;
// // Lets check if the answer is correct, then let the user know
// console.log(question.get(answer === question.get('correct')));

// // Convert Map to array
// console.log([...question]);
// console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]);

//////////////////////////////////////////

// Which data structure to use?

// Where can data come from?
// 1. From the program itself: Written directly in source code
// 2. From the UI: Data input from the user or data written in DOM
// 3. From external sources: Data fetched for example from web API

// - No matter where the data comes from, we usually have collections of data
// - we store these collections of data inside data structures

// - 4 types of data structures that we have learned so far:
//    - objects
//    - arrays
//    - maps
//    - sets

// But which one do we use?

// If you need a simple list of values: Array or Set
// - values without any description

// If you need key value pairs: Object or Map
// - values have a description using the key

// - NOTE: when we fetch data through web APIs, it's usually in a JSON format which is easily
//   converted into an object

// There are other BUILT-IN data structures:
// - WeakMap
// - WeakSet

//There are also other NON-BUILT-IN data structures:
// - Stacks
// - Queues
// - Linked lists
// - Trees
// - Hash tables

// Arrays:
// - use when you need ordered list of values that might contain duplicates
// - use when you need to manipulate data

// Sets:
// - only used when working with unique values
// - use when high-performance is really important (searching or deleting an item)
// - use to remove duplicates from arrays

// Objects:
// - more "traditional" key/value store ("abused" objects)
// - easier to write and access values with . and []
// - most developers are used to objects
// - some technical disadvantages
// - USE when you need to include functions(methods)
// - USE when working with JSON (can convert to map later if needed)

// Maps:
// - Better performance
// - Keys can have any data type
// - Easy to iterate
// - Easy to compute size
// - USE when you simply need to map key values
// - USE when you need keys that are not strings

//////////////////////////////////////////

// // Coding Challenge #3:

// const gameEvents = new Map([
//   [17, '⚽️ GOAL'],
//   [36, '🔁 Substitution'],
//   [47, '⚽️ GOAL'],
//   [61, '🔁 Substitution'],
//   [64, '🔶 Yellow card'],
//   [69, '🔴 Red card'],
//   [70, '🔁 Substitution'],
//   [72, '🔁 Substitution'],
//   [76, '⚽️ GOAL'],
//   [80, '⚽️ GOAL'],
//   [92, '🔶 Yellow card'],
// ]);

// // 1. Create an array 'events' of the different game events that happened (no duplicates)
// // - use the 'values' method on the map to isolate the map values into its own array
// // - create a new Set that equals this array in order to remove duplicates
// // - creat a new array that contains the spread out Set

// const events = [...new Set(gameEvents.values())];
// // const events = [...new Set([...gameEvents.values()])]; // not needed
// console.log(events);

// // 2. The yellow card from minute 64 was unfair, remove this even from the game events.
// // - we can just use the delete method to remove this

// gameEvents.delete(64);
// console.log(gameEvents);

// // 3. Log a string that states how often an event happened:
// // - we can use the 'size' method to get the size of the map (how many events happened)
// // - we can calculate the average by dividing the total time by the map size
// // - simply log this to the console with template literals

// //BONUS: (find how long the game lasts)
// const time = [...gameEvents.keys()].pop();
// console.log(time);

// console.log(`An event happened, on average, every ${time / gameEvents.size}`);

// // 4. Loop events and log to console, state whether the event happens in first or second half
// //    E.g:  [FIRST HALF] 17: ⚽️ GOAL
// //  - we need to loop, so lets use a 'for of' loop on the whole map
// //      -> we need to make sure we deconstruct the Map into keys and values
// // - during each loop we need to see if the key is > or < than 45, consolelog accordingly

// for (const [minute, events] of gameEvents) {
//   const half = minute < 45 ? 'FIRST' : 'SECOND';
//   console.log(`[${half} HALF] ${minute}: ${events}`);
// };

//////////////////////////////////////////

// Working with Strings

const airline = 'TAP Air Portugal';
const plane = 'A320';

// can specify strings index:
console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2
console.log('B737'[0]); // logs 'B'

// can also read length property:
console.log(airline.length);
console.log('B737'.length);

// strings also have methods, like arrays
console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('Portugal')); // 8, case sensitive
console.log(airline.indexOf('portugal')); //-1, not found

// Can extract part of a string using the 'slice' method:
// - slice method needs indexes as arguments
// - since strings are primitive, they cannot be mutated
// - this means that the original string is not changed
// - instead this method creates a sub string
// - this substring must be stored in a variable/DS if
//   you want to use it
console.log(airline.slice(4)); // Air Portugal -> sub string
console.log(airline.slice(4, 7)); // Air, end value not included

// Lets extract the first word, then the last word. Lets pretend
// we don't know any information about the string:
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// can give a negative index, starts counting from the end
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log(`Middle seat.`)
    : console.log('Not a middle seat');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('Jonas')); // string object
console.log(typeof new String('Jonas'));
console.log(typeof new String('Jonas').slice(1)); // string object

// strings are primitive, so why can we call methods on them?
// when we call a method on a string, its converted into a string object, which allows us to use methods on them
// all string methods return primitive strings back
