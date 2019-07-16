import React from "react";

class Dash extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch("/api/items")
      .then(res => res.json())
      .then(items => this.setState({ items }, console.log(items)));
  }

  listItems() {
    let result = [];
    for (let item of this.state.items) {
      let prices = [];
      for (let price of item.prices) {
        prices.push(
          <div>
            Price: {price.price} As Of: {price.timestamp}
          </div>
        );
      }
      result.push(
        <li>
          {item.item} {prices}
        </li>
      );
    }
    return result;
  }

  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <h3>Items</h3>
        <ul>{this.listItems()}</ul>
      </div>
    );
  }
}

export default Dash;
