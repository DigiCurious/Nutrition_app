import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import './app.css';
import Recipe from './recipe'
import Charts from './graphs'
import Mealplan from './mealplan'
import NewRecipeForm from './newRecipeForm'
import styled from 'styled-components'


class Infograph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recipe: {
        yield: '',
        name: '',
        ingredients: [],
      },
      mealplan: {
        plan:[{"breakfast": '', "lunch":'', "dinner":''}],
        name: "Oskari's mealplan",
        daysInMealPlan: 1
      },
      graphTitle: '',
      nutrientsForGraphs: [],
      hoverText: '',
      UiRecipe: true,
      addIngredient: false,
      httpLoadingRecipe: true,
      httpLoadingIngr: false,
    }
    //this.loadRecipe = this.loadRecipe.bind(this);
    this.loadIngredient = this.loadIngredient.bind(this);
    //this.loadRecipe();
  }

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

  mapIngredients(title,ingredients,d,index) {
    console.log("MAP INGREDIENTS " + index);
    let newIngredients = ingredients.length>1 ? [] : this.state.recipe.ingredients.slice();


    //console.log(newIngredients);

    ingredients.map(ingredient => {
      let ingr = {
        name:'',
        quantity:'',
        unit:'',
        gramsInUnit: '',
        weightInGrams: '',
        nutrients:[]
      };
      // MAP THE NUTRIENTS
      console.log(ingredient);
      let gInUnit = ingredient.parsed[0].weight/ingredient.parsed[0].quantity;
      let newNutrients = [];
      let data = d;
      let nutr = Object.keys(data.totalNutrients);
      nutr.map(nut => {
        //console.log(data)
        //console.log(nut)
        let nutObject = {name: '', quantity: '', unit:'', quantPerUnit: '', dailyTotalPerGram: ''}
        let nutrient = ingredient.parsed[0].nutrients[nut];
        let qPerGram;
        if(nutrient !== undefined){
          // calculate quantity per unit
          qPerGram = nutrient.quantity/ingredient.parsed[0].weight;
          //console.log(nut + 'per  gram = ' + qPerGram)
          let dTotalPerUnit;
          // calculate daily total per gram
          if(data.totalNutrients[nut] && data.totalDaily[nut] !== undefined){
            dTotalPerUnit = data.totalDaily[nut].quantity/data.totalNutrients[nut].quantity
            //console.log(dTotalPerUnit)
          }



          //create nutrient object
          nutObject = {
                        name: nutrient.label,
                        unit: nutrient.unit,
                        quantPerIngrGram: qPerGram,
                        dailyPercentagePerUnit: dTotalPerUnit,
                      }

          newNutrients.push(nutObject);
        }
      })
      let weight = gInUnit * ingredient.parsed[0].quantity;
      // CREATE THE SINGLE INGREDIENT OBJECT
      ingr = {
        name: ingredient.parsed[0].food,
        quantity: ingredient.parsed[0].quantity,
        unit: ingredient.parsed[0].measure,
        gramsInUnit: gInUnit,
        weightInGrams: weight,
        nutrients: newNutrients
      }
      console.log(index)
      if(index !== undefined){
        newIngredients.splice(index, 0, ingr)
      }else{
        newIngredients.push(ingr);
      }
    });
    //nutrients for the graphs
    //console.log(d.yield)
    let servings = d.yield !== undefined ? d.yield : this.state.recipe.yield;
    let nutrientArray = this.calculateNutrientsForGraphs(servings, newIngredients);

    // SET STATE

    this.setState({
      recipe:{
        yield: servings,
        name: title,
        ingredients:newIngredients,
      },
      graphTitle: title,
      nutrientsForGraphs: nutrientArray
    });

    return newIngredients;
  }

  toggleInput(){
    this.setState({
      addIngredient: !this.state.addIngredient
    })
  }

  loadRecipe(title,servs,ingr) {
    console.log("IN LOAD RECIPE" + title + servs + ingr);
    let app_id = "e30e009f"
    let app_key = "9f05b5053b366231a8afb715fd162640"
    let recipe = {
                  "title": title,
                  "yield": servs,
                  "ingr": ingr
                }

    var url = 'https://api.edamam.com/api/nutrition-details?app_id=' + app_id + '&app_key=' + app_key;

    var xhr = this.createCORSRequest('POST', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
    this.setState({httpLoadingRecipe: !this.state.httpLoadingRecipe});
    // Response handlers.
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState);
      if (xhr.readyState === 4){
        console.log("in readyState");
        var text = xhr.responseText;
        let data = JSON.parse(text);
        console.log(data);
        //console.log(JSON.parse(text).ingredients);
        let ingredients = JSON.parse(text).ingredients;

        //MAP INGREDIENTS
        this.mapIngredients(title,ingredients, data);
        this.setState({httpLoadingRecipe: !this.state.httpLoadingRecipe});
      }
    }

    xhr.onerror = () => {
      alert('Woops, there was an error making the request.');
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(recipe));
  }

  loadIngredient(ingredient,index) {
    console.log("LOADINGREDIENT" + index);
    let app_id = "e30e009f"
    let app_key = "9f05b5053b366231a8afb715fd162640"
    let ingr = ingredient
    var url = 'https://api.edamam.com/api/nutrition-data?app_id=' + app_id + '&app_key=' + app_key + '&ingr=' + ingredient

    var xhr = this.createCORSRequest('GET', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }

    this.setState({httpLoadingIngr: !this.state.httpLoadingIngr});
    // Response handlers.

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4){
        this.deleteIngredient(index);
        console.log("here")
        let text = xhr.responseText;
        let newIngredients = this.state.recipe.ingredients.slice();
        let data = JSON.parse(text);

        console.log(data);
        let title = this.state.recipe.name
        this.mapIngredients(title, data.ingredients, data, index);
        this.setState({httpLoadingIngr: !this.state.httpLoadingIngr});
        //this.toggleInput();
      }
    }.bind(this);

    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({'ingr':ingr}));
  }


  calculateNutrientsForGraphs(servs, ingredients){
    //console.log(ingredients[0].quantity)
    //console.log(ingredients[0].weightInGrams);
    //Calculate nutrients of all the ingredients for the graphs
    let servings = servs;
    //console.log(servings);
    let nutrientsArray = [];

    ingredients.map(ingredient => {
      ingredient.nutrients.map(nutrient => {
        let totalNut = ingredient.weightInGrams * (nutrient.quantPerIngrGram * nutrient.dailyPercentagePerUnit);
        //add totalNut to the array element
        let isNewNutrient = true;
        nutrientsArray.map(obj => {
            if(nutrientsArray.length>0 && obj.name === nutrient.name){
              if(!totalNut){
                totalNut = 0;
              }
              //console.log(totalNut);
              obj.quantity += totalNut/servings;
              //console.log(obj)
              isNewNutrient = false;
            }
        })
        if(isNewNutrient){
            nutrientsArray.push({name:nutrient.name, quantity: totalNut/servings})
        }

      })
    })
      //console.log(nutrientsArray);
      return nutrientsArray;
  }

  handleIngrChange(e,index){
      //console.log(e.target.value);
      console.log(index);
      if(e.target.type == 'number'){
        let newIngredients = this.state.recipe.ingredients.slice();
        console.log(newIngredients);

        newIngredients[index].quantity = Number(e.target.value)
        newIngredients[index].weightInGrams = Number(e.target.value) * newIngredients[index].gramsInUnit;
        let servings = this.state.recipe.yield;
        let nutrientArray = this.calculateNutrientsForGraphs(servings, newIngredients);
        this.setState({
          recipe:{
            yield: this.state.recipe.yield,
            name: this.state.recipe.name,
            ingredients: newIngredients
          },
          nutrientsForGraphs: nutrientArray
        })
        //console.log(newIngredients);

      }
    }

  replaceIngredient(e,i){
    this.deleteIngredient(i);
  }

  addIngredient(e, ingr, index){
    e.preventDefault();

    let newIngr = ingr.quantity + ' ' + ingr.unit + ' ' + ingr.produce
    this.loadIngredient(newIngr, index)
  }

  deleteIngredient(i){
    //console.log("delete")
    //console.log(i);
    let newIngredients = this.state.recipe.ingredients.slice();
    newIngredients.splice(i,1)
    //console.log(newIngredients);
    let nutrientArray = this.calculateNutrientsForGraphs(this.state.recipe.yield, newIngredients)
    this.setState({
      recipe:{
        yield: this.state.recipe.yield,
        name: this.state.recipe.name,
        ingredients: newIngredients,
      },
      nutrientsForGraphs: nutrientArray
    })
  }

  changeYield(e){
    let nutrientsArray = this.calculateNutrientsForGraphs(e.target.value, this.state.recipe.ingredients);
    this.setState({
      recipe:{
          yield:e.target.value,
          name:this.state.recipe.name,
          ingredients:this.state.recipe.ingredients,
        },
        nutrientsForGraphs: nutrientsArray
        }
      )
  }

  changeDaysInMealplan(e){
    let plan = this.state.mealplan.plan;
    let newPlan = plan.slice()
    if(e.target.value > newPlan.length){
      newPlan.push({'breakfast':'', 'lunch': '', 'dinner': ''})
    }else{
      newPlan.pop();
    }
    this.setState({
      mealplan:{
            name:this.state.mealplan.name,
            plan:newPlan,
            daysInMealPlan: Number(e.target.value)
      }
    }
    )
  }

  manipulateMealplan(e){
    //alert("manipulate mealplan")
    //console.log(e.target);
    //e.target.classList.toggle("mealIn")
    let dayId = e.target.parentNode.id;
    let meal = e.target.id;
    let mealplan = this.state.mealplan.plan.slice();
    //console.log(mealplan[dayId][meal])

    if(mealplan[dayId][meal] == ''){
      mealplan[dayId][meal] = this.state.recipe

      this.setState({
        mealplan:{
          name: this.state.mealplan.name,
          plan: mealplan,
          daysInMealPlan: this.state.mealplan.daysInMealPlan
        }
      })
    }else{
      mealplan[dayId][meal] = '';
      this.setState({
        mealplan:{
          name: this.state.mealplan.name,
          plan: mealplan,
          daysInMealPlan: this.state.mealplan.daysInMealPlan
        }
      });
      }
    }

    analyzeMealplan(mealplan){
      //console.log(mealplan);
      console.log(mealplan.daysInMealPlan)
      let mealTimes = Object.keys(mealplan.plan[0]);
      let plan = mealplan.plan;
      let nutrientArrayMP = [];
      plan.map((day,index) => mealTimes.map((mealTime,i) => {
        //console.log(index, mealTime);
        if(day[mealTime] !== ''){
          let nutrientArray = this.calculateNutrientsForGraphs(day[mealTime].yield,day[mealTime].ingredients);
          if(nutrientArrayMP.length > 0){
            nutrientArrayMP.map((nutrient,index) => {
              //console.log(nutrient);
              //console.log(nutrientArray);
              nutrient.quantity += nutrientArray[index].quantity;
              nutrient.quantity = nutrient.quantity/mealplan.daysInMealPlan
            });
          }else{
            nutrientArrayMP = nutrientArray;
          }
        }
      }))

      this.setState({nutrientsForGraphs: nutrientArrayMP, graphTitle: mealplan.name});
    }

  onIngredientClick(e){
    //console.log(e.target.id);
    let servings = this.state.recipe.yield;
    let ingredients = [];
    ingredients.push(this.state.recipe.ingredients[e.target.id])
    console.log(ingredients);
    let nutrientArray = this.calculateNutrientsForGraphs(servings, ingredients)

    this.setState({
      graphTitle: this.state.recipe.ingredients[e.target.id].name + ' in ' + this.state.recipe.name,
      nutrientsForGraphs:nutrientArray
    })
  }

  onRecipeClick(e){
    console.log(e.target.id);
    let servings = this.state.recipe.yield;
    let ingredients = this.state.recipe.ingredients;
    let nutrientArray = this.calculateNutrientsForGraphs(servings, ingredients)

    this.setState({
      graphTitle: this.state.recipe.name,
      nutrientsForGraphs:nutrientArray
    })
  }

  openRecipeForm(){
    console.log(this.state.UiRecipe);
    this.setState({
      UiRecipe: !this.state.UiRecipe
    },console.log(this.state.UiRecipe))
  }

  render(){
    const theme = {
        colors: {
          bg: "#FFF6E8",
          lines: "#C9B79C",
          fonts: "#563635",
          shapes: "#BEE6CE",
          accent: "#647260"
        }
    }

    const Container = styled.div`
      box-shadow: ${props => `0px 10px 10px 0px ${theme.colors.lines}`};
      margin-bottom: 50px;
    `
    //console.log(this.state.recipe)
    console.log(this.state.mealplan)
    let uiElement;
    if(this.state.UiRecipe && this.state.httpLoadingRecipe){
      //console.log("UiRecipe is true");
      uiElement = <Recipe
        theme = {theme}
        onRecipeClick = {(e)=>(this.onRecipeClick(e))}
        onIngredientClick = {(e)=>(this.onIngredientClick(e))}
        recipe = {this.state.recipe}
        handleIngrChange = {(e,d) => this.handleIngrChange(e,d)}
        deleteIngredient = {(i) => this.deleteIngredient(i)}
        addIngredient = {(e,ingr,i) => this.addIngredient(e,ingr,i)}
        replaceIngredient = {(e,i) => this.replaceIngredient(e,i)}
        changeYield= {(e)=>this.changeYield(e)}
        openRecipeForm={()=>this.openRecipeForm()}
        toggleInput = {()=>this.toggleInput()}
        ifAdd = {this.state.addIngredient}
        loading = {this.state.httpLoadingIngr}
      />
    }else if(this.state.UiRecipe && !this.state.httpLoadingRecipe){
      uiElement = <div className="col-6"><p>LOADING</p></div>
    }
    else if(!this.state.UiRecipe){
      console.log("UiRecipe is false");
      uiElement = <NewRecipeForm openRecipeForm={()=>this.openRecipeForm()} recipe={this.state.recipe} loadRecipe = {(name,servs,ingr) => this.loadRecipe(name,servs,ingr)} theme = {theme}/>
    }

    return (
      <div className="app">
        <div className="row">
          {uiElement}
          <Charts
            theme = {theme}
            title = {this.state.graphTitle}
            data = {this.state.nutrientsForGraphs}
          />
        </div>
        <div className="row">
          <Mealplan
            analyzeMealplan = {(mealplan) => this.analyzeMealplan(mealplan)}
            theme = {theme}
            recipe = {this.state.recipe}
            mealplan={this.state.mealplan}
            changeDaysInMealplan = {(e)=>this.changeDaysInMealplan(e)}
            manipulateMealplan = {(e) => this.manipulateMealplan(e)}
            onMealHover = {(e)=>this.onMealHover(e)}
            calculateNutrients = {(x,y)=>this.calculateNutrientsForGraphs(x,y)}
          />
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Infograph />, document.getElementById('root'));
