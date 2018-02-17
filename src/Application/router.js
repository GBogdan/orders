import React from 'react';
import Orders from './Orders/Orders';
import AddOrder from './Orders/AddOrder';
import EditOrder from './Orders/EditOrder';
import { BrowserRouter, Route } from 'react-router-dom';

class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Orders} />
          <Route path="/add" component={AddOrder} />
          <Route path="/edit/:id" component={EditOrder} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
