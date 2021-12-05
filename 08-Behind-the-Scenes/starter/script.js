'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      let firstName = `Steven`;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      // console.log(add(2, 3));
      output = `NEW OUTPUT`;
    }

    // console.log(add(2, 3)); // reference error in strict mode
    // console.log(str); // reference error
    console.log(millenial);
    console.log(output);
  }
  // console.log(millenial); // reference error

  printAge();
  return age;
}

let firstName = 'Jonas';
calcAge(1991);
console.log(firstName);
// console.log(age);  // reference error
// printAge(); // reference error
