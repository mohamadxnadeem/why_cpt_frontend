import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { CurrencyProvider } from './contexts/CurrencyContext';

ReactDOM.render(
  <BrowserRouter >
    <ScrollToTop />
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
