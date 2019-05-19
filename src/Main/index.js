import React, {Component} from 'react';
import SearchBar from '../SearchBar';
import MeteorTable from '../MeteorTable';
import axios from 'axios';
import './Main.css';

class Main extends Component {
  componentDidMount = async () => {
    try {
      const metData = await axios.get('https://data.nasa.gov/resource/gh4g-9sfh.json', {});
      this.setState({
        meteorData: metData.data,
        isLoading: false
      });
    } catch(error) {
      console.error('Error while fetching API', error)
    }
  }
  render() {
    return (
      <main className="main">
        <SearchBar />
        <MeteorTable />
      </main>
    );
  }
}

export default Main;