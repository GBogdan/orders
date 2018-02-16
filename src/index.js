import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Router from './Application/router';
ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
