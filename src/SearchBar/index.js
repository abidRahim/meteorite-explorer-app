import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      emptyString: false
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
    search(data, e.target.value);
    this.setState({
      value: e.target.value,
      emptyString: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value === "") {
      this.setState({
        emptyString: true,
      });
    }
  }

  render() {
    const { value, emptyString } = this.state;
    return (
      <div className="search-box">
        <form onSubmit={this.handleSubmit}>
          <input type="search" name="search" className="search-input" id="meteor-name-search" placeholder="Enter search items" onChange={this.onChange} value={value} />
          <button className="search-btn" type="submit">SEARCH</button>
        </form>
        { emptyString ? <span className="error-message">Dont leave the search bar empty</span> : '' }        
      </div>
    );
  }
}

export default SearchBar;
