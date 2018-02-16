import React from 'react';
import { Table as RSTable, Button } from 'reactstrap';

class Table extends React.Component {

  constructor(props) {
    super(props);

    this.renderRows.bind(this);
  }

  renderRows() {
    return this.props.data.map(row => {
      return (
        <tr key={row.id}>
          <th scope="row">{row.id}</th>
          <td>{row.attributes.description}</td>
          <td>{row.attributes.status}</td>
          <td><Button onClick={() => this.props.router.push(`/edit/${row.id}`)}>Edit</Button></td>
        </tr>
      )
    });
  }

  render() {
    return (
      <RSTable bordered>
        <thead>
          <tr>
            <th><Button onClick={() => this.props.router.push(`/add`)}> Add Order</Button></th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.length !== 0 ? this.renderRows() : null }
        </tbody>
      </RSTable>
    );
  }
}

export default Table;
