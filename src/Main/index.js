/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-named-as-default-member
import SearchBar from '../SearchBar';
import MeteorTable from '../MeteorTable';
import Loader from '../Loader';
import './Main.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      meteorData: [],
      displayData: [],
      cacheData: [],
      isLoading: true,
      listPerPage: 10,
      offset: 0,
    };
    this.searchResults = this.searchResults.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }

  async componentDidMount() {
    try {
      const metData = await axios.get('https://data.nasa.gov/resource/gh4g-9sfh.json', {});
      this.setState({
        meteorData: metData.data,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
    }
    this.searchResults();
  }

  searchResults = (searchKey) => {
    const { meteorData, offset, listPerPage } = this.state;

    if (searchKey === undefined) {
      this.setState({
        displayData: [...meteorData].slice(offset * listPerPage, offset * listPerPage + listPerPage),
      });
    } else {
      const results = [...meteorData].filter(val => val.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
      this.setState({
        displayData: results.slice(offset * listPerPage, offset * listPerPage + listPerPage),
      });
    }
  }

  handleSelectChange(e) {
    this.setState({
      listPerPage: e.target.value
    }, this.searchResults());
  }

  next() {
    const { offset } = this.state;
    this.setState({
      offset: offset + 1,
    }, this.searchResults());
  }

  back() {
    const { offset } = this.state;
    if (offset !== 0)
      this.setState({
        offset: offset - 1,
      }, this.searchResults());
  }


  render() {
    const { displayData, isLoading, listPerPage, offset } = this.state;
    return (
      <main className="main">
        <SearchBar search={this.searchResults} />
        <div className="table-box">
          {isLoading ? <Loader /> : <MeteorTable displayData={displayData} />}
        </div>
        {displayData && displayData.length > 0 ? (
          <div className="nav-features">
            <div className="width">
            </div>
            <div className="navigation-button">
              <button className="btn" type="button" onClick={this.back}>Previous</button>
              <button className="btn" type="button" onClick={this.next}>Next</button>
            </div>
            <div className="listPerPage"> Results Per Page
            <select name="listPerPage" id="listPerPage" className="select-box" value={listPerPage} onChange={this.handleSelectChange}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
        ) : ('')}
      </main>
    );
  }
}

export default Main;
