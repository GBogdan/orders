import React from 'react';
import Table from './components/Table';
import { API } from '../Api';
import { Input, FormGroup, Label } from 'reactstrap';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.renderTable = this.renderTable.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.state = {
      orders: [],
      selectedOrder: null,
      filter: '',
      filterByDelivered: false,
      filterByPending: false,
      runOnce: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.filter === '' && this.state.filter !== '') {
      this.getOrders();
    }

    if(prevState.filter !== '' && this.state.filter === '') {
      this.getOrders();
    }
  }


  componentWillMount() {
    this.getOrders();
    this.setState({ runOnce: setInterval(this.getOrders, 15000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.runOnce);
  }

  getOrders = () => API.get(`/orders?${this.state.filter}`)
                       .then(resp => resp.data ? this.setState({ orders: resp.data.data }) : null);

  renderTable = () => <Table data={this.state.orders} router={this.props.history}/>;

  handleFilter(filterType) {
    if(filterType === 'delivered' && this.state.filterByDelivered === false) {
      this.setState({ filterByDelivered: true, filter: 'status=delivered' })
    } else if (filterType === 'delivered') {
      this.setState({ filterByDelivered: false, filter: '' })
    }

    if (filterType === 'pending' && this.state.filterByPending === false) {
      this.setState({ filterByPending: true, filter: 'status=pending' })
    } else if (filterType === 'pending') {
      this.setState({ filterByPending: false, filter: '' })
    }
  }

  render() {
    return (
      <div className="container">
        <FormGroup check>
         <Label check>
          <Input
            type="checkbox"
            value={this.state.filterByPending}
            onChange={() => this.handleFilter('pending')}
            disabled={this.state.filterByDelivered}
            />
           Filter by pending
         </Label>
       </FormGroup>
       <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            value={this.state.filterByDelivered}
            onChange={() => this.handleFilter('delivered')}
            disabled={this.state.filterByPending}
            />
          Filter by delivered
        </Label>
      </FormGroup>
        {this.renderTable()}
      </div>
    );
  }
}

export default Orders;
