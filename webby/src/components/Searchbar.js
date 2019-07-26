import React from "react";
import "./../css/searchbar.css";

class Searchbar extends React.Component {
  constructor() {
    super();
    this.items = [];
    this.state = {
      suggestions: [],
      text: ""
    };
  }

  componentDidMount() {
    fetch("/api/available/items")
      .then(res => res.json())
      .then(items => (this.items = items));
  }

  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = this.items.sort().filter(v => regex.test(v));
    }
    this.setState({
      suggestions: suggestions,
      text: value
    });
  };

  suggestionSelected(value) {
    console.log(value);
    this.setState(() => ({
      suggestions: [],
      text: value
    }));
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="searchResults">
        {suggestions.map(item => (
          <li
            className="searchItem"
            onClick={() => this.suggestionSelected(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <form class="form-inline my-2 my-lg-0 ml-auto">
        <input
          onChange={this.onTextChanged}
          className="form-control mr-sm-2"
          type="search"
          value={text}
          placeholder="Search"
          aria-label="Search"
          style={{ width: "40vw" }}
        />
        {this.renderSuggestions()}
      </form>
    );
  }
}

export default Searchbar;
