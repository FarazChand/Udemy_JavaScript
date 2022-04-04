//////////////////////////////////////////////
// Exporting and importing in ES6 Modlules: //
//////////////////////////////////////////////

console.log(`Importing module`);

// Importing module, using named exports:
// - can rename variables to desired identifier while importing

/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('bread', 5);
console.log(price, tq);
// console.log(shippingCost); // Cannot do this, variable is private to it's module
*/

// Importing everything from a module
// - works kind of like a class/object (camel case convention)
// - gives access to all exports of the specified module

/*
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);
*/

// Importing default export:
// - we can name the default import what we want, named it add in this case
// - should never import default and named exports together, we will during this example though (just best practice not to)

// /*
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

// Live connection between modules, not a copy but a pointer:
console.log(cart);

////////////////////////////////
// Top-level Await (ES2022): //
///////////////////////////////

// - in ES2022 we can now 'await' on the top level within modules
// - note that this only works within modules
// - also note that this blocks execution until the promise is settled
// - also note that the main script will wait for any blocking code from any of it's dependencies to execute before it starts executing it's own code
// - top level await is very useful, but we should be careful when using it because of the fact that it blocks code execution

console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log('Something');

// */

////////////////////////////////

// Notes:
// - all modules are executed in strict mode by default, no need to include that line of code
// - before any of the main modules code is executed, any importaed modules code is executed first
//  - all variables defined in a module are private to that module
// - if we want to use varualbes from one module in another, we would have to use exports
