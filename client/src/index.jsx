import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { createStore } from "redux";
// import rootReducer from "../src/reducers/rootReducer.jsx";
import { Provider } from "react-redux";

// const store = createStore(rootReducer);

//below: store={store}
ReactDOM.render(
  <Provider> 
    <App />
  </Provider>,
  document.getElementById('app'));