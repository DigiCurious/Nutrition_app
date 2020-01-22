import React from 'react';
import './index.css';
import './bootstrap.css';

class AddNewRecipe extends React.Component {

  render(){
    return(
      <div className="col addNew">
          <form className="form-inline" onSubmit = {(event) => this.props.onSubmit(event)}>
              <div id="recipeName" className="form-group mb-2">
                  <label>Recipe Name</label>
                  <input id="recipeName" className = "form-control" onChange={(event)=>this.props.onChange(event)}/>
              </div>
              <div className="form-group mb-2">
                  <button type="submit" className = "btn btn-block btn-primary"
                    >
                    Create a new recipe
                  </button>
              </div>
          </form>
      </div>
    )
  }
}

export default AddNewRecipe
