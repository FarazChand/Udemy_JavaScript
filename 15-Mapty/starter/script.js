'use strict';

// Creating Workout Parent Class to store user input data:
class Workout {
  // Getting current date:
  date = new Date();
  // Creating a unique ID:
  // - turns the current date into a string
  id = (Date.now() + '').slice(-10);
  // Tracking the amount of clicks on the list item using an API:
  clicks = 0;
  constructor(coords, distance, duration) {
    // Storing common data from user input into object's properties:
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  // prettier-ignore
  _setDescription() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

// Creating Running Child Class:
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  //Child class specific methods for running:
  calcPace() {
    // in min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  //Child class specific methods for running:
  calcSpeed() {
    //km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

///////////////////////////////
// APPLICATION ARCHITECTURE
//////////////////////////////

// Variable Declarations:
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Creating App Class:
class App {
  // Creating Private Instance Properties of the App Class
  #map; // map object
  #zoomLevel = 13;
  #mapEvent; // anytime map is clicked
  #workouts = []; // array where workouts are stored after being instantiated
  constructor() {
    // Getting the Location of the User and loading the map:
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // --------- Event Handlers ----------
    // Listening for the "change" event on the drop down menu:
    inputType.addEventListener('change', this._toggleElevationField);

    // Adding event handler to the form when submitting (enter-key):
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Adding an event handler to the parent of our list items, since the items don't exist yet:
    // - moves map to list item's coordinates
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  // Private methods of the App Class
  _getPosition() {
    // Checking if browser supports the geolocation API:
    if (navigator.geolocation) {
      // Calling the geolocation API to retrieve User Coordinates:
      navigator.geolocation.getCurrentPosition(
        // Call-back used if Geolocation Successful, Load Map:
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

    // Storing the position properties in an array:
    const coords = [latitude, longitude];

    // Created map object and stored results in the #map property:
    this.#map = L.map('map').setView(coords, this.#zoomLevel);

    // Creating and adding tile layer:
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Adding the leaflet event handler to the map object, Show Form:
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      // Rendering the markers of local storage data in a place we know the map has been loaded
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    // Saving the click events coordinates in the #mapEvent property:
    this.#mapEvent = mapE;
    // Render the form:
    form.classList.remove('hidden');
    // Focus on the Distance input field after form renders:
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Hide the form
    form.style.display = 'none'; // immediately removes form from UI, hidden at his point
    form.classList.add('hidden'); // adds the hidden class, transitions off page while hidden, can't see this transition which is what we want
    setTimeout(() => (form.style.display = 'grid'), 1000); // changes display back to grid so that it can be visble again when we decide to toggle the hidden class again
  }

  _toggleElevationField() {
    // Selecting which Elements should toggle the 'hidden' class:
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // Creating a function to validate data
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);
    // Prevent the Default behavior of reloading the page:
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; //Default as string, changed to num
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers! ');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, creat cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers! ');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        // Setting pop up Properties:
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    // Common html for both workouts
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♂️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    // html for running workout only
    if (workout.type === 'running')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
          `;

    // html for cycling workout only
    if (workout.type === 'cycling')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // Looking with an element that either contains, or its parent contains, the specified class:
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    // Finding the object in the instance's workout array that has an ID that matches the above element's data attribute:
    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#zoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    workout.click();
  }

  // Local storage is an API that the browser provides to us and that we can use
  _setLocalStorage() {
    // Calling the local storage API and setting a key value pair:
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  // Getting data from the local storage through the API, using the previously defined key:
  // - we do this with the '.getItem' method of the local storage API
  // - we pass the key that we want stored data from
  // - this will return the value in JSON string form, the same way it was stored in the setItem method
  // - we can pass this method into the 'JSON.parse' method to turn it back into its orginal state, in this case it turns back into an array of objects
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    //Checking if data exists
    if (!data) return;

    // If data exists, use it to restore app's 'workouts' array
    this.#workouts = data;

    this.#workouts.forEach(work => {
      // Re-establishing Prototypal chain
      // - when we get the data from the local storage and store it in its original state,
      // - all the data of the objects are still there, but any inherited methods are not
      // - it doesn't have the prototypal chain that we want it to have,  it loses it during the process
      // - so we have to re-establish the chain ourself
      // - this way, we give the workout objects access to all the inherited traits they had before
      // - note that I'm not sure if these is an acceptable method of doing this, not sure if something gets broken doing it this way - but everything seems to be working fine after minimal testing
      if (work.type === 'running') work.__proto__ = Running.prototype;

      if (work.type === 'cycling') work.__proto__ = Cycling.prototype;

      // Render the restored array of workouts in the sidebar
      this._renderWorkout(work);

      // Rendering Marker
      // - will not work in this method since the method is executed immediately
      // - note that getting the location of the user and loading the map can take some time
      // - the rendering of the marker must happen after the map loads, cannot happen before
      // - note that this function is executed right at the very beginning
      // - so instead of trying to render the marker at the same time...
      // - we should just move this logic to a place where we know for sure the map is loaded
      // - that place in our code would be the end of the _loadMap method

      // this._renderWorkoutMarker(work);
    });
  }

  reset() {
    // Removing the specified item from local storage
    localStorage.removeItem('workouts');

    // Reloading our page
    location.reload();
  }
}

// Creating an instance of the 'App' Class:
const app = new App();

// app end
///////////////////////////////////////////////////

// Overview:

// Things we need to know:
// - what events are we going to have?
// - what do we want to happen when these events are triggered?
// - how are we going to make that happen, and what architecture are we going to implement?

// Events, in this order:
// - page load event
// - map click event
// - form submit event
// - 'select' element change event (drop down menu)

// ---------------------
// ---HANDLING EVENTS---
// ---------------------

// When the PAGE LOADS:
// - we want the map to load in, and we want it to be centered on the users location

// When the MAP is CLICKED:
// - we want the form to be visible
// - we want to store the coordinates of the location on that was clicked on the map
// - these coordinates will be stored in the '#map' field, and will be used throughout the class

// When the FORM is SUBMITTED:
// - we want to add a marker to the map at the coordinates stored in the '#map' field

//  When the value of the 'SELECT' element CHANGES:
// - we want the 'elevation' and 'cadence' form rows to swap visibilities

// ARCHITECTURE:
// -------------
// - we want to use OOP, meaning we will use classes and objects to organize and structure our code
// - this means that we will be storing as much (if not all) of our data and methods inside of classes

// - we will have a main class called 'App'
// - this class will hold all the methods and data needed for handling events
// - these methods will be executed by the instantiation of the main class
// - the creation of the instance of the class will cause it's constructor function to execute, which we will take advantage of

// - we will also have a class to store the workout data that we will get from user input
// - this class will be a parent class to two other more specific workout classes: cycling and running

// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// Walk-through:

// Variable Declarations:
// - making it easier to work with the DOM and other relevant data by storing their value in more concise identifiers

// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// Creating App Class:
// - this is the main class of the application
// - we will store all of the data and methods used to handle events in this class
// - these methods will be executed by the instantiation of the main class
// - the creation of the instance of the class will cause it's constructor function to execute, which we will take advantage of

// Creating Private Instance Properties of the App Class:
// - we will add to these properties as needed
// - that is usually when we realize that a piece of data needs to be used outside of the method that it was created in
// - so far: #map, #mapEvent
// ...
// - the private instance properties will be available to all the instances created from the class they belong to
// - we make the 'map' and the 'mapEvent' private instance properties
// - we do this so the 'App' instance that is created as soon as the page loads has access to these properties
// - we need this to be the case because so many of the methods it inherits from its class rely on these properties

// ---------------------------------------------------------------------------------------------------------------------------------------------------------
// Constructor:
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

// Creating an instance of the 'App' Class:
// - we need to create an instance  of our 'App' class in order to actually do anything
// - without creating an instance, all we have is a blueprint
// - as soon as the page loads, this instance should be created so that it's constructor function can execute
// - this starts the process of our app
// - we accomplish this by writing this code as the first line of code, after our variable and function definitions of course

// Getting the Location of the User:
// - note that all the code in the top level code, aka outside of any function, will get executed immediately as the script loads
// - we want the geolocation API to be executed right at the point where the application loads, as the page is accessed
// - to do this, we need to use the '_getPosition' method
// - the constructor function of a class is called immediately when a new object is created from the class it belongs to
// - the instance of the 'App' Class is created in the beginning, right as the page loads
// - this means that the constructor method for that class is also executed immediately as the page loads
// - so what we can do is simply get the position in the constructor, using the corresponding method
// - we access it using the 'this' keyword, since it is a method of the class

// Checking if browser supports the geolocation API:
// - some browsers don't support this API, so we have to check before trying to execute it
// - we do this by wrapping the method in an if statement
// - if it does not exist, the code will simply not run

// Calling the geolocation API to retrieve User Coordinates:
// - we access the geolocation API through the 'navigator.geolocation.getCurrentPosition()' method
// - this method takes two arguments
// - the first argument is the call-back function that is called when the method is successful
// - the second is the call-back function that is called when the method is unsuccessful

// Call-back used if Geolocation Successful, Load Map:
// - if successful, an object called "position" will be generated and passed to the call-back function in the first argument before being executed
// - this object contains a lot of data about the user's location
// - as we know, the 'this' keyword of a function points to the object which called it
// - we must explicitly bind the "this" keyword for this function call because it is actually being called by the Geolocation method, which is undefined
// - remember that the 'this' keyword of a call-back function is equal to the 'this' keyword of the higher-order function that is going to call it
// - in this case, the Geolocation method is treated as a global function call for some reason, so it's 'this' keyword is undefined
// - so we have to use the bind method and pass it "this" as an argument
// - remember that the bind method returns a new function, it doesn't call it
// - this is why we can use it with a call-back function
// - note that functions that use call-back functions as arguments require them to be passed as values, and not calls - they get called later

// Getting the coords from the 'position' objects properties:
// - the 'position' object contains a property called 'coords' which is an object containing a lot of data about the users location
// - among the 'coords' object data are the 'latitude' and 'longitude' properties
// - we can deconstruct this object and store the relevant properties in variables with the same names
// - we can store these properties into an array, which makes them easier to pass to the methods that require an array as an argument

// Created map object and stored results in the #map property:
// - we use the methods from the 'L' namespace in order to create a map
// - this namespace uses two methods to do this: '.map' and '.setView';

//    ->'.map':
//    --> can take an element's id as an argument
//    --> we pass it an element id that belongs to an empty element in which we plan on displaying the map
//    --> note that it only seems to work if that element's id is 'map'
//    --> will return an object containing the maps default values(how exactly, idk)

//    ->'.setView':
//    --> takes 2 arguments: an array of coordinates containing lat and long values, and a zoom level
//    --> will set the map to center on the coordinates we pass as an argument, and set the zoom level as specified
//    --> will return an object containing the maps new values

// - these methods chained generate a map and return an object with the map's data
// - we have a global variable called 'map' which we will use to store the object returned

// Creating and adding tile layer:

// Adding the leaflet event handler to the map object, Show Form:
// Assigning the global variable the value of the mapE:
// G. Render the form:
// H. Focus on the Distance input field after form renders:

// ~~~~ Call-back used if Geolocation Unsuccessful ~~~~
// J.

// 8. Listening for the "change" event on the drop down menu:
// - we want to add an event listener to the drop down menu, which is the 'select' element in our html
// - note that when a value in a drop down menu changes, an "change" event happens
// - we want certain elements to toggle their visibility when this change event fires

// 9. Selecting which Elements should toggle the 'hidden' class:
// - we know that we want to switch between the 'Elevation' input and the 'Cadence' input being visible, only one or the other should be visible
// - in order to do this, we need to toggle the hidden class on their parent element, aka the form row that contains them
// - their parents don't really have unique names so we we do this through DOM traversing
// - why their parents? Think of it this way, we don't just want to hide the input box, we want to hide the whole row of that input field on that form
// - this is so the field we want to show can slide into its place fully instead of being awkwardly placed under the rest of the fields
// - if we just hid the input fields, the row would still be there, taking up space and throwing off the design

// Calling the local storage API:
// - first argument is the key, second argument is a string value we want stored
// - however, we want to store the workouts array.. which is an array of objects
// - we can change any object into a string by using the 'JSON.stringify()' method
// - we pass the object we want to turn into a string as an argument
// - very simple API that is only advised to use with small amounts of data
// - this is because local storage is 'blocking', which is very bad
// - we will learn more about blocking in the future
// - we can go to the 'Application' tab in our browser console and look under 'Local Storage' to view what we've stored

// - the key we set can be used to retrieve the value we set in that key
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
