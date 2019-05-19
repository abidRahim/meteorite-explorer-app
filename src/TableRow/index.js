import React, {Component} from 'react';
import './TableRow.css';

class TableRow extends Component {
  render() {
    const { rowItem } = this.props;
    return (
      <tr>
        <td>{rowItem.name}</td>
        <td>{rowItem.id}</td>
        <td>{rowItem.nametype}</td>
        <td>{rowItem.recclass}</td>
        <td>{rowItem.mass}</td>
        <td>{rowItem.fall}</td>
        <td>{new Date(rowItem.year).getFullYear()}</td>
        <td>{rowItem.reclat}</td>
        <td>{rowItem.reclong}</td>        
      </tr>
    );
  }
}

export default TableRow;