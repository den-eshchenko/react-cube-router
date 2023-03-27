import React from 'react';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { MainRotateStrategy } from './strategys/rotate/mainRotateStrategy';
import { RotateDefaultStrategy } from './strategys/rotate/rotateDefaultStrategy';

export const rotateStrategy = new MainRotateStrategy({
  strategy: new RotateDefaultStrategy()
}) 

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
     <Provider store={store}>
       <BrowserRouter>
          <App />
       </BrowserRouter>
     </Provider>
   </React.StrictMode>
);


