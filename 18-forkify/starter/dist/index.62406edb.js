const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
// const showRecipe = async function()
console.log('test'); // const showRecipe = async function () {
 //   try {
 //     const res = await fetch(
 //       'https://forkify-api.herokuapp.com/api/get?rId=47746'
 //     );
 //     const data = await res.json();
 //     if (!res.ok) throw new Error(`${data.error} (${res.status})`);
 //     // console.log(data.recipe.recipe_id);
 //     let { recipe } = data;
 //     recipe = {
 //       id: recipe.recipe_id,
 //       title: recipe.title,
 //       publisher: recipe.publisher,
 //       sourceUrl: recipe.source_url,
 //       image: recipe.image_url,
 //       servings: recipe.servings,
 //       cookingTime: recipe.cooking_time,
 //       ingredients: recipe.ingredients,
 //     };
 //     //
 //     // CONSOLE LOGS
 //     console.log(res, data, recipe, data);
 //     // Catch Errors
 //   } catch (err) {
 //     alert(err);
 //     console.error(err);
 //   }
 // };
 // showRecipe();

//# sourceMappingURL=index.62406edb.js.map