import React from 'react';
import { API } from '../Api';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddOrder extends React.Component {
  constructor(props) {
    super(props);

    this.createOrder = this.createOrder.bind(this);
    this.updateDescription = this.updateDescription.bind(this);

    this.state = { description: '', error: null }
  }

  createOrder() {
    API.post('/orders', { data: { attributes: { description: this.state.description }}})
       .then((resp) => resp.ok ? this.props.history.push('/') : this.setState({ error: resp.data.error }))
  }

  updateDescription(e) {
    this.setState({ description: e.target.value })
  }

  render() {
    return (
      <div className="container">
      <h1>Create order</h1>
        <Form>
          <FormGroup>
            <Label>Description</Label>
            <Input value={this.state.description} onChange={this.updateDescription}/>
          </FormGroup>
          <p className="bg-danger">{this.state.error}</p>
          <FormGroup>
            <Button onClick={this.createOrder}>Submit</Button>&nbsp;&nbsp;
            <Button onClick={this.props.history.goBack}>Back</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default AddOrder;
