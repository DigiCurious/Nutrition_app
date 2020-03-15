import React from 'react';
import './bootstrap.css';
import Bargraph from './bargraph'
import Piegraph from './piegraph'

class Charts extends React.Component {

  render(){
    const meals = ['breakfast','lunch','dinner']
    return(
      <div className="col-6">
        <h2>Nutrients of {this.props.title}</h2>
        <div id="Macros" style={{display: "none"}} className="nutrients">
            <Piegraph
              data = {this.props.data}

              //dataSet = {this.props.filterData(this.props.nutrients, "macro")}
            />
        </div>
        <div id="Micros" className="nutrients">
            <Bargraph
              theme = {this.props.theme}
              data = {this.props.data}
            />
        </div>
      </div>
    )
  }
}

export default Charts
