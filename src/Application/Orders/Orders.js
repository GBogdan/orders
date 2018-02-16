import React from 'react';
import Table from './components/Table';
import { API } from '../Api';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.renderTable = this.renderTable.bind(this);
    this.getOrders = this.getOrders.bind(this);

    this.state = { orders: [], selectedOrder: null }
  }

  componentWillMount() {
    const getOrders = this.getOrders;
    getOrders();
    setInterval(function(){
      getOrders();
    }, 15000)
  }

  getOrders = () => API.get('/orders').then(resp => resp.data ? this.setState({ orders: resp.data.data }) : null);

  renderTable = () => <Table data={this.state.orders} router={this.props.history}/>;

  render() {
    return (
      <div className="container">
        {this.renderTable()}
      </div>
    );
  }
}

export default Orders;
