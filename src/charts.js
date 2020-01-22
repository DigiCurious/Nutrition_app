import React from 'react';
import './index.css';
import './bootstrap.css';
import Bargraph from './bargraph'
import Piegraph from './piegraph'

class Charts extends React.Component {

  render(){
    console.log(this.props.nutrients);
    //console.log(this.props.nutrients)
    const meals = ['breakfast','lunch','dinner']
    return(
      <div>
        <div className="row">
          <div className="col">
            <h2>Nutrients of {this.props.title}</h2>
          </div>
        </div>
        <nav>
            <ul className="nav nav-tabs">
              <li className="active nav-item" onClick={event => this.props.hideCategory(event)}>
                Micros
              </li>
              <li className="nav-item" onClick={event => this.props.hideCategory(event)}>
                Macros
              </li>
            </ul>
        </nav>
        <div id="Macros" className="nutrients hide">
            <Piegraph
              dataSet = {this.props.filterData(this.props.nutrients, "macro")}
            />
        </div>
        <div id="Micros" className="nutrients">
            <Bargraph
              dataSet = {this.props.filterData(this.props.nutrients, "micro")}
            />
        </div>
      </div>
    )
  }
}

export default Charts
