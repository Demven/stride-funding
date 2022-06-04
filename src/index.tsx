import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReduxProvider from './redux/ReduxProvider';
import './styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
