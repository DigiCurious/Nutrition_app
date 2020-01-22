import React from 'react';
import './index.css';
import './bootstrap.css';

class Controller extends React.Component {

  render(){
    return(
      <div id = {this.props.id} className="row ingredient">
        <div className="col-3">
          <p onClick={()=>this.props.setMicros(this.props.name)}>{this.props.name}</p>
        </div>
        <div className="col slidecontainer">
          <input
            data-index={this.props.id}
            type="range"
            min="0"
            max="100" value = {this.props.amount}
            className="slider"
            id="myRange"
            onChange={this.props.onChange}
          />
        </div>
        <div className="col-1">
          <p>{this.props.amount}</p>
        </div>
        <div className="col-2">
          <button
          className = "btn btn-block btn-primary"
          onClick = {() => this.props.remove(this.props.id)}
          >
            -
          </button>
        </div>
      </div>
    )
  }
}

export default Controller
