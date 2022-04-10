import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// const recipeContainer = document.querySelector('.recipe');

/////////////////////////////////////////////////

// console.log('Live server test');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe:
    await model.loadRecipie(id);

    // 2) Rendering recipe:
    recipeView.render(model.state.recipe);

    // Catch Errors
  } catch (err) {
    // alert(err);
    console.error(`${err} 💩`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
