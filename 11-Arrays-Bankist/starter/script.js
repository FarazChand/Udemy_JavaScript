'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Creating DOM Elements
// - always good to pass the data into a function instead of having the function work with a global variable

const displayMovements = function (movements) {
  // reset the html
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    // evaluate the movement and assign its label accordingly
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}</div>
  </div>`;

    // insert html
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

// Calculating and displaying the total balance:
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

calcDisplayBalance(account1.movements);

// Computing Usernames

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*

// Simple Array Methods

// Why do arrays have methods?
// -> methods are functions attatched to objects
// -> having array methods means arrays are objects
// -> array methods are methods that can be called by all arrays in JS
// -> we can see array methods as tools for arrays

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE:
// -> simillar to the string method by the same name
// -> can extract part of any array without changing the original array
// -> will return a new array with only the extracted parts
// -> takes an argument of the starting index for extraction
// -> second argument is optional, tells the method where to stop extracting, does not include the index of the argument, only up to the index of the argument.

console.log(arr.slice(2)); // c,d,e
console.log(arr.slice(2, 4)); // c,d
console.log(arr.slice(-2)); // last two elements
console.log(arr.slice(-1)); // last element
console.log(arr.slice(1, -2)); // b,c
console.log(arr.slice()); // will return shallow copy of array
console.log([...arr]); // also makes shallow copy, preference based

// SPLICE:
// -> almost the same as 'slice' except that it does mutate the original array
// -> first argument tells the method where to start (index)
// -> second argument tells the method how many elements to delete, starting from the first arguments index

// console.log(arr.splice(2)); // c,d,e
console.log(arr.splice(-1)); // remove last element
console.log(arr); // losese extracted part
arr.splice(1, 2);
console.log(arr); // loses extracted part

// REVERSE:
// -> reverses string
// -> does mutate the original array

arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT
// -> joins two arrays
// -> call the method on the first array, pass the second array
// -> does not mutate the original array

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same result, preference based

// JOIN
// -> joins all the elements of an array into a string
// -> the argument is a string that is used to join these elements
// -> does not mutate the original array

console.log(letters.join(' - '));

// Remember that we also know:
// push, unshift, pop, shift, indexOf, includes

*/
/////////////////////////////////////////////////
/*

// The New at Method
// - accesses the specified index of the array it is called on
// - argument specifies what index to access

const arr = [23, 11, 64];

// get first index (0th)
console.log(arr[0]); // logs 0 index of array - old way
console.log(arr.at(0)); // same result, more modern

// get last index
console.log(arr[arr.length - 1]); // old way
console.log(arr.slice(-1)[0]); // newer way
console.log(arr.at(-1)); // newest way, situational/preference based

//also works on string
console.log('jonas'.at(0)); // j
console.log('jonas'.at(-1)); // s

*/

/////////////////////////////////////////////////
/*

// Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// forOf loop
// for (const movement of movements) {  // without counter
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log(`---------------`);

// The forEach Method:
// - is a method that you can use on an array
// - requires a callback function, so you must pass a function as an argument
// - you iterate throught the array starting from the first index by passing an argument in the callback function - use any variable name you want
// - when the forEach method calls the callback function, it also passes the current element of the array
// - it also passes in the index and the entire array (in that order)

movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// We use a callback function to tell another higher-order function what it should do.
// In the real world, we would use shorter names for the variables of our arguments: mov, i, arr for example.

// Differences between forOf loop and forEach method:
// - the entries method of the forOf loop will pass the index first, then the value. the forEach method will pass the value then the index, followed by the array itself
// - you cannot break out of the forEach method's loop by using break or continue statments, but you can when you use the forOf loop.
// - so if you really need to break out of a loop, use forOf, other than that, the method you choose is based on personal preference

*/

/////////////////////////////////////////////////
/*

// forEach with Maps and Sets

// Map
// - the method works pretty much the same as it does with an array
// - the difference is how maps can use any data type as an index
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// - this prints the value and the key as the same, but why?
// - a set doesn't have keys, and it doesn't have indexes
// - with sets, remember that we are only working with values
// - instead of giving the parameter a name, we would name it '_'
// - this is because it is a throw away variable in this case
// - naming variables '-' is common practice when they are useless

*/
/////////////////////////////////////////////////

// PROJECT: "Bankist" App

// - Look at the data at the top of the file
// - notice that each account is recorded within an object
// - why do we use objects and not maps in this case?
// - in real applications, we usually get a lot of data from web API's
// - these web API's give you data in the form of objects
// - we are just mimicing how we would receive the data in a real world application

/////////////////////////////////////////////////
/*

// Coding Challenge #1
// (see video for details)

// Test Data 1:
const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

// Test Data 2:
const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (jData, kData) {
  // sTEP 1:
  // - Remove first and last element from Juilia's Data
  // - Make a shallow copy of the original data before doing so
  // - it's a bad practice to mutate function parameters
  const jCorrectedData = jData.slice(1, -2);

  // Step 2:
  // - join the arrays together to make one array
  // const joinedData = [...jCorrectedData, ...kData]; //one way
  const joinedData = jCorrectedData.concat(kData); //another way

  // Step 3:
  // - iterate through each
  // - determine whether the dog is a puppy or an adult (> or < 3?)
  // - print something to the console depending on dogs status
  joinedData.forEach(function (age, i, arr) {
    if (age >= 3) {
      console.log(`Dog #${i + 1} is an adult, and is ${age} years old.`);
    } else {
      console.log(`Dog #${i + 1} is still a puppy 🐶`);
    }
  });
  console.log('<----END---->');
};

checkDogs(juliaData, kateData);
checkDogs(juliaData2, kateData2);

*/
/////////////////////////////////////////////////

// Data Transformations: Map, Filter, Reduce
// - 3 very popular array methods used in modern javascript
// - you will most likely run into these methods a lot
// - these methods allow you to transform an array into another array (data transformation)

// Map method:
// - we can use this method to loop over arrays
// - simillar to the forEach method, except it created a brand new array based on the original array
// - it takes an array, loops over it, for each iteration it applies a call back function that we define in our code to the current array element then puts it into a new array
// - it 'maps' the values of the original array to a new array

// Filter method:
//  - used to filter for elements in the original array which satisfy a certain condition
// - only elements for which the condition is true will be included in a new array that the filter method returns
//  - all other methods get filtered out

// Reduced method:
// - used to boil down all the elemnts of the original array into one single value, like adding all the elements together
// - snowball effect
// - this method returns the value that the array gets reduced to

/////////////////////////////////////////////////
/*

// Map method:
// - this method takes a function as an argument which takes the current element as an argument just like the forEach method
// - it also has access to the index and the entire array
// - what ever the function returns will be stored in a new array that we declare
// - original array is not mutated

// (this example uses the 'movements' array on line 91)

// Convert values to US dollars
const euroToUsd = 1.1;

// Arrow function version:
// - many people don't like this version because it negatively effects readability

// const movementsUSD = movements.map(mov => mov * euroToUsd);

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});
console.log(movements);
console.log(movementsUSD);

// for of loop for fun
const movementsUSDfor = [];
for (const mov of movements) {
  movementsUSDfor.push(mov * euroToUsd);
}
console.log(movementsUSDfor);

// NOTE: The map method is more inline with functional programming, which seems to be the emerging trend in modern javascript

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

*/
/////////////////////////////////////////////////
/*

// Filter method:
// - used to filter for elements that satisfy a certain condition
// - we satisfy this condition using a callback function
// - this method has access to the element, index and array

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// for of loop for contrast
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

// forEach loop for fun
const depositsFE = [];
movements.forEach(function (mov) {
  if (mov > 0) depositsFE.push(mov);
});
console.log(depositsFE);

// Why would we use filter method over the forOf loop?
// - one reason is because of the push for functional programming
// - the map, filter and reduce methods are functional, where as the forOf loop is not a function
// - Another major reason is because we can chain these methods together, but we cannot do that with the forOf loop

// Challenge: Do the same with withdrawals

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

*/
/////////////////////////////////////////////////

// Reduce method:
// - used to boil down all the elements in an array to one single value, for example adding up all the numbers in an array
// - the callback function for this method is a little different, the arguments passed are the accumulator, then the usual 3 (element index and array in that order)
// - the accumulator is like a snowball, or where the accumulation of all the values of the array are tracked, which is what we ulitmately want to return
// - in each iteration, we return the updated accumulator
// - the callback function is the first argument of the reduce method, there is however another argument
// - the second argument is the initial value of the accumulator
// - most powerful array method, also the hardest to use

console.log(movements);

// const balance = movements.reduce(function (acc, mov, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + mov;
// }, 0);
const balance = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance);

// forOf loop for contrast
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum Value of the movement array
// - we can also use reduce for this
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max);
