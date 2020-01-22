import React from 'react';
import './index.css';
import './bootstrap.css';
import Row from './row';

class Mealplan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dayCounter: '1'
    }
  }

  setCounter(){
    console.log(this.state);
    let temp = this.state.dayCounter - 1;
    this.setState({
      dayCounter: temp
    })
  }

  render(){
    let days = [];
    let weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday","saturday","sunday"];
    const meals = ['breakfast','lunch','dinner']
    for(let i=0; i<this.state.dayCounter; i++){
      days.push(<Row key={i}
                           onDrag = {this.props.onDrag}
                           idForRow={weekdays[i]}
                           onDrop={this.props.onDrop}
                           onDragOver={this.props.onDragOver}
                           onClick={this.props.onClick}
                           onClickMinus={this.props.deleteRow}
                           setCounter = {this.setCounter.bind(this)}
                           mealplan = {this.props.mealplan}
                />)
    }

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
        <div className="row">
        <div className="col-11">
        <table className="table">
            <thead>
              <tr>
                {meals.map(meal => (
                  <th scope="col-4">{meal}</th>
                ))}
              </tr>
            </thead>
            <tbody>
                {days}
            </tbody>
        </table>
        </div>
        <div className="col-1">
            <input value={this.state.dayCounter} onChange={e=>this.setState({dayCounter:e.target.value})} className="form-control" type="number" name="quantity" min="1" max="7"/>
        </div>
        </div>
      </div>
    )
  }
}

export default Mealplan
