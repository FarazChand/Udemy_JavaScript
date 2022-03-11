'use strict';

//////////////////////////////////

// What is Object-Oriented Programming? (OOP)
// ==========================================
// - what is it? How does it work in genereal? What are it's four fundamental principals?

// - OOP is a programming paradigm that is based on the concept of objects
// - we use objects to model(describe) real-world or abstract features (e.g. user or todo list item, or HTML component or data structure)
// - objects can contain data(properties) and code(methods).
// - by using objects, we pack data and the corresponding behavior into one block
// - in OOP, objects are self-contained pieces/blocks of code
// - Objets are buidling blocks of applications and interact with one another
// - these interactions happen through a public interface(API): methods that the code outside of the object can access and use to communicate with the object
// - OOP was developed with the goal of organizing code, to make it more flexible and easier to maintain (avoid "spaghetti code")
// - OOP is one of the most popular paradigm in large-scale software engineering

// Classes and Instances:
// ----------------------
// - a class is like a blueprint from which we can create new objects, a description of the data - not an object itself (blueprint)
// - all objects created through a class are called instances of that class (house made from that blueprint)
// - we can use a class to create as many instances as we need in our application (can make as many houses as we need with the blueprint)
// - all of the instances have different data in them, but share the same functionallity

// The 4 Fundamental OOP Principles
// ---------------------------------

// How do we actually design classes?
// How do we model real-world data into classes?

// - not a single correct way of designing classes
// - there are 4 fundamental principles that can guide us towards a good class implementation:
// Abstraction, Encapsulation, Inheritance and Polymorphism

// ABSTRACTION:
// - Ignoring or hiding details that dont matter
// - allowing us to get an overview perspective of the thing we're implementing instead of messing with details that dont really matter to our implementation

// ENCAPSULATION:
// - keeping properties and methods private inside the class
// - this is so they are not accessible from outside the class
// - some methods can be exposed as public interface (API)
// - prevents external code from accidently manipulating internal properties/state
// - allows to change internal implementation withoout the risk of breaking external code

// INHERITANCE:
// - making all properties and methods of a certain class availabe to a child class
// - this forms a hieracrchical relationship between classes
// - this allows us to reuse common logic and to model real-world relationships

// POLYMORPHISM:
// - a child class can overwrite a method it inherited from a parent class
// - it's more complex than that, but enough for our purposes

//////////////////////////////////

// OOP in JavaScript
// =================

// Classical OOP:
// --------------
// - a CLASS is like a blueprint that we use to create objects
// - all objects created from a class are called INSTANCES of that class
// - the process of creating an instance is called INSTANTIATION

// JavaScript OOP:
// ---------------
// - in JS, things work a bit differently
// - it's very important to understand the class/instance model of classical OOP because in JS there are very similar concepts
// - many people actually use classical terminology to describe how OOP works in JS
// - JS itself uses some of these terms, for example: INSTANCES

// How does it work in JavaScript?
// -------------------------------
// - in JS, we have something called PROTOTYPES
// - all objects in JS are LINKED to a certain prototype object
// - this means that each object has a prototype
// - the prototype object contains methods and properties that all the objects that are linked to that prototype can access and use
// - this behaviour is usually called PROTOTYPAL INHERITANCE

// - NOTE: This inheritance is different from the inheritance from the last lecture. In the last lecture, we talked about one class inheriting from another class. Prototypal Inheritance deals with an instance inheriting from a class.

// Prototypal Inheritance:
// -----------------------
// - the prototype contains methods (behavior) that are accessible to all objects linked to that prototype
// - we can also say that behaviour is DELEGATED to the linked prototype object
// - behaviour is just another term for methods in this context
// - prototypical inheritance aka prototypical delegation
// - technically, objects delegate their behaviour to the prototype

// - NOTE: On the other hand, in classical OOP - the behaviour (methods) are actually copied from the class to the objects, which is completely different

// - we have seen this mechanism many times before without realizing it
// - for example, when we use the array method like "map", we are able to use the method because of prototypal inheritance
// - e.g.: Array.prototype.map

// Array.prototype
// ---------------
// - this is the prototype object of all the array objects we create in JS
// - therefor, all arrays have access to the map method!
// - any array that is created will be linked to the Array prototype, and so it has access to the methods that are defined within the Array.prototype object - just like the map method
// - so in a sense, we can say that the a created array inherits the map method, OR the array delegates the behaviour of mapping to its prototype
// - its important to note that the map method is actually not defined on the created array itself, but on its prototype

// -----------------

// How do we actually create prototypes?
// How do we link objects to prototypes?
// How can we create new objets, without having classes?
// How do we implement OOP in JavaScript in practice?

// In JS, there are actually 3 different ways of doing this:
// 1. Constructor functions
// 2. ES6 Classes
// 3. Object.create()

// 1. CONSTRUCTOR FUNCTIONS
// ------------------------
// - technique to create objects programmatically from a function
// - this will also set the new objects prototype
// - this is how built-in objects like Arrays, Maps or Sets are actually im plemented
// - this is how OOP has been done in JS since the beginning

// 2. ES6 CLASSES
// --------------
// - ES6 release introduced classes to JS
// - modern alternative to constructor function syntax
// - "Syntactic sugar": behind the scenes, ES6 classes work EXACTLY like constructor functions
// - ES6 classed do NOT behave like classes in "classical OOP"

// 3. Object.create()
// ------------------
// - the easiest and most straightforward way of linking an objct to a prototype object
// - not as used as the other two methods

// NOTE: The 4 Pillars of OOP are still valid and important with prototypal inheritance (abstaction, encapsulation, inheritance, polymorphism)

//////////////////////////////////

/*

// Constructor Functions and the new Operator
// ==========================================

// Constructor Functions
// ---------------------
// - we can use constructor functions to build an object using a function
// - a constructor function is actually a completely normal function, the only difference being that we call a constructor function with the "new" operator
// - in OOP, there is a convention that constructor functions start with a capital letter
// - other built in constructors like Array or Map follow that convention as well
// - a function declaration and a function expression will work as a function constructor, however - an arrow function will not work because it does not have its own "this" keyword, which is needed
// - never create a method inside of a constructor function, this is because if we have many instances created from it, its like creating multiple copies of the method, bad for performance
// - instead we use prototypes and prototypal inheritance

const Person = function (firstName, birthYear) {
  // console.log(this);

  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Bad practice, don't add methods this way
  // this.calcAge = function () {
  //   console.log(2037 - birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// new Operator
// -------------
// - used to call the constructor function

// I. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype (creates __proto__)
// 4. function automatically return {}

// - we can now use this constructor function to create as many different objects as we want

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// - in classical OOP, when you create an object from a class, it is called an instance
// - what we just did in JS did not use classes, JS technically does not have classes
// - what we did was create an object using a constructor function
// - constructor functions have been used since the beginning of JS to simulate classes
// - we can still say that they object is an instance of the constructor function

// Testing if an object is an instance of a constructor function:
const jay = 'Jay';
console.log(jonas instanceof Person); //true
console.log(jay instanceof Person); //false

// NOTE: function constructors are not really a feature of the JS language. Instead, they are simply a pattern that has been developed by other developers, and is now popular.

//////////////////////////////////

// Prototypes
// ==========
// - each and every function in JS automatically has a property called prototype
// - this includes constructor functions
// - every object that is created by a certain constructor function will get access to all the methods and properties that we define on the constructor's PROTOTYPE PROPERTY
// - this prototype property is actually an object, so we can add methods to it the same way we would add methods to a regular object

console.log(Person.prototype);

// adding a method to the prototype property
// - remember that the "this keyword" is set to the object that is calling the method
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// - what we just did is add the calcAge function as a method for the Person constructor function's prototype property
// - this means that any instance of Person will have access to this method

jonas.calcAge();
console.log(jonas);

// NOTE: jonas does not contain the calcAge method, it has access to the method through prototypal inheritance. There is only one copy of that method, and it is in contained in the Person.prototype property. All instances of the Person constructor function now have access to this property, but they do not contain this property - they delegate the functionality of this property to the construcor function's prototype property.

// checking if an object is an in

console.log(jonas.__proto__); // the prototype of the object
console.log(Person.prototype); // prototype property of Person

//RAMBLE
// - notice that the __proto__ propery shows the prototype of the objet it is called on - this is not the prototype property of that object, just the prototype from which it was created from
// - the prototype property shows the contstructor function's methods and data that it will pass to an instance created from it
// - so __proto__ is viewing the properties that have been passed
// - prototype is viewing the properties that will be passed
// - essentially the same thing, except one property belongs to the instance, while the other belongs to the constructor function

// - Person.prototype is NOT the prototype of Person, instead it is the prototype that is going to be used by all the instances created from Person
// - __proto__ is the prototype

console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// - the naming sucks due to historical reasons

// -------------------

// - when the new function links the new object to the prototype, it sets the __proto__ property of the new object to equal the prototype property of the constructor function

//Can also set properties on the prototype:
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// - as with methods, this property is inherited through the prototype property of the constructor function
// - this means that it is accessable to but not contained within the instances of the constructor function
// - in other words, the inherited properties are not the instances "own" properties

console.log(jonas.hasOwnProperty('firstName')); //true
console.log(jonas.hasOwnProperty('species')); //false

//The Prototype Chain
// ------------------
// - the fact that jonas is connected to a prototype, and the ability of looking up methods and properties in a prototype - is what we call a prototype chain
// - the jonas object and its prototype form a prototype chain, however the prototype chain does not end here
// - jonas's prototype belongs to Person.prototype.
// - remember that Person.prototype is also an object, and therefor also has a prototype (__proto__)
// - the prototype for Person.prototype is Object.prototype

// Why is this?
// - Person.prototype is just a simple object
// - this means it has been built by the built in object constructor function
// - the built in object constructor function is actually the function that is called behind the scenes whenever we create an object literal

// {...} = new Object(...)
// - essentially, the curly braces are just like a shortcut to writing "new Object()"

// - Object.prototype is usually the top of the prototype chain, which means that its prototype is null (__proto__)
// - this marks the end of the prototype chain
// - simillar to the scope chain, but with prototypes
// - in a scope chain, whenever JS can't find a certain varialbe in a certain scope it looks up into the next scope in the scope chain and tries to find the variable there
// in a prototype chain, whenever JS can't find a certain property or method in a certain object, it's going to look up into the next prototype in the prototype chain and see if it can find it there

//////////////////////////////////

// (using code from last lecture)

// Prototypal Inheritance on Built-In Objects
// ==========================================

// Person.prototype
console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
// null
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 3, 6, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__ === Object.prototype);

// We can actually extend the functionality of arrays even further by adding methods ourself to the Array.prototype property. All the arrays will now inherit the methods we add

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// - this is generally not a good idea unless you're working on a small project on your own
// - the next version of JS might add a method with the same name, but it might work in a different way. If that method is used over yours - it will most likely break your code
// - when working on a team, if multiple developers implement the same meethod with a different name then that is going to create a lot of unnecessary bugs

// - HTML elements are also objects, check out the prototype chain of the following element as an excercise:
const h1 = document.querySelector('h1');

// - functions are also objects, so they also have a prototype (__proto__)
console.dir(x => x + 1);

*/

//////////////////////////////////

/*

// Coding Challenge #1;
// ====================

// Watch videos for details
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  console.log(`${(this.speed += 10)} km/h`);
};

Car.prototype.brake = function () {
  console.log(`${(this.speed -= 5)} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

// Test
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.brake();

*/

//////////////////////////////////

// ES6 Classes
// ===========
// - they do the exact same thing as constructor functions, but with a nicer, more modern syntax
// - classes in JS do not work like traditional classes in other programming languages such as Java and C++
// - JS Classes still implement prototypal inheritance behind the scenes but with a syntax that makes more sense to people coming from other programming languages

// Implementing "Person" using a Class
// - we can create a class as an expression or a declaration, this is because behind the scenes - classes are still functions
// - inside the class, we need to add the constructor method - has to be named this. Works simillarly to the the constructor function we learned about earlier in the sense that it is used to add the instances OWN properties, aka the properties that we want an instance to have
// - note that this constructor method belongs to the class

// class expression
// const PersonCl = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // adding a method to the class's .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

// Adding Methods to a Class:
// --------------------------
// - notice that we add the method directly into the class
// - note that this method belongs to the prototype of the instance, not the instance itself
// - also note that there are no commas between methods

// - We still use the "new" keyword to create an instance of the class
// - when we use the new keyword on the class, the constructor method of the class is automatically called
// - the 4 steps of the "new" keyword happen as usual, and the new object is returned
const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

// Works exactly the same as using constructor functions, just looks nicer

console.log(jessica.__proto__ === PersonCl.prototype);

// Can add methods through the .prototype property if you wanted to, but no point in doing that

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are not hoisted
// 2. Classes are first-class citizens (can be passed and returned by functions)
// 3. The body of a class is always executed in strict mode

// You can use either constructor functions or classes, its based on preference. However, es6 classes are probably more popular as well as generally neater
