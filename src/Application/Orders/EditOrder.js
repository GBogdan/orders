import React from 'react';
import { API } from '../Api';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditOrder extends React.Component {
  constructor(props) {
    super(props);

    this.updateOrder = this.updateOrder.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = { order: null, error: '' }
  }

  componentWillMount() {
    API.get(`/orders/${this.props.match.params.id}`)
       .then(resp => this.setState({ order: resp.data }))
  }

  updateOrder() {
    API.put(`/orders/${this.state.order.data.id}`, this.state.order)
       .then((resp) => resp.ok ? this.props.history.push('/') : this.setState({ error: resp.data.error }));
  }

  handleInputChange(e, attribute) {
    let order = this.state.order;
    order.data.attributes[attribute] = e.target.value;
    this.setState({ order: order})
  }

  render() {
    const description = this.state.order ? this.state.order.data.attributes.description : ''
    const status = this.state.order ? this.state.order.data.attributes.status : ''

    return (
      <div className="container">
      <h1>Edit Order</h1>
        <Form>
          <FormGroup>
            <Label>Description</Label>
            <Input value={description} onChange={e => this.handleInputChange(e, 'description')}/>
          </FormGroup>
          <FormGroup>
            <Label>Status</Label>
            <Input type="select" value={status} onChange={e => this.handleInputChange(e, 'status')}>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </Input>
          </FormGroup>
          <p className="bg-danger">{this.state.error}</p>
          <FormGroup>
              <Button onClick={this.updateOrder}>Submit</Button>&nbsp;&nbsp;
              <Button onClick={this.props.history.goBack}>Back</Button>
          </FormGroup>


        </Form>
      </div>
    );
  }
}

export default EditOrder;
