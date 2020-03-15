import React from 'react';
import styled from 'styled-components';

class Ingredient extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      addIngredient: false
    }
  }

  replaceIngredient(){
    this.setState({
      addIngredient: true
    })
  }

  handleFormData(){
    let inputs = document.getElementById("addForm").elements;
    //console.log(inputs);
    let newIngr = {
        quantity: inputs["quantity"].value,
        unit: inputs["unit"].value,
        produce: inputs["produce"].value
      }
    return newIngr
  }

  shouldComponentUpdate(nextProps,nextState){
return true
  }

  handleNewIngredient(e, index){
    console.log(index, isNaN(index))

    let i;
    if(typeof index == 'number'){
      console.log("here")
      i = index
    }else{
      i = this.props.recipe.ingredients.length;
    }

    console.log(i)
    if(e.target.id !== "newIngr"){
      console.log("HERE")
      //this.props.deleteIngredient(e.target.id);
    }
    //this.props.removeInput();
    let ingr = this.handleFormData();
    console.log(ingr)
    this.props.addIngredient(e, ingr, i);
    if(this.state.addIngredients){
      this.setState({addIngredient: !this.state.addIngredient})
    }else{
      this.props.toggleInput();
    }
  }

  render(){
  //console.log(this.props);
    //console.log(this.props.id)
    let id = this.props.id;
    let ifAdd = this.props.ifAdd ? true : this.state.addIngredient;

    let backgroundColor = ifAdd ? this.props.theme.colors.shapes : this.props.theme.colors.bg
    let color = ifAdd ? this.props.theme.colors.bg : this.props.theme.colors.shapes

    const inputStyle = {
      backgroundColor: backgroundColor,
      color: this.props.theme.colors.fonts,
      borderColor: this.props.theme.colors.bg,
      borderWidth: "0px 0px 1px 0px",
      borderRadius: "0px",
      fontSize: "12px",
      height: "100%",
      padding: "2px 0px 0px 10px",
    };

    const buttonStyle = {
      backgroundColor: this.props.theme.colors.accent,
      color: this.props.theme.colors.bg,
      border: "none",
      height: "90%",
      margin: "5% 0% 5% 0%",
      width: "100%"
    };

    /*const Input = styled.input`

    }
    `

    const Button = styled.button`
      background-color: ${this.props.theme.colors.accent};
      color: ${this.props.theme.colors.bg};
      height: 90%;
      margin: 5% 0% 5% 0%;
      width: 100%;
      border: none;
      `
      */



    let replaceButton;
    if(ifAdd){
      replaceButton = <button style={buttonStyle} type="button" onClick={()=>{
        if(this.state.addIngredient){
          this.setState({addIngredient: !this.state.addIngredient});
        }else{
          this.props.toggleInput();
        }

      }}
      >cancel</button>
    }else{
      replaceButton = <button style={buttonStyle} type="button" onClick={()=>this.replaceIngredient()}
      > % </button>
    }

    let addDeleteButton;
    //console.log(this.props.ifNewIngr);
    if(this.props.ifNewIngr){
        addDeleteButton=
        <button
                style={buttonStyle}
                id="newIngr"
                className=""
                type="button"
                onClick={(event,index) => this.handleNewIngredient(event,this.props.id)}
        >
        +
        </button>
    }else if(ifAdd){
      addDeleteButton=
      <button id = {this.props.id}
              style={buttonStyle}
              className=""
              type="button"
              onClick={(event,index) => this.handleNewIngredient(event,this.props.id)}
      >
      +
      </button>
    }
    else if(!ifAdd && !this.props.ifNewIngr){
        addDeleteButton=
        <button id={this.props.id}
                style={buttonStyle}
                className=""
                type="button"
                onClick={(i) => this.props.deleteIngredient(id)}
        >
        -
        </button>
    }

    let inputProduce;
    if(!this.props.loading){
      inputProduce = <input
        style={inputStyle}
        id = {this.props.id}
        name="produce"
        className="form-control"
        type="text"
        value={!ifAdd ? this.props.ingredient.name : null}
        readOnly = {!ifAdd ? true : false}
        onClick={!ifAdd ? (event)=>this.props.onIngredientClick(event) : null}
        />
    }else{
      inputProduce =
      <input
        style={inputStyle}
        id = {this.props.id}
        name="produce"
        className="form-control"
        type="text"
        value="LOADING"
        readOnly = {!ifAdd ? true : false}
        onClick={!ifAdd ? (event)=>this.props.onIngredientClick(event) : null}
        />
    }


//console.log(ifAdd);

    return (

        <div>
          <form key = {this.props.id} id = {ifAdd ? "addForm" : "form"}>
            <div className="form-row">
              <div className="col-2">
                <input
                  style={inputStyle}
                  className="form-control"
                  type="number"
                  name="quantity"
                  value={!ifAdd ? this.props.ingredient.quantity : null}
                  onChange={!ifAdd ? (event,i)=>this.props.handleIngrChange(event,id) : null}
                />
              </div>
              <div className="col-2">
                <input
                  style={inputStyle}
                  className="form-control"
                  name="unit"
                  type="text"
                  value={!ifAdd ? this.props.ingredient.unit : null}
                  readOnly = {!ifAdd ? true : false}
                />
              </div>
              <div className="col-4">
                {inputProduce}
              </div>
              <div className="col-2">
                {addDeleteButton}
              </div>
              <div className="col-2">
                {replaceButton}
              </div>
            </div>
          </form>
        </div>
            )
  }
}

// ========================================

export default Ingredient
