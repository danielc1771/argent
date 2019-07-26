import React from "react";
import Searchbar from "./Searchbar";
import "./../navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#393d3f" }}
      >
        <a class="navbar-brand" href="#">
          Argent
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Analytics
              </a>
            </li>
          </ul>
          <Searchbar />
        </div>
      </nav>
    );
  }
}

export default Navbar;
