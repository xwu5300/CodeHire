import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import store from './store/index.js';


//below: store={store}
ReactDOM.render(
  <Provider store={store}> 
    <App />
  </Provider>,
  document.getElementById('app'));