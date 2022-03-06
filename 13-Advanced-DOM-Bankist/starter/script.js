'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

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

// Button Scrolling

// Adding an event listner to the button we want to click
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  // --
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // Can read height and width of viewport:
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // --

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Smooth Scrolling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // MODERN WAY
  // - don't need coords or offset, just pass an object with the behaviour property set to smooth
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation

// WITHOUT EVENT DELEGATION
// - this works but is not very efficient
// - this is bad because we are adding a function to every link
// - if we had 10, 000 links of this class and we added a function like this to each of them, it would not be efficient and cause problems.

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// I. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

// // Bad practice, should use event delegation
// tabs.forEach(t => t.addEventListener('click', () => console.log('Tab')));

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  // Gaurd Clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing an "argument" into a handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation: Intersection Observer API

const header = document.querySelector('.header');

// - getting rootMargin value dynamically:
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // interested in entire view port
  threshold: 0, // we want stickyNav as soon as header scrolls out of view
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

allSections.forEach(function (section) {});

///////////////////////////////////////
///////////////////////////////////////
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

/*

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
// - the result of this is a string
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
console.log(message.style.height);

// Working with Custom Properties(CSS Variables):
// - if we can change these properties in the CSS file, we can also change them through JavaScript
// - these properties are defined in the 'root', which is equivalent to the document element in javascript
// - we use the setProperty method to change these properties, as shown below
// - pass the name, and the new value
// - can do the same for all properties, but its usually easier to do it like above for other properties

document.documentElement.style.setProperty('--color-primary', 'orangered');

//Working with Attributes:
// - src, alt, href, etc... are all attributes
// - in JavaScript, we can access and change these attributes
// - if we add a standard property to the HTML elements attributes, JS will automatically add it to the object - if it is not a standard attribute, this will not happen

// Reading Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className); // nav__logo

// Non-Standard
console.log(logo.designer); // undefined, not standard
console.log(logo.getAttribute('designer')); // works this way

// Setting Attributes
logo.alt = `Beautiful minimalist logo`;
logo.setAttribute('company', 'Bankist'); // for non-standard

// Images and Links
// - the relative URL is what appears in our html, notice how the results differ below
console.log(logo.src); // returns absolute URL, different from HTML
console.log(logo.getAttribute('src')); // returns relative URL

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute
console.log(link.getAttribute('href')); // relative

// Data Attributes
// - a special type of attribute that start with the word 'data'
// - Example propert: data-version-number="3.0"
// - these attributes will be at logo.dataset, camel case the rest of the value as shown below
console.log(logo.dataset.versionNumber);

// Classes
// - can add multiple class names to create multiple values

// logo.classList.add('a', 'c')
// logo.classList.remove()
// logo.classList.toggle()
// logo.classList.contains() // not includes like arrays

// Don't do this
// - will overwrite all the existing classes
// - only allows us to put one class on an element
// - logo.className = 'Jonas'

*/

/////////////////////////////////////

/*

// Old way of smooth scrolling:

// Selecting relevant elements
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Adding an event listner to the button we want to click
btnScrollTo.addEventListener('click', function (e) {
  // Getting the coords for the element we want to scroll to
  // - this method also gets a lot of other information
  // - the x and y coords of the element are stored in the .left and .right properties of what is returned from the method below
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  // --

  // The following is just to show functionality, not part of smooth scroll:

  // Can get current scroll coords:
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // Can read height and width of viewport:
  // - does not include any scroll bars
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // --

  // Scrolling
  // - you need to add the current scroll position to the top value, if you don't do this - the method will cause the browser to scroll a fixed amount equal to the top coord
  // - this is a problem because if you are not at the top of the page, it will scroll passed the desired coords
  // - this means that it is relative to the viewport, but we want it relative to the top of the page
  // - to fix this, we add the scroll position to the coords
  // - for the sake of completeness, we do this with the X cords as well
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Smooth Scrolling
  //
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });

  // MODERN WAY
  // - don't need coords or offset, just pass an object with the behaviour property set to smooth
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Note:
// - e.target = btnScrollTo, while e is an event object containing the information about the event.. there is a difference



/////////////////////////////////////

// Types of Events and Handlers:
// - an event is basically a signal that is generated by a certain dom node, indicating that something has happened
// - for example, a click somewhere, or the mouse moving, or the user triggering the full screen mode, anything of importance
// - we can listen for these events in our code with our event listeners so that we can then handle them if we'd like
// - even if we don't handle these events, they still happen - doesn't matter if we are actually listening for them or not

const h1 = document.querySelector('h1');

//Mouse enter, another type of event
// - acts like hover, function is executed as the mouse contacts relevant element
// h1.addEventListener('mouseenter', function (e) {
//   alert('addEventListner: Great! You are reading the heading :D');
// });

// //Adding the event without an eventlistener.. ON EVENT PROPERTY
// // - old school, usually always use addEventListener
// h1.onmouseenter = function (e) {
//   alert('addEventListner: Great! You are reading the heading :D');
// };

// Why is addEventListener better?
// - it allows us to add multiple events= listeners, the other method overwrites any existing event listeners
// - we can also remove an event listner if we wanted to

// Removing an event listener
// - the event listener should be stored in a variable or it wont work
// - great if you only need the event to run its listener one time
// - can also remove it after a certain time has passed

// Storing the event listener in a variable
const alertH1 = function (e) {
  alert('addEventListner: Great! You are reading the heading :D');

  // Remove event listener
  // h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// Removing event listener after a certain amount of time
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//Handling events with HTML Attributes
// - should not be used
// - simply defining the event listener directly in the HTML using the On Event Property


*/

/////////////////////////////////////

/*

// Event Propagation: Bubbling and Capturing
// - JavaScript events have a very important property: they have a so called capturing phase and a bubbling phase
// - when a click happens on a link, the dom generates a click event right away
// - however, this event is not generated at the target element (the element where the event happened, the click on the anchor element)
// - the event is acutally generated at the root of the document, the very top of the DOM tree
//  - from there the capturing phase happens, where the event then travels all the way  down from the document root to the target element
// - as the event travels down the tree, it will pass through every single parent element of the target element

// - as soon as the event reaches the target, the target phase begins, where events can be handled right at the target
// - this is done with event listeners
// - event listeners wait for a certain event to happen to a certain target, and when the event occurs it runs the attached callback function

// - after reaching the target, the event actually travels all the way up to the document root again, in the so called "bubbling phase"
// - we say events bubble up from the target to the document root
// - just like in  the capturing phase, the event passes through all its parent elements

// Why is this so Important?
// - basically, its as if the event also happened in each of the parent elements
// - what this means is that if we also attach the same event listener to one of the parent elements of the target, then we would get the exact same - for example - alert window for the parent element as well
// - this means we would have handled the exact same event twice - once at the target, and once at one of its parent elements
// - This behaivour allows us to implement very powerful patterns

// -By default, events can only be handled in the target, and in the bubbling phase
// - however, we can set up event listeners in a way that they listen to events in the capuring stage instead
// - also, not all types of events have a capturing and bubbling phase, some of them are created right on the target element - so we can only handle them there
// - most events do capture and bubble - aka propagate, events propagating from one place to another

// Hard to make sense of it, so lets put it in action:

// Event Propagation in Practice:

// random color
// rgb(255,255,255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop Propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// Notice how when you click on the nav-link, all of the parent elements also change colors - it's as if the click event on the link had happened to all of the parent elements
// If we click only on the nav-links element, the nav link itself will not change colors, but the header will
// If we click on only the nav bar, only the nav bar will change colors, not the two child elements

// The e.target is where the event originated, where it first started
// - THIS IS NOT the element on which the handler is attached

// The e.currentTarget is the element on which the handler is attached to
//  It is the same thing as the this keyword

// You can stop propagation, as shown above
// Not usually a good idea to do this, but sometimes it can fix problems in very complex applications with many handlers for the same events

//
// - so these three event handlers that we setup, receive events from the target elements and also from the bubbling phase
// - in other words, the event handler functions are listening for click events that happen on the element itself, and also for events that keep bubbling up from their child elements

// - events are captured when they come down from the document root all the way to the target
// - note that our event handlers are not picking up these events during the capture phase
// - when we use addEventListener, they only listen for events during the bubbling phase - not in the capturing phase, this is the default behaviour
// -this is because the capturing phase is usually not very useful

// - The bubbling phase can be very useful for something called "event delegation"

// - we can actually pick up events during the capturing phase, we can define a third paramater in the addEventListener function
// true or false, if its true - it picks up events during the capturing phase

*/

/////////////////////////////////////

/*

// Event Delegation: Implementing Page Navigation
// - basically a way to reduce the amount of event listeners you add to your code

// - if we have multiple elements that need a specific function to run when they are clicked, for example, if we want all the links in a nav bar to smooth scroll to their designated sections, event delegation can be very useful and efficient

// - we do this by finding a common parent element and adding an event listener to it (click event for this example)
// - when any child element of this parent element is clicked, it will generate a click event
// - we make sure to pass the event object to the handler function

// - within the handler, we disable the default behaviour, always a good idea to do this
// - then we figure out if the event happened on a relevant child element by accessing the target's (e.target) class list and observing if it contains the relevant class
// - if it does, we check what the items href is, now we know what section we need to smooth scroll to
// - we implement smooth scrolling using our knew information

// - using the principals of event propagation
// - this is just one example of event delegation, there are probably many more

// Re- Watch videos and take notes if needed, all of the code used is in the actually application above

*/

/////////////////////////////////////

/*

// DOM Traversing
// - basically walking through the DOM
// - means we can select and element based on another element
// - sometimes we need to select an element relative to another certain element
// - eg: a direct child or a direct parent element
// - sometimes we dont even know the structure of the DOM at runtime

// Using the h1 element as an example:
const h1 = document.querySelector('h1');

// Going downwards: child
// - remember that querySelector also works on elements, not just the document (like above)
// - the following selects all elements that are children of the h1 element AND have the specified class in their class list
// - this works on all valid elements no matter how deep they are located within the DOM tree
// - if there are other elements with the specified class on the page BUT they are not children of the h1 element, they will not get selected
console.log(h1.querySelectorAll('.highlight'));

// - if we just want direct children:
console.log(h1.childNodes); // shows every child node, not common
console.log(h1.children); // shows HTML collection (live)
h1.firstElementChild.style.color = 'white'; //first child
h1.lastElementChild.style.color = 'orangered'; //last child

// Going upwards: parents
console.log(h1.parentNode); // direct parent node
console.log(h1.parentElement); // direct parent element, same in some cases
console.log();

// - most of the time we actually need a parent element that is not a direct parent
// - in other words, we might need to find a parent element no matter how far it is in the DOM tree
// - for that we use the following method:
// h1.closest('');

// - lets say on the page we had multiple elements with the class of header
// - lets say we only wanted to find the one that is the parent element of our h1 element
// - this method receives a query string just like the querySelectors
// - we will use this a lot for event delegation
h1.closest('.header').style.background = 'var(--gradient-secondary)'; //changing the background color for fun
// - selected the closest parent element with the class of header

// NOTE: if the selector we pass to this method actually matches the element on which we are calling the method on, that will be the element that will be returned
h1.closest('h1').style.background = 'var(--gradient-primary)';

// We can think of querySelectors and the closest method as opposite in the sense that the querySelectors look for children no matter how deep they are in the DOM tree, while the closest method looks for parent elements no matter how far up in the DOM tree. Both accept query strings as arguments

// Going sideways: siblings

// For elements:
console.log(h1.previousElementSibling); // null if none
console.log(h1.nextElementSibling);

// For nodes:
// - most of the time we will not be working with nodes
console.log(h1.previousSibling);
console.log(h1.nextSibling);

// all children:
// - returns an HTML collection, which is not an array..
// - but it is an iterable that we can spread into an array
// - we can then loop over the new array using the forEach method
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

// - in this example, we made all the sibling elements that are not our h1 element scale to half their size

*/
/////////////////////////////////////

// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// const navBottomCoords = nav.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//////////////////////////////////////

// Sticky navigation: Intersection Observer API
// - API allows our code to observe changes to the way a certain target element intersects another element, or the way it intersects the viewport
// - we use the API by typing "new IntersectionObserver()"
// - this function takes a call back function and some options as arguments

// - for the options:
// - root: the element we want our target element to intersect, will be set to the viewport window if null
// - threshold: the percentage of intersection at which the observer callback will be called

// - the callback function will be called everytime the target element is intersecting the root element at the threshold we defined
// - this happens whether we are scrolling up or down
// - this callback takes two arguments, entries and the observer object itself
// - sometimes we only use the entries, sometimes we use both
// - we can actually have multiple thresholds, so the entries is just an array of the thresholds

// - this is really efficient because we only get an event in the situation that we are actually interested in, while doing it the old way tracks an event every time you scroll, no matter how little.. remember that scrolling creates many events - almost as if its tracking every pixle you've scrolled.. so checking what pixle your on through repetitive function calls can be taxing on what ever device you are asking to run your code.. cause lag and issues

// - thresholds: 0 out of the viewport, 1 100% of viewport

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//

// const header = document.querySelector('.header');

// // Getting rootMargin value dynamically:
// const navHeight = nav.getBoundingClientRect().height;

// const stickyNav = function (entries) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null, // interested in entire view port
//   threshold: 0, // we want stickyNav as soon as header scrolls out of view
//   rootMargin: `-${navHeight}px`,
// });
// headerObserver.observe(header);

// Quick Recap:
// - the Intersection observer API allows you to observe how a target element intersects another element, or how it intersects the viewport

// Creating the observer Class(?):
// - to use this API, we use the code "new IntersectionObserver()"
// - we store its return value in a variable
// - this class takes two arguments - a call back function and an object of properties(in that order)

// The Object:
// - the object we pass holds properties such as the root, threshold and rootMargin:
// - the root is the element we want our target to intersect, if it is set to null then the viewport is the root element
// - the threshold is the minimum percentage of our target element that has to be intersected with the root element. If it reaches the specified threshold, the elements are no longer intersecting
// - the rootMargin is a box of a specified number of pixels that will be applied outside our target element. Can be calculated dynamically. It makes it so our target element triggers the threshold earlier or later than it would be by default depending on the value we specify. It would make it as if the root element had changed its height property to reflect the value we specified

// The Callback Function:
// - the callback function is what is executed everytime the target element intersects or stops intersecting with the root element
// - the function takes 2 arguments, entries and the observer object
// - the entries represent the threshold, we can have more than one threshold, so the entries is an array
// - we haven't learned how to use the observer object yet, it is useful sometimes, sometimes it isnt
// - we can use the properties of the entry as conditions for our callback, one useful property is "entry.isIntersecting". We can tell the function to do something if this property is true, and do something else if this property is false

// Calling the Observer Class:
// - we call it by using the variable we stored it in, followed by the ".observe" method.
// - this method takes an argument, which is our target element - or the element we want to observe intersecting the root

// Quick Recap
// Overall
// - create a new observer intersection object
// - create a callback function, taking an argument for entries (and an arugment for the observer object if needed)
// - create an object of properties that define the root element, any thresholds needed, and the root Margin if needed
// - pass the callback function, and the object of properties to the new observer object
// - store the return value into a variable
// - call the ".observe" method on this new variable(object)
// - when calling this method, pass the target element

// The Callback
// - use the properties of the entries to create conditions for whether you execute your code or not
// - for example, a usefull property is "entry.isIntersecting", if true do something, if false do something else

// The Properties Object
// - the root property defines the root element, what we want to observe our target element intersecting (an ancestor element or the viewport)
// - the threshold property defines the minimum amount in percent our target element must be appearing on our root element in order to be considered intersecting
// - if it equals this threshold it is not considered intersecting anymore, but anything above is.
// - the rootMargin

// Note:
// - the entries is an array that contains the value of the thresholds that we pass through the properties object
// - the target element is considered intersecting or not based on the value of these thresholds
// - everytime a threshold is passed in either direction, the callback function is called
// - when this happens, an object containing the properties of the event of the threshold being passed is also created/updated - not sure about this but thats what it seems like
