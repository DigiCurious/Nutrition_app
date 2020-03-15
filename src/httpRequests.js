createCORSRequest(method, url) {
  console.log("in CORS")
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XMLHttpRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = XMLHttpRequest()

    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

loadRecipe() {
  console.log(this);
  let app_id = "e30e009f"
  let app_key = "9f05b5053b366231a8afb715fd162640"
  let recipe = {
                "title": "Fresh Ham Roasted With Rye Bread and Dried Fruit Stuffing",
                "yield": "15",
                "ingr": [
                  "18 pounds fresh ham",
                  "7 cloves garlic",
                  "1 tablespoon caraway seeds",
                  "4 teaspoons salt",
                  "Freshly ground pepper to taste",
                  "1 teaspoon olive oil",
                  "1 medium onion",
                  "3 cups sourdough rye bread",
                  "1 1/4 cups coarsely chopped pitted prunes",
                  "1 1/4 cups coarsely chopped dried apricots",
                  "1 large tart apple",
                  "2 teaspoons chopped fresh rosemary",
                  "1 egg",
                  "1 cup chicken broth"
                ]
              }

  var url = 'https://api.edamam.com/api/nutrition-details?app_id=' + app_id + '&app_key=' + app_key;

  var xhr = this.createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onreadystatechange = function() {
    console.log("in readyState");
    var text = xhr.responseText;
    ingredients = JSON.parse(text).ingredients;
    console.log(JSON.parse(text).ingredients);
    this.setState({
      recipe:{
        ingredients:ingredients,
        name: JSON.parse(text).text
      },
      nutrients:[]
    });
  }.bind(this);

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(recipe));
}

/*  loadIngredient(ingredient,id) {
  console.log(this);
  let app_id = "e30e009f"
  let app_key = "9f05b5053b366231a8afb715fd162640"
  let ingr = ingredient
  var url = 'https://api.edamam.com/api/nutrition-data?app_id=' + app_id + '&app_key=' + app_key + '&ingr=' + ingredient

  var xhr = this.createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  // Response handlers.
  xhr.onreadystatechange = function() {
    console.log(this);
    let text = xhr.responseText;
    let newIngredients = ingredients.slice();
    JSON.parse(text).ingredients.map(ingredient => {newIngredients[id] = ingredient});

    this.setState({
      recipe:{
        ingredients:newIngredients,
        name: JSON.parse(text).text
      },
      nutrients:fillNutrients(newIngredients)
    }, function(){console.log(this.state.recipe.ingredients)});

  }.bind(this);

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({'ingr':ingr}));
}
*/

export loadRecipe()
