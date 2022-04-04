console.log('Exporting module');
// Exporting module:

const shippingCost = 10;
export const cart = [];

// Exporting a whole function:
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} addedd to cart`);
  console.log(cart);
};

const totalPrice = 300;
const totalQuantity = 34;

// Named exports:
// - can rename variables to desired identifier while exporting
export { totalPrice, totalQuantity as tq };

// Default export:
// - can only be one
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} addedd to cart`);
  console.log(cart);
}
