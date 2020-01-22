import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.css';
import $ from 'jquery';
import AddNewRecipe from './addNewRecipe'
import Mealplan from './mealplan'
import Charts from './charts'
import Controller from './controller'

const ingredients = [];

function createData(id){
  const amount = Math.round(Math.random()*100);
  const ingredient = {
    name: "ingredient" + id,
    id: id,
    amount: amount,
    nutrients:{
        calcium: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'minerals'
                },
        magnesium: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'minerals'
                  },
        potassium: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'minerals'
                  },
        vitaminB12: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'vitamins'
                  },
        vitaminD: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'vitamins'
                  },
        vitaminC: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'vitamins'
                  },
        zinc: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'minerals'
                  },
        iron: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'minerals'
                  },
        dailyCal: {
                  amount: Math.round(Math.random())/4,
                  category: 'micro',
                  subCategory: 'minerals'
                  },
        protein: {
                  amount: Math.floor(Math.random()*33),
                  category:'macro'
        },
        fat: {
                  amount: Math.floor(Math.random()*33),
                  category:'macro'
        },
        carbs: {
                  amount: Math.floor(Math.random()*33),
                  category:'macro'
        },
    }
  }

  return ingredient;

}

for(var i=0; i<10; i++){
  ingredients.push(createData(i));
}

function calculateNutrients(ingredient, nutrients){
  Object.keys(ingredient.nutrients).map((nutrient)=>{
    if(!nutrients[nutrient]){
      nutrients[nutrient] = ingredient.amount * ingredient.nutrients[nutrient].amount;
      //console.log(micros[nutrient]);
    }else{
      nutrients[nutrient] += ingredient.amount * ingredient.nutrients[nutrient].amount;
      //console.log(micros[nutrient]);
    }
  })
}

function fillNutrients(ingredients){
  let nutrients = {};
  ingredients.map(ingredient=>{
      calculateNutrients(ingredient,nutrients);
    })
  return nutrients
}

class Infograph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nameBar: '',
      recipe: {
        name: 'Lasagne',
        ingredients: ingredients,
      },
      nutrients:fillNutrients(ingredients),
      hover: '',
      meal: null,
      mealplan: {
        meals:[],
        nutrients:{}
      },
      filterText: '',
      d3: ''
    }
  }

  setMicrosPerIngredient(name){
    //console.log(name);
    let newIngredients = this.state.recipe.ingredients.filter(ingredient=>(
      ingredient.name == name
    ))
    //console.log(newIngredients);
    let newNutrients = fillNutrients(newIngredients);
    //console.log(newNutrients);
    this.setState({
      recipe:{
        name: this.state.recipe.name,
        ingredients: this.state.recipe.ingredients,
        nutrients:newNutrients,
      },
      barGraphTitle: name,
    });
  }

  handleSubmit(event){

    event.preventDefault();
    let nameRecipe = this.state.nameBar;
    //console.log(nameRecipe)
    let newRecipe = [];
    for(var i =0; i<10; i++){
      newRecipe.push(createData(i));
    }
    let newMicros = fillNutrients(newRecipe);
    //console.log(newMicros)

    this.setState(
      {
        recipe:{
          name: nameRecipe,
          ingredients: newRecipe,
        },
        nutrients:newMicros,
        barGraphTitle: nameRecipe,
      }
    );
  }

  checkNutPerIngredient(nutrient){
      //console.log(nutrient);
      let theIng = this.state.recipe.ingredients[0];
      this.state.recipe.ingredients.map((ing, index) => {
        if(ing.amount > 0 && nutrient.length>2 && ing.amount * ing.nutrients[nutrient].amount > ing.amount * theIng.nutrients[nutrient].amount){
          //console.log("we are here");
          //console.log("ollaan täällä")
          theIng = ing;
          //console.log(theIng.id);
        }
      })

      let id = nutrient.length>2 ? theIng.id : null
      if(id !== null){
        let idStr = id.toString();
        var el = $('#'+ idStr ).find('.slider');
        //console.log(el);
        el.addClass("highlight")
      }

      //return theIng.id;
  }

  highlightIngredient(event,nutrient){
  //  console.log();
    $('.bargraphs').find('p').removeClass("highlight-text");
    $(event.target).addClass("highlight-text")
    this.setState({
      hover: nutrient
    })
    if(this.state.hover.length > 0){
        this.checkNutPerIngredient(nutrient);
    }
  }

  setNewIds(array){
    array.map((el,index) => el.id = index)
  }

  removeHighlights(){
    $('.slidecontainer').find('.slider').removeClass("highlight")
    $('.highlight').removeClass("highlight");
    $('.highlight-text').removeClass("highlight-text");
    this.setState({
      hover: '',
    })
  }

  handleChange(e){
    const newIngredients = this.state.recipe.ingredients.slice();
    newIngredients[e.target.getAttribute("data-index")].amount = Number(e.target.value);
    const newNutrients = fillNutrients(newIngredients);

    //console.log(newIngredients[e.target.getAttribute("data-index")].amount * newIngredients[e.target.getAttribute("data-index")].nutrients["calcium"].amount)
    this.setState(
      {
        recipe:{
          name: this.state.recipe.name,
          ingredients: newIngredients,
        },
        nutrients: newNutrients,
      }
    );
  }

  hideCategory(e){
      $(".nutrientTab").removeClass("active");
      $(e.target).addClass("active");
      //console.log(e.target);
      //console.log(e.target.innerText);
      $(".nutrients").addClass("hide");
      $("#" + e.target.innerText).removeClass("hide");
    }

  minimize(e){
//    console.log("HERE")
    $(e.target).prev().toggleClass("hide")
    this.setState({
      mealplan: this.state.mealplan
    });
  }

  handleDelete(id){
      //console.log("REMOVE")
      //console.log(id)
      let newIngredients = [... this.state.recipe.ingredients];
      let filtIngs = newIngredients.filter(function(ing){
        return(ing.id != id);
      });
      const newNutrients = fillNutrients(filtIngs);
      //console.log(filtIngs);
      this.setNewIds(this.state.recipe.ingredients);
      this.setState({
        recipe:{
          name: this.state.recipe.name,
          ingredients: filtIngs,
        },
        nutrients: newNutrients
      });
  }

  deleteMeal(event,array){
     console.log("REMOVE")

     let newMealplan = []
     if(array.length>1){
       newMealplan = [... array];
     }else{
       newMealplan.push(array[0])
     }
     console.log(event.target.id);
     let parentId = $(event.target).parent()[0].id;
     console.log(parentId)
     console.log($('#'+ parentId).find($('#' + event.target.id))[0]);
     //console.log(id);
     //console.log(newMealplan[0].time)

     let filtPlan = [];
     newMealplan.map((meal,i) => {
       if(!((meal.time === event.target.id) && (meal.day === parentId))){
         filtPlan.push(meal);
       }})
     let newNutrients = this.mealPlanIngredients(filtPlan);
     this.setState({
         mealplan: {
           meals: filtPlan,
           nutrients: newNutrients,
         }
     });
     let parent = document.getElementById(parentId)
     let el = parent.querySelector("#"+ event.target.id);
     console.log(el);
     $(el).removeClass("meal-is-in");
     //el.text("POISTETTU");
 }

  deleteRow(event,array){
      console.log("REMOVE")
      console.log(array);
      console.log($(event.target).parent().parent());
      let newMealplan = []
      if(array.length>1){
        newMealplan = [... array];
      }else{
        newMealplan.push(array[0])
      }
      let parentId = $(event.target).parent().parent()[0].id;
      console.log(parentId)
      //console.log(id);
      //console.log(newMealplan[0].time)

      let filtPlan = [];
      newMealplan.map((meal,i) => {
        if(meal.day !== parentId){
          filtPlan.push(meal);
        }})
      let newNutrients = this.mealPlanIngredients(filtPlan);
      this.setState({
          mealplan: {
            meals: filtPlan,
            nutrients: newNutrients,
          }
      });
  }

  addIngredient(){
    const newIngs = [...this.state.recipe.ingredients];
    //console.log("NEW INGS IS " + newIngs);
    newIngs.push(createData(this.state.recipe.ingredients.length));
    let newNutrients = fillNutrients(newIngs);
    this.setState({
      recipe:{
        name: this.state.recipe.name,
        ingredients: newIngs,
      },
      nutrients: newNutrients,
      hover:'',
    });
  }

  onDragRecipe(event, meal){
    //console.log("onDragRecipe")
    let newMeal = {
      recipe:{
        name: this.state.recipe.name,
        ingredients: this.state.recipe.ingredients,
        nutrients: this.state.nutrients,
      },
      barGraphTitle: this.state.barGraphTitle,
      day: '',
      time: '',
    }
    //console.log(newMeal)
    event.preventDefault();
    this.setState({
        meal: newMeal,
    });
    //console.log(this.state.meal)
  }

  onDragMeal(event){
    //console.log("onDragMeal")
    let id = event.target.id;

    $("#" + id).keydown(e=>{
      if(e.keyCode == 91){
        $("#" + id).removeClass("meal-is-in");
        console.log("POHJASSA")
      }
    })

    //$(event.target).removeClass("meal-is-in")

    //console.log(this.state.mealplan);
    //console.log(id);
    let newMealPlan = [... this.state.mealplan.meals];
    let filteredMeal = newMealPlan.filter(meal => meal.time == id);
    //console.log(filteredMeal[0])
    event.preventDefault();
    this.setState({
      meal: filteredMeal[0],
    });
    //console.log(this.state.meal)
  }

  onDragOver(event,className){
        $(".highlight").removeClass("highlight")
        event.preventDefault();
        $(event.target).addClass("highlight");
    }

  onDropMeal(e,meal){
  //  console.log(meal)
    $(".highlight").removeClass("highlight")
    if(!($(e.target).hasClass("meal-is-in"))){
      console.log(e.target.id);
      $(e.target).addClass("meal-is-in");
      let newMeal = {... meal};
      newMeal.day = e.target.parentElement.id;
      newMeal.time = e.target.id;
      //console.log(meal);
      //console.log("we are at onDrop");
      let updatedPlan = [... this.state.mealplan.meals];
      //console.log(updatedPlan);
      updatedPlan.push(newMeal);
    //  console.log(updatedPlan);
      this.setState({
        mealplan: {
          meals:updatedPlan,
          nutrients: this.state.mealplan.nutrients
        }
      })
    }
  }

  onDropRecipe(e,meal){
    //console.log(meal);
    this.removeHighlights();
      this.setState({
        recipe:{
          name: meal.recipe.name,
          ingredients: meal.recipe.ingredients,
        },
        nutrients: meal.recipe.nutrients,
        barGraphTitle: meal.recipe.name,
      })
  }

  filterCategories(object,category){
//    console.log(object,category)
    let arrayForD3 = []
    let nutrients = Object.keys(object);
    //console.log(nutrients);
    //console.log(this.state.recipe.ingredients[0].nutrients[nutrients[0]].category);
    nutrients.map(nutrient=>{
      if(this.state.recipe.ingredients[0].nutrients[nutrient].category === category){
        //console.log("täällä")
        let nutrientObj = {};
        nutrientObj['name'] = nutrient;
        nutrientObj['amount'] = object[nutrient];
        arrayForD3.push(nutrientObj);
      }
    })
    //console.log(arrayForD3);
    return arrayForD3
  }

  mealPlanIngredients(mealplan){
    console.log(mealplan);
    //console.log(this.state)
    let nutrients = Object.keys(this.state.nutrients)
    let newNutrients = {... this.state.nutrients}

    function fillNewNut(meal){
      let tempNutrients = {
            calcium: 0,
            magnesium: 0,
            potassium: 0,
            vitaminB12: 0,
            vitaminD: 0,
            vitaminC: 0,
            zinc: 0,
            iron: 0,
            dailyCal: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            }
      nutrients.map(nutrient=>{
          //console.log(meal);
          tempNutrients[nutrient] += meal.recipe.nutrients[nutrient]
      })
      return tempNutrients
    }
    //console.log(this.state.mealplan);
    //console.log(this.state.mealplan.meals);
    this.state.mealplan.meals.map(
      (meal,i)=>{
        console.log("we are here");
        console.log(meal);
        let tempNut = fillNewNut(meal);
        nutrients.map(nutrient=>{
          if(i==0){
            newNutrients[nutrient] = tempNut[nutrient]
          }else{
            newNutrients[nutrient] += tempNut[nutrient]
          }
        })
        console.log(newNutrients);
      }
    )

    this.setState({
      nutrients: newNutrients,
      mealplan:{
        meals: this.state.mealplan.meals,
        nutrients: newNutrients
      }
      }
    )
  }



  render(){
    console.log(this.state.mealplan);
    this.setNewIds(this.state.recipe.ingredients);
    this.checkNutPerIngredient(this.state.hover);
    const meals = ["breakfast", "lunch", "dinner"]
    return(
      <div>
      <div className="row">
          <AddNewRecipe
            onSubmit = {(event => this.handleSubmit(event))}
            onChange={(event)=>(this.setState({nameBar:event.target.value}))}
          />
      </div>
      <div className="row">
            <div className="col ingredients ui-box"
                  id = "recipe"
                  onDrop = {(e,meal) => this.onDropRecipe(e, this.state.meal)}
                  onDragOver={((event, className) => this.onDragOver(event, "ingredients"))}
            >
                  <h2 onClick={()=>{
                        let newMicros = fillNutrients(this.state.recipe.ingredients);
                        return this.setState({
                            recipe:{
                                ingredients: this.state.recipe.ingredients,
                                name: this.state.recipe.name
                              },
                              nutrients: newMicros,
                          })
                      }}>{this.state.recipe.name}
                  </h2>
                  <div>
                    {this.state.recipe.ingredients.map((ing,index) => {
                      return(
                      <Controller
                        name = {ing.name}
                        hover = {this.state.hover}
                        ing = {ing}
                        key={index}
                        id={index}
                        setMicros={(name) => {this.setMicrosPerIngredient(name)}}
                        amount = {ing.amount}
                        onChange = {(e) => {this.handleChange(e)}}
                        remove = {(id) => this.handleDelete(id)}
                      />
                    )})}
                  </div>
                  <div className="row buttons">
                    <div className="col">
                      <button className = "btn btn-block btn-primary" onClick={()=> this.addIngredient()}>Add Ingredient</button>
                    </div>
                    <div className="col">
                      <button className = "btn btn-block btn-primary" draggable onDrag = {(e)=>this.onDragRecipe(e)}>Drag To Meal Plan</button>
                    </div>
                  </div>
            </div>
            <div className="minimize" onClick = {(e) => {this.minimize(e)}}>
              <p>M I N I M I Z E {"<"}</p>
            </div>

            <div className="col bargraphs ui-box">
                <Charts title={this.state.recipe.name}
                        nutrients = {this.state.nutrients}
                        filterData = {(nutrients,category) => this.filterCategories(nutrients, category)}
                        hideCategory = {(event)=> this.hideCategory(event)}
                />
            </div>
            <div className="minimize" onClick = {(e) => {this.minimize(e)}}>
              <p>M I N I M I Z E {"<"}</p>
            </div>

        </div>

        <div className="mealplan">
            <Mealplan
                onDrag={(event =>this.onDragMeal(event))}
                onDrop={(event,meal) => this.onDropMeal(event, this.state.meal)}
                onDragOver={(event) => this.onDragOver(event)}
                onClick={(event,array) => this.deleteMeal(event, this.state.mealplan.meals)}
                mealPlanIngredients = {(mealplan)=> this.mealPlanIngredients(this.state.mealplan)}
                mealplan = {this.state.mealplan}
                deleteRow = {(event,array) => this.deleteRow(event,array)}
            />
        </div>

    </div>

    )
  }

}

// ========================================

ReactDOM.render(
  <Infograph />,
  document.getElementById('root')
);
