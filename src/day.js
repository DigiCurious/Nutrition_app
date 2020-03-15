import React from 'react';
import Meal from './meal'

class Recipe extends React.Component {
  render(){
    let mealsCategories = ["breakfast", "lunch", "dinner"];
    let meals = [];
    for(let i=0; i<3; i++){
      meals.push(
        <Meal
          key = {mealsCategories[i]}
          theme = {this.props.theme}
          mealplan = {this.props.mealplan}
          recipe = {this.props.recipe}
          id = {mealsCategories[i]}
          day = {this.props.id}
          onMealHover={(e)=>(this.props.onMealHover(e))}
          manipulateMealplan={(e)=>this.props.manipulateMealplan(e)}
        />
      )
    }
    //console.log(this.props.recipe)
    return (
        <div id={this.props.id} className="row">
          {meals}
        </div>
    )
  }
}

// ========================================

export default Recipe
