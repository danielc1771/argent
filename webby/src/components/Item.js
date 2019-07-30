import React from "react";

class Item extends React.Component {
  constructor() {
    super();
    this.state = {
      item: "",
      prices: []
    };
  }

  componentDidMount() {
    let category = window.location.href.split("/")[4].replace(/%20/g, " ");
    let item = window.location.href.split("/")[5].replace(/%20/g, " ");

    fetch(`/api/prices/${category}/${item}`)
      .then(res => res.json())
      .then(obj => this.setState({ item: item, prices: obj }));
  }
  render() {
    let itemPrices = [];
    for (let price of this.state.prices) {
      itemPrices.push(
        <li>
          ${price.price} As Of: {price.timestamp}
        </li>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 style={{ marginTop: "1em" }}>{this.state.item}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>Prices:</h3>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul>{itemPrices}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
