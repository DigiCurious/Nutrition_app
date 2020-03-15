import React from 'react';
import Ingredient from './ingredient';
import styled from 'styled-components'


class NewRecipeForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      numberOfIngr: 1
    }
  }

  handleFormData(){
    let inputs = document.getElementById("newRecipe").elements;

    let name = inputs["name"].value;
    let servs = inputs["yield"].value;
    let ingr = inputs["recipe"].value;

    let ingredients = ingr.split(/\r?\n/);
    console.log(ingredients);
    console.log(name, servs, ingredients);
    this.props.loadRecipe(name,servs,ingredients);
  }

  render(){
  /*  const Button = styled.button`
      background-color: ${this.props.theme.colors.accent};
      color: ${this.props.theme.colors.bg};
      height: 30px;
      margin: 5% 0% 5% 0%;
      width: 100%;
    `

    const Input = styled.input`
    background-color: ${this.props.theme.colors.bg};
    color: ${this.props.theme.colors.fonts};
    border-color: ${this.props.theme.colors.lines};
    border-width: 0px 0px 1px 0px;
    border-radius: 0px;
    font-size: 12px;
    padding: 10px 0px 0px 10px;
    &:read-only{background-color: ${this.props.theme.colors.bg};
    }
    `

    const InputTextArea = styled.input`
    background-color: ${this.props.theme.colors.bg};
    color: ${this.props.theme.colors.fonts};
    border-color: ${this.props.theme.colors.lines};
    border-width: 0px 0px 1px 0px;
    border-radius: 0px;
    font-size: 12px;
    height: 300px;
    padding: 10px 0px 0px 10px;
    }
    `
    const Recipe = styled.div`
    border: ${(props) => `1px solid ${this.props.theme.colors.lines}`};
    border-width: 0px 1px 0px 0px
    `*/

    let button = (this.props.recipe !== '') ? <button onClick={()=>this.props.openRecipeForm()}>Edit {this.props.recipe.name}</button> : ''

    return (
      <div className="col-6">
        <div className="row">
          <div className="col">
            <h2>Submit new recipe</h2>
          </div>
          <div className="col">
            {button}
          </div>
        </div>
        <form id="newRecipe">
          <div className="form-row">
            <div className="form-group col-6">
              <label>Name of the recipe</label>
              <input className="form-control" type="text" name="name"/>
            </div>
            <div className="form-group col-6">
              <label>Number of servings</label>
              <input className="form-control" type="number" name="yield"/>
            </div>
          </div>
          <div className="form-group col-12">
            <label>Ingredients</label>
            <textarea className="form-control" name="recipe" cols="40" rows="20" value="800g canned chickpeas
3 onions, quartered
3 garlic cloves
5cm piece of ginger
2-3 green chillies, roughly chopped
1½ tbsp ghee
½ tsp ground coriander
½ tsp ground cumin
½ tsp chilli powder
1 tsp turmeric
1 tsp garam masala
1 ½ tsp amchoor powder
3 medium tomatoes
1 lemon, juiced
½ small pack coriander leaves"/>
          </div>
          <button type="button" onClick={()=>{this.handleFormData()}}
          > Submit Recipe </button>
        </form>
      </div>
    )
  }
}

// ========================================

export default NewRecipeForm
