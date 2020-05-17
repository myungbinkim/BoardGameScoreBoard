import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import playerStore from './redux/playerStore'

import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Provider store={playerStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
