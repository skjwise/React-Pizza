import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const API = 'http://localhost:3000/pizzas';

class App extends Component {
  state = {
    pizzas: [],
    currentPizza: {}
  };

  fetchPizzas() {
    fetch(API)
    .then(res => res.json())
    .then(pizzas => this.setState({pizzas}))
  } 

  componentDidMount() {
    this.fetchPizzas()
  }

  editPizza = (pizza) => {
    this.setState({currentPizza: pizza})
  }

  updatePizza = pizza => {
    if (!this.state.currentPizza) return;
    fetch(API + `/${this.state.currentPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({...pizza})
    })
    .then(() => this.state.pizzas.map(p => p.id === this.state.currentPizza.id ? {...p, pizza} : p))
    .then(newPizza => this.setState({pizzas: newPizza}))

    // const topping = e.target.topping.value
    // const topping = "rice"
    // const newPizzas = this.state.pizzas.map(pizza => pizza.id === this.state.currentPizza.id ? {...pizza, topping} : pizza )
    // console.log(newPizzas)
  }


  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.currentPizza} updatePizza={this.updatePizza}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
