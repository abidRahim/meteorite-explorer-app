import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const data = {
      currentPage: 1,
      totalPages: null,
      pageLimit: 20,
    };
    const { search } = this.props;
    this.setState({
      value: e.target.value,
    }, search(data, e.target.value));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value === "") {
      console.log('true');
      return <p className="error-message">Oops, the search bar seems to be empty</p>;
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="search-box">
        <form onSubmit={this.handleSubmit}>
          <input type="search" name="search" className="search-input" id="meteor-name-search" placeholder="Enter search items" onChange={this.onChange} value={value} />
          <button className="search-btn" type="submit">SEARCH</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
