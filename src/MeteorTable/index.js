import React, {Component} from 'react';
import './MeteorTable.css';
import TableRow from '../TableRow';

class MeteorTable extends Component {
  constructor() {
    super();
    this.state = {
      meteorData: [],
      isLoading: true,
      start: 0,
      end: 10,
    }
  }  

  render() {
    const { meteorData, start, end } = this.state;
    return (
      <div className="table-data">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>Name Type</th>
              <th>Rec Class</th>
              <th>Mass (g)</th>
              <th>Fall</th>
              <th>Year</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            { [...meteorData].map((row) => <TableRow rowItem={row} />) }            
          </tbody>
        </table>
      </div>
    );
  }
}

export default MeteorTable;