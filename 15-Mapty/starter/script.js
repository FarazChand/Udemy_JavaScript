'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Creating App Class:
class App {
  // Creating Private Instance Properties
  #map;
  #mapEvent;
  constructor() {
    // Triggering the Geolocation API:
    this._getPosition();

    // 3 Adding event handler to the form when submitting
    // - the enter key will be used for this
    form.addEventListener('submit', this._newWorkout.bind(this));

    // 8. Listening for the "change" event on the drop down menu:
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // Checking if browser supports the geolocation API:
    if (navigator.geolocation) {
      // Calling the geolocation API:
      navigator.geolocation.getCurrentPosition(
        // Call-back used if Geolocation Successful:
        this._loadMap.bind(this),

        // Call-back used if Geolocation Unsuccessful:
        function () {
          // Filler
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    // Getting the coords from the position objects properties:
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    // Storing the position properties in an array
    const coords = [latitude, longitude];

    console.log(this);

    // Created map object and stored results in the map varialbe:
    // - Note that the 'map' variable is global
    this.#map = L.map('map').setView(coords, 14);

    // Creating and adding tile layer:
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Creating and adding initial marker on current position:
    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();

    // Adding the leaflet event handler to the map object:
    // - handling clicks on the map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    // Assigning the global variable the value of the mapE:
    this.#mapEvent = mapE;
    // Render the form:
    form.classList.remove('hidden');
    // Focus on the Distance input field after form renders:
    inputDistance.focus();
  }

  _toggleElevationField() {
    // 9. Selecting which Elements should toggle the 'hidden' class:
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();
    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        // Setting pop up Propeprties
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Working')
      .openPopup();
  }
}

// Creating an instance of the 'App' Class:
const app = new App();

///////////////////////////////////////////////////
/*

// Geolocation API
// ===============
// - is in fact a browser API just like internationalization, or timers... etc
// - a very modern API, many modern APIs such as ones that can access a users camera or make a phone vibrate
// - attempts to get the co-ordinates of the current position of the user
// - this method takes two arguements as parameters

// - the "getCurrentPosition" method takes two arguments:
// a) the callback function that will be called on success
//    - called with a parameter that we call "position" parameter
//    - we can call it whatever we want
// b) the error call back, happens when an error is returned

// wrap in an if statement incase old browsers don't support this API, if this is the case it will simply not run
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      
    },
    function () {
      alert('Could not get your position');
    }
  );
}

*/
/////////////////////////////////////////////////
/*

// Displaying a Map Using Leaflet Library
// - we can google leaflet for information on it
// - Leaflet is a third party library
// - its an open-source JS library for mobile friendly interactive maps
// - essentially, it is a library that other developers wrote that we can include for free in our own code and use it
// - in this case we can use it to dispay maps

// - when ever we use a third-party library, the first thing to do is to include it in our site
// - we can download it or use a hosted version of it
// - we can also use a JS package manager to install it, whih is the more elegant way that we will do in the future

// - We will use a hosted version for this project
// - this basically means that we can use a version of this library that is already hosted by someone else
// - in this case it is in a CDN, which is a content delivery network - which requires a CSS file and a JS file
// - this is the easiest way to get started

// - we copy and paste the Hosted Verion's indicated code into our html head
// - we paste it before our own script because it's in our script that we will use the Leaflet library
// - by the time our script loads, the browser must have already downloaded the leaflet library - because otherwise our code will not be able to work with that library
// - since the order of which the scripts are downloaded is very important, we need to add the "defer" attribute to the Leaflet JS file that we added to our html head
// - remember that we should never put any JS scripts in the head without them having the "defer" or "async" attributes

// - now we have included the library to the site, but we still need to do something with it
// - we are going to use the functions that are defined in this library to our advantage
// - there is a lot of information on how we can use these functions on the Leaflet website's overview page

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      // Original Code from Leaflet
      // ==========================
      // var map = L.map('map').setView([51.505, -0.09], 13);

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution:
      //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // }).addTo(map);

      // L.marker([51.5, -0.09])
      //   .addTo(map)
      //   .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      //   .openPopup();

      const map = L.map('map').setView(coords, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
    },
    function () {
      alert('Could not get your position');
    }
  );
}

// - we copy and pasted the code to make a map appear and a marker
// - we pasted it in the succes function of the getCoordinates method, after we get our lattitude and longitude
// - we have to adapt the original code to our current situation

// - first lets change the var to const
// - then, whatever sting we pass into the map function must be the id name of an element in our html, and it is in that element which the map will be displayed.. so this means that within our html we need an element with the ID of map.. if we change it here, we would also have to change it in our html
// - lastly, lets plug in our long and lat into the function, notice that the "setview" method excepts an array with two indexes as the first argument (lat and long), it has a second parameter which is the zoom level of the map
// - we also have to add the coords to the marker method at the end
// - (this would all be in the docs)

// - Note that the "L" is the main function that leaflet gives us as an entry point, its a namespace - just like Intl
// - this "L" namespace has a couple of methods that we can use
// - one of the methods is the "map" method, another one is the "tileLayer" method, and also the marker method which allows us to display markers
// - "L" is essentially a global variable inside of the script of Leaflet

// Tile Layer
// - the map we see on the page is basically made up of small tiles
// - the tiles come from openstreetmap url
// - this is an open source map that everyone can use for free
// - this is the map that we are goin to use, but Leaflet works with all sorts of maps, e.g. googlemaps, if that's the one that your prefer

// - the "tile layer" method takes a url as an argument, and we can actually use the url to change the appearance of the map
// - so we will change the theme by changing the url, in this case we change it from "openstreetviewmao.org..." to "openstreetview.fr/hot..."
// - this is simply another theme of these tiles, we can find more variations on google

*/
/////////////////////////////////////////////////
/*

// Displaying Map Marker
// ====================
// - the first thing we have to do is add the event handler to the map so that we can then handle any incoming clicks
// - if we just attach an event handler to the whole map element, it wouldn't really work because then we would have no way of knowing where exactly the user clicked on the map, we don't know the coordinates of the location
// - that is data that only the map object, (defined in our script, and generated by the use of the L namespace from the Leaflet library) knows
// - we need access to the coordinates of the point that was just clicked
// - what this means is that we cannot simply use the addEvent listener that we have been using all the time
// - instead we can use something simillar that is available on the leaflet library

// - this is where the map variable comes into play for the first time
// - remember that we stored the results of creating the map in a variable
// - which is important because it's on to this map object where we can basically add an event listener
// - the idea is similar to what we do when we add an event listener, but on the map, we can simply call the "on" method
// - remember that the "on" method is not coming from JS itself, it is instead coming from the Leaflet library

// - the map object was an object generated by leaflet, we know this because we returned the result of using the "L" object, which is part of the Leaflet library

// .on
// ===
// - very similar to addEventListener
// - we can specify a type of event as the first argument
// - second argument is a callback as an argument which is passed the 'mapEvent' event
// - when leaflet calls this call-back function, it will do so with a special map event, which is an event created by leaflet, which we called 'mapEvent'
// - if we console log this event, it will appear in the log everytime we click on the map. If we look at the events properties we can find a property called 'latlng', where we can see what the coordinates are for the area of the map we clicked
// - now we just need to make a marker appear every time we click the map, which we can do by using the code we copied from the leaflet website to show our location with a marker in the beginning

// - now the marker is showing up, but its pop up message dissapears when we click on a new location on the map, we don't want this behaviour
// - we also want to add some custom formatting to these pop ups, we can do this because Leaflet allows you to add your own class names to the pop up
// - the L.marker method allows you to define the position of where your marker is placed
// - the L.addTo method allows you to add this marker to the map object, and displays the marker
// - the L.bindPopup method allows you to define and attach a popup message to the marker - we can simply pass in a string, however, instead of that we can also create a brand new pop up object which will then contain a couple of options
// - we do that by passing the L.popUp method to previously mentioned L.bindPopUp method
// - L.popUp takes an object as an argument

// - remember that all of this is in the documentation on the Leaflet website... every library that we use will have some docutmentation, otherwise we would not know how to use their API
// - on leaflet, there is a tab called "Docs", which is where all the documentation is
// - as we can see on from the documentation, we can add options to the marker itself aswell as the popup message

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      const coords = [latitude, longitude];

      // Created map and stored results in the map varialbe
      const map = L.map('map').setView(coords, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      map.on('click', function (mapEvent) {
        console.log(mapEvent);

        const { lat, lng } = mapEvent.latlng;

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            // Setting pop up Propeprties
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Working')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}

*/
/////////////////////////////////////////////////

// Rendering Workout Input Form
// ============================
// - we want this to render whenever the user clicks on the map
// - we want this to happen before the marker actually pops up on the map, we don't want the marker to even pop up until the form has been submitted
// - so we want to render the form when the map is clicked, then when the form is submitted, we want to place a map marker in the location at which the map was clicked
// - this means that we need to add the from rendering to the map objects event listener, and then create an event listener for the submit button on the form that causes the marker to pop up

// - in our html, the form has the class of "form" and "hidden", so we will be using DOM manipulation to add/remove the hidden class

//

// Checking if browser supports the geolocation API:
// - some browsers don't support this API, so we have to check before trying to execute it
// - we do this by wrapping the method in an if statement
// - if it does not exist, the code will simply not run

// Calling the geolocation API:
// - we access the geolocation API through the 'navigator.geolocation.getCurrentPosition()' method
// - this method takes two arguments
// - the first argument is the call-back function that is called when the method is successful
// - the second is the call-back function that is called when the method is unsuccessful

// Call-back used if Geolocation Successful:
// - if succesful, an object called "position" will be generated and passed to the call-back function in the first argument before being executed
// - this object contains a lot of data about the user's location
// - as we know, the 'this' keyword of a function points to the object which called it
// - we must explicitly bind the "this" keyword for this function call because it is actually being called by the Geolocation method, which is undefined
// - so we have to use the bind method and pass it "this" as an argument
// - remember that the bind method returns a new function, it doesn't call it
// - this is why we can use it with a call-back function
// - note that functions that use call-back functions as arguments require them to be passed as values, and not calls - they get called later

// Getting the coords from the position objects properties:
// - the 'postiton' object contains a property called 'coords' which is an object containing a lot of data about the users location
// - among the 'coords' object data are the 'latitude' and 'longitude' properties
// - we can deconstruct this object and store the relevant properties in variables with the same names
// - we can store these properties into an array, which makes them easier to pass to the methods that require an array as an argument

// Created map object and stored results in the map varialbe:
// - we use the methods from the 'L' namespace in order to create a map
// - this namespace uses two methods to do this: '.map' and '.setView';

//    ->'.map':
//    --> can take an element's id as an argument
//    --> we pass it an element id that belongs to an empty element in which we plan on displaying the map
//    --> note that it only seems to work if that element's id is 'map'
//    --> will return an object containing the maps default values(how exactly, idk)

//    ->'.setView':
//    --> takes 2 arguements: an array of coordinates containg lat and long values, and a zoom levek
//    --> will set the map to center on the coordinates we pass as an argument, and set the zoom level as specified
//    --> will return an object containing the maps new values

// - these methods chained generate a map and return an object with the map's data
// - we have a global varable called 'map' which we will use to store the object returned

// C. Creating and adding tile layer:
// D. Creating and adding initial marker on current position:
// E. Adding the leaflet event handler to the map object:
// F. Assigning the global variable the value of the mapE:
// G. Render the form:
// H. Focus on the Distance input field after form renders:

// ~~~~ Call-back used if Geolocation Unsuccessful ~~~~
// J.

// 8. Listening for the "change" event on the drop down menu:
// - we want to add an event listener to the drop down menu, which is the 'select' element in our html
// - note that when a value in a drop down menu changes, an "change" event happens
// - we want certain elements to toggle their visibility when this change event fires

// 9. Selecting which Elements should toggle the 'hidden' class:
// - we know that we want to switch between the 'Elevation' input and the 'Cadenence' input being visible, only one or the other should be visible
// - in order to do this, we need to toggle the hidden class on their parent element, aka the form row that contains them
// - their parents don't really have unique names so we we do this through DOM traversing
// - why their parents? Think of it this way, we don't just want to hide the input box, we want to hide the whole row of that input field on that form
// - this is so the field we want to show can slide into its place fully instead of being awkwardly placed under the rest of the fields
// - if we just hid the input fields, the row would still be there, taking up space and throwing off the design

//

// Project Architecture
// ====================
// - provides structure and organization to your project, in this structure, we can then develop functionality
// - in this project, we decided that the main structure will come from classes and objects... aka oop
// - one of the most important aspects of architecture is deciding where and how to store the data
// /////////////////////////////////////////////////////////////////

// Creating an instance of the 'App' Class:
// - we need to create an instance  of our 'App' class in order to actually do anything
// - without creating an instance, all we have is a blueprint
// - as soon as the page loads, this instance should be created so that it's constructor function can execute
// - this starts the process of our app
// - we accomplish this by writing this code as the first line of code, after our variable and function definitions of course

// Triggering the Geolocation API:
// - note that all the code in the top level code, aka outside of any function, will get executed immediately as the script loads
// - we want the geolocation API to be executed right at the point where the application loads, as the page is accessed
// - to do this, we need to use the '_getPosition' method
// - the constructor function of a class is called immediately when a new object is created from the class it belongs to
// - the instance of the 'App' Class is created in the beggining, right as the page loads
// - this means that the constructor method for that class is also executed immediatly as the page loads
// - so what we can do is simply get the position in the constructor, using the corresponding method
// - we access it using the 'this' keyword, since it is a method of the class

// Creating Private Instance Properties
// - the private instance properties will be available to all the instances created from the class they belong to
// - we make the 'map' and the 'mapEvent' private instance properties
// - we do this so the 'App' instance that is created as soon as the page loads has access to these properties
// - we need this to be the case because so many of the methods it inherits from its class rely on these properties
