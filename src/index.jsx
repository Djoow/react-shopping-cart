import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './components/App';
import Root from './Root';

import './index.scss';

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById('root')
);

reportWebVitals(console.log);
