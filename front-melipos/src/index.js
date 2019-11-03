import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';
import RouterApp from './routers'

ReactDOM.render(<Provider  store={store}>
    <RouterApp />
</Provider>, document.getElementById('root'));

