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
      suggestions = this.items
        .sort(this.compare)
        .filter(v => regex.test(v.name));
    }
    this.setState({
      suggestions: suggestions,
      text: value
    });
  };

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  suggestionSelected(value) {
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
            onClick={() => this.suggestionSelected(item.name)}
          >
            <a href={`/prices/${item.category}/${item.name}`}>{item.name}</a>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <form className="form-inline my-2 my-lg-0 ml-auto">
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
