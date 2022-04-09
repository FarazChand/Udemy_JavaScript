const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// const showRecipe = async function()

const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/get?rId=36453'
      // 'https://forkify-api.herokuapp.com/api/get?rId=47746'
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.error} (${res.status})`);

    // console.log(data.recipe.recipe_id);

    let { recipe } = data;
    recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings || 'no info',
      cookingTime: recipe.cooking_time || 'no info',
      ingredients: recipe.ingredients,
    };

    //

    // CONSOLE LOGS
    console.log(res);
    console.log(data);
    console.log(recipe);

    // Catch Errors
  } catch (err) {
    alert(err);
    console.error(err);
  }
};

showRecipe();
