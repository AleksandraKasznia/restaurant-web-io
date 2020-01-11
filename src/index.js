import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);


serviceWorker.unregister();
