import React, { Component } from 'react';
import './MeteorTable.css';
import TableRow from '../TableRow';

class MeteorTable extends Component {
  render() {
    const { displayData } = this.props;
    return (
      <div className="table-data">
        <table className="table-container">
          <thead>
            <tr>
              <th className="name">Name</th>
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
            { (displayData && displayData.length > 0) ? displayData.map(row => <TableRow key={row.id} rowItem={row} />) : (              
              <p className="error-message"> There are no results to display :(  </p>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MeteorTable;
