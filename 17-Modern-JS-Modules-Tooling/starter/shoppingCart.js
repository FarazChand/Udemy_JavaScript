// Exporting module
console.log('Exporting module');

const shippingCost = 10;
const cart = [];

// Exporting a whole function:
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} addedd to cart`);
  console.log(cart);
};

const totalPrice = 300;
const totalQuantity = 34;

// - can rename variables to desired identifier while exporting
export { totalPrice, totalQuantity as tq };
