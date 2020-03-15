import React from 'react';
import Ingredient from './ingredient';
import styled from 'styled-components'


class Recipe extends React.Component {

  render(){
    //console.log(this.removeInput);

    /*const Button = styled.button`
      background-color: ${this.props.theme.colors.accent};
      color: ${this.props.theme.colors.bg};
      height: 30px;
      margin: 5% 0% 5% 0%;
      width: 100%;
    `

    const Input = styled.input`
    background-color: ${this.props.addIngredient ? `${this.props.theme.colors.shapes}` : `${this.props.theme.colors.bg}`};
    color: ${this.props.addIngredient ? `${this.props.theme.colors.bg}` : `${this.props.theme.colors.fonts}`};
    border-color: ${this.props.theme.colors.lines};
    border-width: 0px 0px 1px 0px;
    border-radius: 0px;
    font-size: 12px;
    height: 120%;
    padding: 10px 0px 0px 10px;
    &:read-only{background-color: ${this.props.theme.colors.bg};
    }
    `
    const Resepti = styled.div`
    border: ${(props) => `1px solid ${this.props.theme.colors.lines}`};
    border-width: 0px 1px 0px 0px
    `*/
    const buttonStyle = {
      backgroundColor: this.props.theme.colors.accent,
      color: this.props.theme.colors.bg,
      border: "none",
      height: "35px",
      margin: "5% 0% 5% 0%",
      width: "100%"
    };

    let id = this.props.recipe.ingredients.length
    let newIngr = '';
    //console.log(this.props.ifAdd)
    if(this.props.ifAdd){
      newIngr =
        <Ingredient
          theme = {this.props.theme}
          id = "newIngr"
          handleNewIngredient = {(e,i) => this.handleNewIngredient(e,i)}
          onIngredientClick = {this.props.onIngredientClick}
          ingredient=''
          handleIngrChange={this.props.handleIngrChange}
          deleteIngredient = {(i) => this.props.deleteIngredient(i)}
          addIngredient = {(x,y,z) => this.props.addIngredient(x,y,z)}
          replaceIngredient = {this.props.replaceIngredient}
          ifAdd = {this.props.ifAdd}
          loading = {this.props.loading}
          toggleInput = {this.props.toggleInput}
          recipe = {this.props.recipe}
        />;
    }else{
      newIngr = '';
    }

    return (
      <div className="col-6">
        <div className="row">
          <div className="col">
            <h2 onClick={(event)=>{this.props.onRecipeClick(event)}}>{this.props.recipe.name}</h2>
          </div>
          <div className="col">
            <button style={buttonStyle} onClick={()=>this.props.openRecipeForm()}>Create new recipe</button>
          </div>
        </div>
        <h5>Number of Servings</h5>
        <div className="form-row">
          <div className="col-2">
            <input
              className="form-control"
              type="number"
              value={this.props.recipe.yield}
              onChange={(event)=>(this.props.changeYield(event))}
            />
          </div>
        </div>
        <h5>Ingredients</h5>

            {this.props.recipe.ingredients.map((ingredient,index) => {
              return(
                <Ingredient
                  theme = {this.props.theme}
                  id = {index}
                  handleNewIngredient = {(e) => this.handleNewIngredient(e)}
                  onIngredientClick = {this.props.onIngredientClick}
                  key = {"ingredient" + index}
                  ingredient={ingredient}
                  handleIngrChange={this.props.handleIngrChange}
                  deleteIngredient = {(i) => this.props.deleteIngredient(i)}
                  addIngredient = {this.props.addIngredient}
                  replaceIngredient = {this.props.replaceIngredient}
                  ifNewIngr = {this.props.ifAdd}
                  loading = {this.props.loading}
                  toggleInput = {this.props.toggleInput}
                  recipe = {this.props.recipe}
                  />
                )
              }
            )}
            <div>{newIngr}</div>
            <button style={buttonStyle} type="button" onClick={()=>this.props.toggleInput()}
            > Add Ingredient </button>
        </div>
    )
  }
}

// ========================================

export default Recipe
