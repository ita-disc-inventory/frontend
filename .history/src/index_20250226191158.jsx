import React from 'react';

// Core CSS
import 'primeicons/primeicons.css';
// Theme
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import ReactDOM from 'react-dom/client';

// Icons

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
