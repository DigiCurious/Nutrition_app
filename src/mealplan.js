import React from 'react';
import Day from './day'
import styled from 'styled-components'

class Mealplan extends React.Component {

  render(){

    const Input = styled.input`
    background-color: ${this.props.theme.colors.bg};
    color: ${this.props.theme.colors.fonts};
    border-color: ${this.props.theme.colors.lines};
    border-width: 0px 0px 1px 0px;
    border-radius: 0px;
    font-size: 11px;
    height: 20%;
    width:
    padding: 10px 0px 0px 10px;
    &:read-only{background-color: ${this.props.theme.colors.bg};
    }
    `

    let days = [];
    let numDays = this.props.mealplan.daysInMealPlan
    for(let i=0; i<numDays; i++){
      days.push(
        <Day
          theme = {this.props.theme}
          mealplan = {this.props.mealplan}
          recipe = {this.props.recipe}
          id = {i}
          onMealHover={(e)=>(this.props.onMealHover(e))}
          manipulateMealplan={(e) => this.props.manipulateMealplan(e)}
        />
      )
    }
    //console.log(this.props.recipe)
    return (
      <div className="mealplan col-12">
        <h2 onClick = {(mealplan)=>this.props.analyzeMealplan(this.props.mealplan)}>{this.props.mealplan.name}</h2>
        <Input value = {this.props.mealplan.daysInMealPlan} className="form-control" type="number" onChange={(event)=>(this.props.changeDaysInMealplan(event))}/>
        <div className="container">
          {days}
        </div>
      </div>
    )
  }
}

// ========================================

export default Mealplan
