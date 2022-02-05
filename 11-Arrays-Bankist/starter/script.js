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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

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
