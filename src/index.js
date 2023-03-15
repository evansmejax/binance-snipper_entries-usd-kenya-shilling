import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'devextreme/dist/css/dx.light.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

root.render(app);
