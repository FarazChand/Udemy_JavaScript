'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////

// How the DOM Really Works
// - the DOM is the interface between our JavaScript code and the browser, or more specifically - HTML documents that are rendered in by the browser
// - allows us to make JS interact with the browser
// - we can write JS to create, modify and delete HTML elements; set styles, classes and attributes; and listen and respond to events
// - DOM tree is gereated from an HTML document, which we can then interact with
// - DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree such as:
// .querySelector() / .addEventListener() / .createElement() / .innerHTML / .textContent / .children / etc ...

// - In the DOM, there are different types of nodes
//  - some are html elements, some are just text
// - all of the DOM methods and properties are orginized into these different types of nodes/objects

// How the DOM API is organized behind the scenes:
// - every single node of the DOM tree is of the type "Node"
// - each node is represented in JS by an object
// - this object gets access to special node methods an properties, such as: .textContent, .childNodes, .parentNode, .cloneNode() and many others
// - The main node type has a couple child types, these are: Element, Text, Comment and Document types

// - anytime there is text within an element, it gets its own node - this node is considered a text type node, the same thing happens to html comments - this is because the rule is that everything in the html must go into the DOM
// - for the element itself, there is an element node - which gives each html element access to tons of useful properties such as: .innerHTML , .classList, .children, .remove(), etc..
// - each element will be represented internally as an object
// - the element type has internally an HTML child type - which itslef has its own child type for each hmtl element that exists in html - this means that there is a special type for buttons, images, links, etc..
// - each of these html elements can have different unique properties, for example how images have a src property, or how anchor elements for links have an href attribute. These attributes are unique to their elements
// - the DOM needs a way of storing these different attributes and therefor different types of html elements were created in the DOM API

// IMPORTANT: What is INHERITANCE?
// - what makes all of this work is something called "inheritance"
// - inheritance means that all the child types will also get access to the methods and properties of all their parent node types
// for example, an HTML element will get access to everything from the element type, it will also get access to everything from the node type - these are both parent types to any HTML element
// - so we can think of this as if the HTML button element, is also and element, and also a node

// - we will learn more about inheritance when we start learning about OOP
// - for now we should understand that the DOM API is broken up into these different types of nodes
// - also, each of these types of nodes has access to different properties and methods, and some of them even inherit more properties and methods from there ancestors in this organization

// Document Node Type
// - document. .....  is just another type of node
// - it contains important methods such as: .querySelector(), .createElement and .getElementByID
// .querySelector is available on both the document and element types, this is IMPORTANT to note for later

// - The DOM API needs a way of allowing all nodes to listen for events
// - we usually listen for events by calling the addEventListner method on an element, or the document
// - this works because of the special node type called Event Target, which is the parent of both the Node type and the Window node type
// - because of this, we can call addEventListner to every type of node in the DOM API
// - we never manually create an Event Target object, it is just an abstract type - happens behind the scenes

///////////////////////////////////////

// /*

// Selecting, Creating and Deleting Elements:

// Selecting the document, head and body:
// - to select the document, head and body elements, we don't need to specify a selector, just access them directly as shown below:
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// querySelctor and querySelectorAll:
// - we can use querySelector to select an element based on a class
const header = document.querySelector('.header');
console.log(header);

// - we can select all elements that contain the specified class using querySelectorAll
// - this returns a node list which contains all the relevant elements
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// - we can also select and element by ID using the following method
// - we dont need the selector for this method (#)
const section1 = document.getElementById('section--1');
console.log(section1);

// - get all elements based on their tag name
// - this method returns an HTML collection
// - an HTML collection is different from a node list, it is considered a 'live' collection
// - this means that if the DOM changes, the collection is updated automatically
// - ex: if a button is removed, the collection will reflect it
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// NOTE:
// - the same does not happen with a node list
// - if you delete one of the elements in a node list, it will not be reflected automatically in the variable that you originally store the node list in

// - get all alements by class name
// - simillar to ByID and ByTagName, don't need a selector - simply the name of the class
// - will also return a live HTML collection
document.getElementsByClassName('btn');

// Creating and inserting elements:
// - we can create HTML elements by using the .insetAdjacentHTML function that we used before in the bankist application
// - we used it to create movements
// - quick and easy way to create elements
// - more info in the last section
// - sometimes its better to build an element from scratch, more programatically, using a combination of other methods

// METHOD: .createElement:
// - create an element and store it into a variable
// - upon creation, the element is not yet in our DOM
// - however, we can use it to do something such as: add classes
// - we can also do things like add text content or inner HTML
// - we can do this because it is an object just like any element that we've selected through other methods, the only difference is that it doesn't exist in our DOM yet
// - if we want it on the page we have to manually insert it into the DOM
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// Inserting an element as a child:
// - lets insert this element into the header element that we selected earlier
// - notice that the element can only be in one place at a time even though we added it twice in different places, this is because there is only one element, when we add it somewhere else, it moves from its original position
header.prepend(message); // adds it as the first child
header.append(message); // adds it as the last child

// NOTE:
// - this means that we can use prepend and append methods not only to insert elements, but also to move them
// - this is because a DOM element is unique, so it can always only exist in one place at a time

// Inserting Mulitple Copies of the same element:
// - we clone the element first
// - passing "true" lets the method know that we want all the child elements copied as well
// - then insert it as usual (example below, unccomment if needed)
// header.prepend(message.cloneNode(true));

// Inserting an element as a sibling:
// - method names are self explanitory
header.before(message);
header.after(message);

// Delete elements:
// - using an event listner for this example..
// - when the specified element is clicked, in this case a button with the specified class name, we call the .remove() method on the element we want removed
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // modern way
    // message.parentElement.removeChild(message); // old way
  });

///////////////////////////////////////

// Styles, Attributes and Classes:

// Styles
// - these styles are set as inline styles, directly in the DOM
// - this is why we can't read styles this way, we are just reading the inline styles - which are normally empty

message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
console.log(message.style.height); // nothing
console.log(message.style.backgroundColor); // we set this earlier so it works

// Getting the style another way
// - will get the computed style, meaning the value that makes the element appear the way it does on the actual page - even if we didnt set the value ourselves in the css
// - this method will get you all of the properties with all of the values of this element
// you can specify what property you want specifically at the end by chaining it to the end of the method
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
