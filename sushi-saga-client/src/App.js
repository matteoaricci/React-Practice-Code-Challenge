import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  constructor() {
    super();
    this.state = {
      sushis: [],
      eaten: [],
      money: 106,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    fetch(API)
      .then((resp) => resp.json())
      .then((res) => this.setState({ sushis: res }));
  }

  selectFour = () => {
    let ind = this.state.currentIndex;
    return this.state.sushis.slice(ind, ind + 4);
  };

  eat = (sushi) => {
    if (!this.state.eaten.includes(sushi) && this.state.money >= sushi.price) {
      this.setState({
        eaten: [...this.state.eaten, sushi],
        money: this.state.money - sushi.price,
      });
    }
  };

  more = () => {
    let newIndex = this.state.currentIndex + 4

    if (newIndex >= this.state.sushis.length) {
      newIndex = 0
    } 

    this.setState({
      currentIndex: newIndex
    })
  }

  addFunds = (event) => {
    event.preventDefault();
    let newFunds = parseInt(event.target.money.value)
    this.setState({
      money: this.state.money + newFunds
    })
    event.target.reset();
  }

  render() {
    return (
      <div className="app">

        <form onSubmit={event => this.addFunds(event)}>
          <input name="money" type="number"/>
          <input type="submit"/>
        </form>

        <SushiContainer
          eaten={this.state.eaten}
          eat={this.eat}
          sushis={this.selectFour()}
          more={this.more}
        />
        <Table eaten={this.state.eaten} money={this.state.money} />
      </div>
    );
  }
}

export default App;
