'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-02-16T23:36:17.929Z',
    '2022-02-19T23:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  // reset the html
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    // evaluate the movement and assign its label accordingly
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
  </div>`;

    // insert html
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating and displaying the total balance:
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

//Calculating and Displaying the Summary, total IN and OUT, Intrest
const calcDisplaySumarry = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

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

//combining main functions for updating UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySumarry(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 10;
  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from default behaviour of reloading and sumbitin
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //Create current Date and Time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // second: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Logout timer

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  } else {
    console.log(
      `Sorry, something went wrong. Check your username and pin and try again.`
    );
  }
});

// Implementing Transfers
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add Movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // Reset Timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

// close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// Sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/* 
Converting and Checking Numbers:
- in JS, all numbers are represented internally as floating point numbers aka decimals
- this is the reason we only have one data type for all numbers
- also, number are represented internally on a 64 base 2 format
- this means numbers are always stored in a binary format
- hard to represent fractions in base 2
- in base 10, if you divide 3 by 10, you get a decimal number with infinite places
- the same thing happens with base to for 0.1
- PHP and RUBY use the same system
- cannot do really precise or scientific caclculations in JS because of this
*/

/*
// Base 10: 0-9.   1/10 = 0.1,  3/10 = 3.33333...
// Base 2: 0-1
console.log(23 === 23.0); //will be true
console.log(0.1 + 0.2); // 0.3 with a lot of decimal places
console.log(0.1 + 0.2 === 0.3); // will be false, not precise

// Conversion
console.log(Number('23')); // convert string to number
console.log(+'23'); // cleaner way, type coercion because of +

// Parsing with .parseInt
// - can find an int within a string
// - string must start with an int in order to work
// - accepts a second argument called 'Radix'
// - this is the base of the numeral system we are using
// - we usually work in base 10, so we pass 10. Binary would be 2
// - whitespace before or after int does not effect this
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('e23', 10)); // NaN

// Parsing with .parseFloat
// - same thing as above but works with floats
// - both of these functions are 'global functions'
// - this means they don't need to be called on Number
// - the more traditional/old school way of doing it is to just called the function by itself
// - Modern JS encourages calling these functions on the Number object
// Number provides a 'namespace' for these functions
console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(parseFloat('2.5rem')); // oldschool way

// Is Nan:
// - another function in the Number namespace
// - checks if the arguement is not a number, if it is, it returns false, if not - true
// - infinity is considered not- NaN, so this method is flawed
// - the string '20' is also considered not-NaN, even though it is a string

// Use to check if value is literally NaN, barely used
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false, still
console.log(Number.isNaN(+'20x')); // true
console.log(Number.isNaN(23 / 0)); // false, infinity considered a number within this method

// Is Finite method:
// - better way to use NaN
// - checks if argument is a real number
// - this does not include strings or infinity
// - for floats
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20x')); //false
console.log(Number.isFinite(23 / 0)); //false

//Is Integer
// - same thing as isFinite but for integers
console.log(Number.isInteger(23)); //true
console.log(Number.isInteger(23.0)); //true
console.log(Number.isInteger(23 / 0)); //false

// Summary:
// - .isFinite is the go to method if you need to check if a value is a number
// - if you're only checking for an integer, you can use .isInteger
// .parseFloat is the go to method if you need to read a value from a string, for example one coming from css

*/

/////////////////////////////////////////////////

/*
// Math and Rounding
- all of the following functions exist in the Math namespace
- the Math namespace also includes constants e.g. radius
*/

/*

// Square Root
// - part of the Math
// - pass in a number, gives you the square root
console.log(Math.sqrt(25)); //calcs square root
console.log(25 ** (1 / 2)); // same thing, different way
console.log(8 ** (1 / 3)); // calculates cubic root

// Find max in a set of numbers
// - Math.max will return the highest number in a set of numbers
// - will perform type coercion on strings that are numbers
// - will not parse
console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); //NaN

// Math.Min
// - same as Math.max except for the lowest value
console.log(Math.min(5, 18, 23, 11, 2)); //2

// Constant: PI
// - one of the constants in the math namespace
console.log(Math.PI); //3.141592653589793
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Math.random
// - gives a number between 0 and 1
// - we used it before to create a dice roll
console.log(Math.trunc(Math.random() * 6 + 1)); //dice roll

// Our own random function:
// - a little confusing but we can make sense of this
// - takes two arguments representing the top and bottom range of the possible random number
// - math.random is a number from 0 -1...
// - we multiply math.random by (max - min)
// - this gives us a number from 0 - (max-min)
// - adding one to both, 1 - (max - min + 1)
// - adding min to both, min +1 - max + 1
// - truncs the answer so its not a decimal
// - note that we add a 1 because math.random can never be 0 or 1, just between, so when we trunc 20* .999999, it will give 19, so we can never get 20. This also means that since we did + 1, even if we get 10* 0.0000000000001, it will +1, meaning it will be 11, so we can never get 10 if we do it this way. Weird, not perfect
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max-min) -> min...max
console.log(randomInt(10, 20));

// Rounding Integers
// - trunc, round, ceil and floor

// Trunc
console.log(Math.trunc(23.3)); // simply removes anything after decimal

// Round
// - rounds to nearest integer
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); //24

// Ceil
// - always rounds up
console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

// Floor
// - always rounds down
// - works the same as trunc for positive numbers only
console.log(Math.floor(23.3)); //23
console.log(Math.floor(23.9)); //23
console.log(Math.trunc(-23.3)); //23
console.log(Math.floor(-23.3)); //24, because -24 is below -23

// Rounding Decimals
// - works a little differently, JS evolved weirdly
// - specify number in parenthesis and call the .toFixed method on it
// - .toFixed takes and argument that represents the number of decimal places you want the value to be rounded to
// - always returns a string
// - since numbers are primitive, they dont have methods. JS performs 'boxing' which basically transforms the number to a number object, performs the method on it, then converts it back to a primitive
console.log((2.7).toFixed(0)); // '3'
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.345).toFixed(2)); // '2.35'
console.log(+(2.345).toFixed(2)); // 2.35

// Summary:
// - the Math namespace has many methods and also contains constants
// - some useful methods : Math -> .sqrt , .max, .min, .random
// - Rounding Integer Methods: .trunc, .floor, .ceil, .round
// - Rounding floats method: value.tofixed (called like a string, returns a string by default)
// - toFixed is really useful, as is .floor and .round

*/

/////////////////////////////////////////////////

/*
// The Remainder Operator:
- returns the remainder of a division 
-
*/

/*

// Remainder operator(%)
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5, or 2 if we only take the integer, 5= 2*2 +1
console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 3

// Checking if a value is even or odd
// - a number is even if it is divisible by 2
// - we can tell that its divisible by 2 if the remainder is 0
// - also, if we divide an even number by 2, the result will always be a whole number
console.log(6 % 2); // 0, even
console.log(6 / 2); // 3

console.log(7 % 2); // 1, odd
console.log(7 / 2); // 3.5 or

// Function to determine if a value is even
// - if it returns true then it is even, false is odd

const isEven = n => n % 2 === 0;
console.log(isEven(8)); //true
console.log(isEven(23)); //false
console.log(isEven(514)); //true

// We can use this same logic to see if any number is divisible by any other number

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// - if you have to do something every nth time, the remainder operator is a useful tool
// - you just have to see if the value is divisible by the multiple you have as nth.. every 3rd time? value % 3.. if it returns true then it is divisible

*/

/////////////////////////////////////////////////

/*
// Numeric Seperators: 
- a feature that allows us to format numbers in a way that is easier for us or for other developers to understand 
- simply underscores that we can place anywhere in our numbers that make numbers really easy to understand and to parse large numbers 
- the engine ignores the underscores and only sees the number
- this means that we can place the numeric seperators anywhere we want 
- we can use these seperators to give meaning to different parts of our numbers (to the human reader)
- can only be placed between numbers
- when converting strings to numbers that contain these seperators, it will not work as expected (while using Number or parse int)
*/

/*

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500; // same number

const PI = 3.14_15; // works
// const PI2= 3._1415 // doesnt work
// const PI2= _3.1415 // doesnt work
// const PI2= 3.1415_ // doesnt work
// const PI2= 3.14__15 // doesnt work

console.log(Number('230_999')); // NaN
console.log(parseInt('230_999')); // Only get 230

// So only use the numeric seperators when you are writing down code, not when your getting data from an api as a string

*/

/////////////////////////////////////////////////

/* 
// Working with BigInt
- a primimtive data type

- numbers are represented internally using 64 bits 
- this means there are exactly 64 1's or 0's to represent any given number 
- of these 64 bits, only 53 are used to store the digits themselves, the rest are for storing the position of the decimal point and the sign
- this means that their is a limit on how big numbers can be
- if we try to represent numbers bigger than this, we might end up loosing percision
- this can be a problem sometimes when we have to interact with things like databases or real 60 bit numbers, or numbers that are used in other languages 

- starting from ES 2020 we can use bigInt to store bigger numbers 
*/

/*

// bigest number java script can represent safely
// this number is also stored in the number namepace
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(4139847209305129385701235n); // the n is the bigInt
console.log(3413135151); // this way is better for smaller numbers

// Operations
// - can be used with other big ints
// - can not be used with mixing regular numbers
console.log(10000n + 10000n);
console.log(134123512351325123513251235125251n + 100000n);
// console.log(Math.sqrt(16n)); // doesn't work

const huge = 134728142834668123471623481n;
const num = 23;
// console.log(huge * num); // error
console.log(huge * BigInt(num)); // will work

// - two exceptions, the comparison operators and the + operator when working with strings
console.log(20n > 15); // WORKS
console.log(20n === 20); // false, strict no type coercion
console.log(typeof 20n); // bigInt
console.log(20n == '20'); // loose, will be true, type coercion

console.log(huge + ' is REALLY big!!!'); // the number is coverted to a string

// Divisions
console.log(10 / 3); // 3.3333
console.log(10n / 3n); // 3n  , returns to the closest big int

// Summary
// - BigInt allows us to store numbers over the max safe limit
// - we do this by adding an 'n' at the end of the number
// - can also be done using the BigInt function, works better with smaller numbers
// - cannot be used in conjuction with regular numbers in operations
// - cannot be used in Math methods
// - the loose comparison operator will work because of type coersion
// - when concatenating with the + operator and a string, the number will be converted into a string
// - when dividing, if there was to be a decimal with regular numbers, the bigInt version of that result would just return the closest BigInt number

*/

/////////////////////////////////////////////////

/*
// Creating Dates
- a type of data that comes up all the time, dates and time
- can be a little bit messy and confusing
- you can create a date using the new date constructor
- you can parse a date from a date string
- dates are a special type of object, and therefor have their own methods just like arrays or maps or strings
- we can use these methods to get or set components of a string
*/

/* 

// Create a date
const now = new Date(); // gives current date
console.log(now);

// Parse Date based on string
// - generally not a good idea to do this because it can be unreliable
// - if the date is created by JS then it is usually safe
console.log(new Date('Sun Feb 20 2022 10:31:04'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

// Can pass these values into the constructor:
//  - year, month, day, hour, minutes, seconds in that order
// - the month is 0 based, meaning 10 represents 11...
console.log(new Date(2037, 10, 19, 15, 23, 5)); // nov 19, 2037

// JavaScript auto corrects the date
// - the code below will correct to Dec 01 because november only has 30 days
console.log(new Date(2037, 10, 31));

// Can also pass to the constructor a value in miliseconds passed since the beginning of Unix time (Jan 1, 1970);
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days in miliseconds
console.log(3 * 24 * 60 * 60 * 1000); // 259200000 timestamp
// this time stamp represents the exact time in miliseconds after the epoch

// Working with dates

// Getting times and dates
console.log('=======================');
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // gets the full year
console.log(future.getMonth()); // gets month, 0 based, 0 = Jan
console.log(future.getDate()); // gets the day of the month
console.log(future.getDay()); // gets the day of the week, 0 = sun
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // converts to string that follows international standard

console.log(future.getTime()); // gets time stamp (miliseconds passed epoch)
console.log(new Date(2142274980000)); // same date as above
console.log(Date.now()); // gives timestamp of current moment

// Setting times and dates
console.log(future.setFullYear(2040)); //changes year to 2040
console.log(future);
// rest of the set methods are very simillar to above, just replace get with set
// will autocorrect dates if there is an overflow

*/

/////////////////////////////////////////////////

/*
// Operations with Dates
- can subract one date from another in order to calculate how many days have passed between the two dates
- this works because whenever we attempt to convert a date into a number, the result will be the timestamp of that number in miliseconds
- with these miliseconds, we can perform calculations
- date library: moment.js, a library you can use if you need really precise dates including things like daylight savings etc
*/

/*

const future = new Date(2037, 10, 19, 15, 23);
console.log(future); // the date in string for
console.log(Number(future)); // the date in number form, miliseconds
console.log(+future); //also the date in number form, miliseconds

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);

*/

/////////////////////////////////////////////////

/*
// Internationalizing Dates(Intl)
- JavaScript has a new internationalization API
- allows us to easily format numbers and strings according to different languages
- with this API, we can make our applications support different languages all around the world
- Important for currencies or dates formatting as well, which is what we are going to focus on in this section
- See the video for this section for a walkthrough, need to make a detailed section for this later(amazing tools)

*/

/////////////////////////////////////////////////

/*
// Internationalizing Numbers(Intl)
- the new internationalization API for JavaScripts allows us to also format numbers
- we access this API by using the 'Intl' namespace - which we access using the 'new' keyword (new Intl())
- we can then call one of the namespaces functions, for dates we pass DateTimeFormat
- when we want to format numbers, we call the NumberFormat function
- these functions take an argument that is refered to as the "locale", which indicates what country and language is to be used to format, it can also take an "options" argument which is an object, which dictates the way certain things are formatted based on the specified properties of the object passed
- this whole line of code is called the formatter, we then call the .format method on the formatter and pass what we want to be formatted into the method.
- we can access the locale of the browser in use with the variable 'navigator.language'
- the options object has different variables that have different possible values you can define to change the formatting of the data you want to format
  */

/*
const num = 4127864.23;

const options = {
  style: 'currency', //unit, percent or currency
  unit: 'celsius', //can be many things, ignored if styles not unit
  currency: 'EUR',
  // useGrouping: false, //gets rid of seperators
};

console.log('US:     ', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:  ', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

/*

/////////////////////////////////////////////////

/*
// Timers: setTimeout and setInterval
- these are the two kinds of timers
- setTimout runs just once after a difined time
- setInterval keeps running forever until we stop it
*/

/*

// setTimeout
// - only executed once
// - we can use setTimeout to execute some code in the future
// - receives a callback method as the first argument
// - use the second argumenet to specify the amount of miliseconds that will pass after this function is called before the callback function is called
// - any argument passed after the second argument will be used as arguments for the callback function

// - Note that our code execution is not stalled by this function
// - when setTimeout is delaying the callback function, the rest of our code outside the setTimeout function continues to execute
// - as soon as JS hits this line of code, it will keep counting the time in the background and register the callback function to be called after the time has elapsed, then immediately JS will move on to the next line of code. This mechanism is called asynchromous JavaScript
// - we can actually cancel

const ingredients = [`olives`, `spinach`];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log(`Waiting...`);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// for the setTimeout function above... its a little confusing, here is how we write this code (not how its executed)
// - first we create a variable and store the result of the set timout function in it
// - we know we want to pass two arguments to the call back function so we write the paramaters in the call
// then we write the callback function itself (the console log).
// - this callback function including its paramaters are the first argument of setTimeout
// - the second argument is the time we want to delay its execution
// - we use the spread operator to spread the ingredient array, which has two indexes, and they become our third and fourth arguments for the setTimeout function.
// - the third and fourth arguments co-respond to the callback functions parameters, so they are what we want to pass as arugments to the callback function when it is finally called
// - this allows us to create parameters for the call back function and pass arguments to it

// - then we have an if statement that specifies if a certain ingredient exists in the ingredient array, the clearTimeout function should be executed on the variable we originally stored our setTImout in
// - this effectively clears the callback function before it can be executed

//

// setInterval
// - runs a function over and over again based on a specified time
// - first argument is the function we want to pass
// - second argument is the specified time that passes before we call the function again

setInterval(function () {
  let now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // day: 'numeric',
    // month: 'numeric',
    // year: 'numeric',
  };
  const now2 = new Intl.DateTimeFormat(`en-US`, options).format(now);
  // const hours = now.getHours();
  // const min = now.getMinutes();
  // const sec = now.getSeconds();
  // now = `${hours}:${min}:${sec}`;
  // console.log(now);

  console.log(now2);
}, 1000);

*/
