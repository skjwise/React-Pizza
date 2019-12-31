import React from "react"

export default class PizzaForm extends React.Component {
  state = {
    topping: '',
    size: '',
    vegetarian: false
  }

  componentDidUpdate(prevProps) {
    // if(!this.props.pizza) return;
    if(this.props === prevProps) return;
    this.setState({topping: this.props.pizza.topping, size: this.props.pizza.size, 
    vegetarian: this.props.pizza.vegetarian })
  }

  handleClick = () => {
    this.props.updatePizza({...this.state})
    this.setState({topping: '',
    size: '',
    vegetarian: false})
  }


  render() {
  return(
      <div className="form-row">
        <div className="col-5">
            <input onChange={(e)=> this.setState({topping: e.target.value})} name="topping" type="text" className="form-control" placeholder="Pizza Topping" value={
                this.state.topping
              }/>
        </div>
        <div className="col">
          <select onChange={e => this.setState({size: e.target.value})} name="size" value={this.state.size} className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={() => this.setState({vegetarian: true})} name="isVeggie" className="form-check-input" type="radio" value="Vegetarian" checked={this.state.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={() => this.setState({vegetarian: false})} name="notVeggie" className="form-check-input" type="radio" value="Not Vegetarian" checked={!this.state.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={ this.handleClick}>Submit</button>
        </div>
      </div>

  )
  }
}

