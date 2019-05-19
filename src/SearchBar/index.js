import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    }
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    return (
      <div className="search-box">
        <form action="">
          <input type="search" name="search" className="search-input" id="meteor-name-search" placeholder="Enter search items" onChange={this.onChange} value={this.state.value}/>
          <button className="search-btn" type="submit">SEARCH</button>
        </form>        
      </div>
    );
  }
}

export default SearchBar;