import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css'
import { BrowserRouter } from 'react-router-dom';
import Application from './Application';
import { Provider } from 'react-redux';
import { store } from './state/index'
import { CookiesProvider } from 'react-cookie';
// import reportWebVitals from './tests/reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Application />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
);

console.log('12dsd3d');
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

