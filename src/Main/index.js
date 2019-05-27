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
      isLoading: true,
      currentPage: null, 
      totalPages: null,
      pageLimit: null,
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
      console.error(error);
    }
    this.onPageChanged(data);
  }

  onPageChanged = (data, searchKey) => {
    const { meteorData } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    let displayData = [];

    const offset = (currentPage - 1) * pageLimit;

    if (searchKey === undefined) {  
      displayData = [...meteorData].slice(offset, offset + pageLimit);    
    } else {
      const results = [...meteorData].filter(val => val.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1);
      displayData = results.slice(offset, offset + pageLimit);
    }
    this.setState({ currentPage, displayData, totalPages, pageLimit });
  }

  handleSelectChange(e) {
    this.setState({
      pageLimit: e.target.value
    });
  }

  render() { 
    const { meteorData, displayData, isLoading, pageLimit} = this.state;
    const totalMet = meteorData.length;

    if(totalMet === 0) return null;
    return (
      <main className="main">
        <SearchBar search={this.onPageChanged} />
        <div className="table-box">
          {isLoading ? <Loader /> : <MeteorTable displayData={displayData} />}
        </div>
        {displayData && displayData.length > 0 ? (
          <div className="nav-features">
            {/* <div className="width">
          </div> */}
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination totalRecords={totalMet} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>            
            {/* <div className="listPerPage"> Results Per Page
            <select name="listPerPage" id="listPerPage" className="select-box" value={pageLimit} onChange={this.handleSelectChange}>
                <option value="10">10</option>
                <option value="20" selected={true}>20</option>
                <option value="30">30</option>
              </select>
            </div> */}
          </div>
        ) : ('')}
      </main>
    );
  }
}

export default Main;
