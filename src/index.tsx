import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import App from './App';
import ApplicationContextProvider from "./context/ApplicationContextProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApplicationContextProvider>
      <App/>
    </ApplicationContextProvider>
  </React.StrictMode>
);
