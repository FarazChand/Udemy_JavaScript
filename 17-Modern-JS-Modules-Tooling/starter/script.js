// Importing module:
// - can rename variables to desired identifier while importing

/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
addToCart('bread', 5);
console.log(price, tq);
*/

console.log(`Importing module`);
// console.log(shippingCost); // Cannot do this, variable is private to it's module

// Importing everything from a module
// - works kind of like a class/object (camel case convention)
// - gives access to all exports of the specified module
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);
////////////////////////////////

// Notes:
// - all modules are executed in strict mode by default, no need to include that line of code
// - before any of the main modules code is executed, any importaed modules code is executed first
//  - all variables defined in a module are private to that module
// - if we want to use varualbes from one module in another, we would have to use exports
