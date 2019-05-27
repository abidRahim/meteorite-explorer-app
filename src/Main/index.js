/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-named-as-default-member
import SearchBar from '../SearchBar';
import MeteorTable from '../MeteorTable';
import Loader from '../Loader';
import Pagination from '../Pagination';
import './Main.css';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      meteorData: [],
      displayData: [],
      cacheData: [],
      isLoading: true,
      currentPage: null,
      totalPages: null,
      pageLimit: null,
      error: false,
      searchState: null,
      searchKey: null,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onPageChanged = this.onPageChanged.bind(this);
  }

  async componentDidMount() {
    const data = {
      currentPage: 1,
      totalPages: null,
      pageLimit: 20,
    }
    try {
      const metData = await axios.get('https://data.nasa.gov/resource/gh4g-9sfh.json', {});
      this.setState({
        meteorData: metData.data,
        isLoading: false,
      });
    } catch (error) {
      if (error) {
        this.setState({
          error: true,
        });
      }
    }
    this.onPageChanged(data, this.state.searchKey);
  }

  onPageChanged = (data, searchKey) => {
    const { meteorData } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    let displayData = [];
    let cacheData = [];

    const offset = (currentPage - 1) * pageLimit;

    if (searchKey === undefined || searchKey === null) {
      displayData = [...meteorData].slice(offset, offset + pageLimit);
      this.setState({
        displayData,
        searchState: false,
      })
    } else {
      const results = [...meteorData].filter(val => val.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
      cacheData = results;
      displayData = results.slice(offset, offset + pageLimit);
      this.setState({
        currentPage,
        displayData,
        cacheData,
        totalPages,
        pageLimit,
        searchKey,
        searchState: true,
      });
    }
  }

  handleSelectChange(e) {
    this.setState({
      pageLimit: e.target.value
    });
  }

  render() {
    const { meteorData, cacheData, displayData, isLoading, error, searchState, searchKey } = this.state;
    const totalMet = searchState ? cacheData.length : meteorData.length;

    return (
      <main className="main">
        {error ?
          (<p className="error-message">Server Error: API request error or server not found</p>) :
          (<>
            <SearchBar search={this.onPageChanged} />
            <div className="table-box">
              {isLoading ? <Loader /> : <MeteorTable displayData={displayData} />}
            </div>
            {displayData && displayData.length > 0 ? (
              <div className="nav-features">
                <div className="d-flex flex-row py-4 align-items-center">
                  <Pagination totalRecords={totalMet} searchKey={searchState ? searchKey : null} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                </div>
              </div>) : ('')}
          </>
          )}
      </main>
    );
  }
}

export default Main;
