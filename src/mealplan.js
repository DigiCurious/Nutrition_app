import React from 'react';
import './index.css';
import './bootstrap.css';

class Mealplan extends React.Component {

  render(){
    console.log(this.props.meals);
    const meals = ['breakfast','lunch','dinner']
    return(
      <div>
        <div className="row">
        <div className="col-2">
          <h2>Meal Plan</h2>
        </div>
        <div className="col">
          <button className="btn btn-primary"
                  onClick={this.props.mealPlanIngredients}
          >
            Click to see the nutrients
          </button>
        </div>
        </div>
        <table className="table">
            <thead>
              <tr>
                {meals.map(meal => (
                  <th scope="col-4">{meal}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr id="monday">
                  {meals.map((meal,i) => {
                    let label = ''
                    console.log(meal)
                    console.log(this.props.meals[i]);
                    this.props.meals.map(m => {
                      if(m.time === meal && this.props.meals.length > 0){
                        label = m.recipe.name;
                      }
                    })
                    console.log(label)
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
              </tr>
            </tbody>
        </table>
      </div>
    )
  }
}

export default Mealplan
