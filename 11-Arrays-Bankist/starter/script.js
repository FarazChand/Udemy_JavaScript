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

const displayMovements = function (movements, sort = false) {
  // reset the html
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    // evaluate the movement and assign its label accordingly
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
  </div>`;

    // insert html
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Calculating and displaying the total balance:
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//Calculating and Displaying the Summary, total IN and OUT, Intrest
const calcDisplaySumarry = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySumarry(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from default behaviour of reloading and sumbitin
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

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
  const amount = Number(inputTransferAmount.value);
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
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add Movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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
/*

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

*/
/////////////////////////////////////////////////
/*

// Coding Challenge #2:
// - see details in video

const testData1 = [5, 2, 4, 1, 15, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogAges) {
  // Step 1:
  const humanAges = dogAges.map(function (dogAge) {
    if (dogAge <= 2) {
      return dogAge * 2;
    } else {
      return 16 + dogAge * 4;
    }
  });
  console.log(humanAges);

  // Step 2:
  const adultDogsOnly = humanAges.filter(function (humanAge) {
    return humanAge >= 18;
  });
  console.log(adultDogsOnly);

  // Step 3:
  const sumOfAges = adultDogsOnly.reduce(function (acc, age) {
    return acc + age;
  }, 0);
  console.log(sumOfAges);

  return sumOfAges / adultDogsOnly.length;
};

console.log(calcAverageHumanAge(testData1));
console.log(`---------------`);
console.log(calcAverageHumanAge(testData2));
console.log(`---------------`);

//Cleaner way with chaining
const calcAverageHumanAge2 = function (dogAges) {
  const averageHumanAge = dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(adultDogs => adultDogs >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return averageHumanAge;
};

const avgDogAge1 = calcAverageHumanAge2(testData1);
const avgDogAge2 = calcAverageHumanAge2(testData2);
console.log(avgDogAge1);
console.log(avgDogAge2);

*/
/////////////////////////////////////////////////
/*

// The Magic of Chaining Methods
// - lets say we wanted to take all the movement deposits**
// - then convert them from euros to dollars
// - then finally add them all up, so we know the total deposited in us dollars
// - we can do all of these in one go

const euroToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// NOTE: We can only chain a method after another if the first one returns an array
// - it's hard to debug when we chain methods, we need to be able to see the result of each method in order to know where the problem lies
// - in order to do this we can use the array paramater that is available with all of these methods

// FOR EXAMPLE
// - if we made a mistake, we could check by adding doing this for each method, one by one, lets start at the filter method. We would check the results of this in the next part of the chain:

//    .....   .map((mov, i, arr) => {
//             console.log(arr)   // checking the array results
//             return mov * euroToUsd;
// })

// - This allows us to see if there is an error, if there isnt
// - If ther isnt, we can continue to check the next methods

// Notes:
// - we should try to not over use chaining methods
// - this means creating the most efficient functionality possilbe so that we use the least amount of chaining nessecary, optimize
// - neglecting this can cause huge performance issues

// - it's a bad practice to chain methods that mutate the underlying array, ex: splice method, or reverse method
// - you can do this, but in a large scale application its always a good practice to avoid mutating arrays, causes hard to find bugs

*/
/////////////////////////////////////////////////
/*

// Coding Challenge #3:
// - details in video

const testData1 = [5, 2, 4, 1, 15, 8, 3];
const testData2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = dogAges =>
  dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(adultDogs => adultDogs >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avgDogAge1 = calcAverageHumanAge(testData1);
const avgDogAge2 = calcAverageHumanAge(testData2);
console.log(avgDogAge1);
console.log(avgDogAge2);

*/
/////////////////////////////////////////////////
/*

// The find Method
// - another very important array method
// - we can use this method to find one element of an array based on a condition
// - this method also accepts a callback function as an arguement which is called as the method loops over the array
//  - like the filter method, it can use a boolean
// - will take the first element in the array that satisfies the condition
// - will return undefined if no elements match the condition

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// Doing the same thing but with a forOf loop for practise
let accountAgain;

for (let acc of accounts) {
  // if (acc.owner === 'Jessica Davis') {
  //   accountAgain = acc;
  //   break;
  // }

  // terinary operator
  accountAgain = acc.owner === 'Jessica Davis' ? acc : accountAgain;
}
console.log(accountAgain);

// Find Index method
// - works the same as the find method except  that it returns the index instead of the element

*/
/////////////////////////////////////////////////
/*

// some and every

// SOME
// - like the include method except that this method tests for a condition rather than equaliity
// - returns true if one of the elements of the array meet the condition

console.log(movements);

// check for EQUALITY
console.log(movements.includes(-130));
console.log(movements.some(mov => mov === -130));

// check if there have been any deposits in this account
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY
// - simillar to the some method, but only returns true if all of the elements of the array satisfy the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callback
// - up until now, we have always wrote the callback function's functionality within the main function
// - we can write a function out side of the main function and reuse and update it easier, DRY principle

const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

*/
/////////////////////////////////////////////////
/*

// flat and flatMap

// FLAT METHOD
// - take an array of arrays and makes one array with no nested arrays
// - only goes one level deep by default
// has a depth argument that specifies how deep you want to flatten the array

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); // doesnt work
console.log(arrDeep.flat(1)); // depth is one, same result
console.log(arrDeep.flat(2)); // depth is two, works

// calc overall movements of all accounts for the bank
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// with chaining
const overallBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance2);

// FLATMAP METHOD
// - using the map method followed by the flat method is very common, so this method was created
// - maps the array accorinding to the callback function, the flattens it
// - can only go one level deep, there is no depth argument for this method

const overallBalance3 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance2);

*/
/////////////////////////////////////////////////
/*

// Sorting Arrays
// - can sort the array alphabetically
// - does the sort based on strings
// - will mutate the original array

// strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// numbers
console.log(movements);
console.log(movements.sort()); // does not work as expected

// To fix this:
// - we pass a callback function into the sort method
// - we pass two arguments into this callback method that represent the current element and the next element in the array
// - depending on the value of what is returned from the callback function, the order of the arguments will either remain the same or switch
// - if the callback function returns a negative number, the order of the two current elements in question will remain the same
// - if the callback function returns a positive number, they will switch positions

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});
console.log(movements); //ascending

// - as you can see above, we check if a is > than b, if it is we return a positive number, which tells the sort method to switch the order.
// - if b > a we return a negative number, which tells sort to keep the order
// - we purposely match these conditions with these returns because we wanted to sort these numbers in ascending order, if we wanted to do it in descending order, we would reverse the returns

movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(movements); // descending

// - we can simplify this by using a - b
// -  a - b will either return a positive or negative depending on if b is > or < a, which mimics the functionality of both the if statements in our callback function.
// - if a = b, then it will return 0 which does not switch the elements positions
// this is for ascending, for descending it's b - a.

movements.sort((a, b) => a - b);
console.log(movements); // ascending

movements.sort((a, b) => b - a);
console.log(movements); // descending

// - this works on strings too
// - this does not work on arrays with strings and numbers

*/
/////////////////////////////////////////////////
/*

// More Ways of Creating and Filling Arrays
// - so far we have been manually creating arrays with data we already have
// - we can actually also generate arrays programatically without having to define all the items manually
//

// Manually
console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Creates an array with 7 empty elements
const x = new Array(7);
// - this happens when we pass in only one arguement
// - cannot really use this array for anything, like using methods on it
// - not really useful except for one thing, using the fill method
console.log(x);
console.log(x.map(() => 5)); // does  nothing

// Fill method
// - first argument fills up the entire array with the specified value
// - mutates the entire array
// - can also specify a begin paramater, the index it starts filling from, and an end parameter, the index where it stops filling - just like the slice method
// - does not include the last index, only up to it
// - can be used on already existing arrays
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

// Array.from
// - is function object calling another method(more info later)
// - takes an object with a length property as the first arguement
// - takes a callback function as the second arguement
// - the callback behaves like the map method
// - automatically acts like the map method, do not need the keyword
// - cleaner than using the Array and Fill methods together
// - this method can be used on other iterables aswell
// - ex: strings, maps, sets, also node lists from querySelctorAll

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// Lets say we only have the movements store in our UI and not in out code. How would we get the data and calculate the sum?

// just adding handler so we can see this in action while logged in
labelBalance.addEventListener('click', function () {
  // This is the real example
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value')
  );

  // Methods work on this node list because it has been converted into an array previous
  // - we could acutally put this in the second arguement of the array.from - as the callback function
  console.log(movementsUI.map(el => el.textContent.replace('€', '')));
});

*/
/////////////////////////////////////////////////

// Summary: Which Array Method to Use?
// - since the beginning of the course, we have leared 23 different array methods
// - how do we know which one we should use in a give situation?
// - these are all of the categories you need to keep in mind when choosing, does your problem fall under one of these? :
// Mutate original array, Create a new array, get an array index, get an array element, Know if array includes, create a new string, transform a value, just loop an array.
// - below will be a list of arrays that perform the task for the required category

// **Mutate Original Array**
//>Add to Original
// - .push(end)
// - .unshift(start)
//>Remove from original
// - .pop(end)
// - .shift(start)
// - .splice(any)
//>Others
// - .reverse
// - .sort
//  .fill

// **A New Array**
//>Computed from original:
// - .map(loop)
//>Filter using condition:
// - .filter
//>Portion of original: (or even shallow copy)
// - .slice
//>Adding original to other:
// - .concat
//>Flattening the original:
// - .flat
// - .flatMap

// **An Array Index**
//>Based on value:
// - .indexOf
//>Based on condition:
// - .findIndex

// **An Array Element**
//>Based on test condition:
// - .find

// **Know if Array Includes**
//>Based on value:
// - .includes
//>Based on test conditions:
// - .some
// - .every

// **A New String**
//>Based on separator
//  - .join

// **To Transform a Value**
//>Based on accumulator
// - .reduce (boils down all elements of an array into one value)

// **Just Loop Over**
//>Based on callback:
// - .forEach (does not create a new array, just loops over it)

/////////////////////////////////////////////////

// Array Method Practice

// 1. Get the sum of all deposits
const allDepositSum = accounts
  .flatMap(acc => acc.movements.filter(mov => mov > 0))
  .reduce((acc, dep) => acc + dep, 0);
console.log(allDepositSum);

// 2. Count how many deposits there have been with at least $1000
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numDeposits1000);

// OR
const numDeposits1000b = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1000b);

// cannot us acc++
// - acc++ does incriment the value, but returns the previous value
// - we can write it the prefixed way, ++acc which works

// 3. Create an object which contains the sum of deposits and withdrawals
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};
// Tests
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with and Example'));
// Coding Challenge #4 - see video for details
console.log(`<<--- CODING CHALLANGE 4 --->>`);

// Test Data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log(dogs);
console.log('-----------');

// 1.
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogDiet = function (dogs, ownerName) {
  dogs.forEach(dog => {
    if (dog.owners.includes(ownerName)) {
      dog.recFood < dog.curFood * 0.9
        ? console.log(`${ownerName}'s dog eats too little.`)
        : '';
      dog.recFood > dog.curFood * 1.1
        ? console.log(`${ownerName}'s dog eats too much.`)
        : '';
    }
  });
};

// 3.
const ownersEatToMuch = dogs.flatMap(dog =>
  dog.curFood > dog.recFood ? dog.owners : []
);
console.log(ownersEatToMuch);

const ownersEatToLittle = dogs.flatMap(dog =>
  dog.curFood < dog.recFood ? dog.owners : []
);
console.log(ownersEatToLittle);

// 4.
const dogDiet3 = function (own, str) {
  return own.join(' and ').concat(`'s dogs eat too ${str}!`);
};

console.log(dogDiet3(ownersEatToMuch, 'much'));
console.log(dogDiet3(ownersEatToLittle, 'little'));

// 5.
const dogPerfectDiet = dogs.some(dog => dog.curFood === dog.recFood);
console.log(dogPerfectDiet);

// 6.
const dogsOkayDiet = dogs.some(
  dog => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1
);
console.log(dogsOkayDiet);

// 7.
const dogsOkayDietArr = dogs.filter(
  dog => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1
);
console.log(dogsOkayDietArr);

// 8.
const dogSort = dogs.slice().sort((a, b) => a.recFood - b.recFood);

console.log(dogs);
console.log(dogSort);
