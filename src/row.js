import React from 'react';
import './index.css';
import './bootstrap.css';

class Row extends React.Component {

  render(){
    //console.log(this.props.meals);
    const meals = ['breakfast','lunch','dinner']
    return(
                <tr id={this.props.idForRow}>
                    {meals.map((meal,i) => {
                      let label = ''
                      //console.log(meal)
                      //console.log(this.props.meals[i]);
                      this.props.mealplan.meals.map(m => {
                        if(m.time === meal && this.props.mealplan.meals.length > 0){
                          label = m.recipe.name;
                        }
                      })
                      //console.log(label)
                      return(
                      <td id={meal}
                            draggable
                            onDrag={this.props.onDrag}
                            className="meal"
                            onDrop={this.props.onDrop}
                            onDragOver={this.props.onDragOver}
                            onClick={this.props.onClick}
                      >
                      {label}
                      </td>
                    )})
                  }
                  <td><button className="btn btn-block btn-primary"
                              onClick = {
                                (event,array) => {this.props.onClickMinus(event,this.props.mealplan.meals)
                                this.props.setCounter();
                                }
                              }
                      > - </button></td>
                </tr>
    )
  }
}

export default Row
