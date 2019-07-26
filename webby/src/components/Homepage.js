import React from "react";

class Homepage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: "5em" }}>
          <div className="col" style={{ textAlign: "center" }}>
            <h1 className="display-1" style={{ color: "#393d3f" }}>
              Welcome!
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1
              style={{
                color: "#393d3f",
                textAlign: "center",
                marginTop: "3em"
              }}
            >
              To get started, try searching for an item...
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
