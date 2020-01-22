import React from 'react';
import './index.css';
import './bootstrap.css';

class SearchBar extends React.Component {

  render(){
    const meals = ['breakfast','lunch','dinner']
    return(
      <div className="row searchBar">
        <div className="col-5">
          <form>
            <div className="form-group">
              <input className="form-control" value={this.props.filterText} onChange = {(event) => {this.props.onChange(event.target.value)}}></input>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchBar
