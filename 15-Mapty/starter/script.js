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

// Displaying Map Marker
// ====================

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

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
