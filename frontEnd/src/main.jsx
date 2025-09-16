import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store.js';
import { Toaster } from './components/ui/sonner.jsx';
import { PersistGate } from 'redux-persist/integration/react';

import { persistStore } from 'redux-persist';
const persistor = persistStore(store);

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Toaster } from './components/ui/sonner'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//     <Toaster/>
//   </StrictMode>,
// )
