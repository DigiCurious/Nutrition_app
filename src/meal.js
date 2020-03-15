import React from 'react';
import styled from 'styled-components'

class Meal extends React.Component {
  constructor(){
    super();
    this.state = {
      active:false,
      hover: false
    }
  }

  onMouseEnter(e){
    this.setState({hover: !this.state.hover});
    let meal = this.props.mealplan.plan[e.target.parentNode.id][e.target.id];
    if(meal === ''){
      let textnode = document.createTextNode("Add " + this.props.recipe.name);
      e.target.appendChild(textnode);
    }else{
      let textnode = document.createTextNode("Remove " + meal.name);
      e.target.appendChild(textnode);
    }
  }

  onMouseLeave(e){
    this.setState({hover: !this.state.hover});
    e.target.textContent = null
  }



  render(){

    let backgroundColor = (this.props.mealplan.plan[this.props.day][this.props.id] !== '') ? this.props.theme.colors.accent : this.props.theme.colors.bg;
    let divStyle;

    if(!this.state.hover){
      divStyle = {
        backgroundColor: backgroundColor,
        color: this.props.theme.colors.bg,
        border: "1px solid " + this.props.theme.colors.lines,
        fontSize: "12px",
        height: "40px",
        width:"33,3%",
        paddingTop: ".5%",
        paddingLeft: "12%",
        margin: "0",
        textAlign: "center"
      };
    }else{
      divStyle = {
        backgroundColor: this.props.theme.colors.accent,
        color: this.props.theme.colors.bg,
        border: "1px solid " + this.props.theme.colors.lines,
        fontSize: "12px",
        height: "40px",
        width:"33,3%",
        paddingTop: ".5%",
        paddingLeft: "12%",
        margin: "0",
        textAlign: "center"
    }
  };


    //console.log(this.props.recipe)
    return (
      <div
        style = {divStyle}
        id = {this.props.id}
        className="col-4 meal"
        onMouseEnter = {event => this.onMouseEnter(event)}
        onMouseLeave = {event => this.onMouseLeave(event)}
        onClick={(event) => {
            this.props.manipulateMealplan(event);
          }}
      >
      </div>
    )
  }
}

// ========================================

export default Meal
