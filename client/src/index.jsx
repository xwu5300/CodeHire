import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createStore } from "redux";
// import rootReducer from "../src/reducers/rootReducer.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

// const store = createStore(rootReducer);

//below: store={store}
ReactDOM.render(
  <Provider> 
    <App />
  </Provider>,
  document.getElementById('app'));