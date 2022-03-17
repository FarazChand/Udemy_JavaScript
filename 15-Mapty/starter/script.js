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

// Global Variables for access
let map, mapEvent;

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

// Checking if browser supports the geolocation API
if (navigator.geolocation) {
  // Calling the geolocation API
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // Getting the coords from the position objects properties
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      // Storing the position properties in an array
      const coords = [latitude, longitude];

      // Created map object and stored results in the map varialbe
      // - Note that the map variable is global
      // - passed the coords and the zoom level to setView
      map = L.map('map').setView(coords, 14);

      // Creating and adding tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Creating and adding initial marker on current position
      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

      // Adding the leaflet event handler to the map object
      // - handling clicks on map
      map.on('click', function (mapE) {
        // Assigning the global variable the value of the mapE
        // - this is so we can access the event elsewhere
        mapEvent = mapE;

        // Render the form
        form.classList.remove('hidden');

        // Focus on the Distance input field after form renders
        inputDistance.focus();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}

// Adding event handler to the form when submitting
// - the enter key will be used for this
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Display marker
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
