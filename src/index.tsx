import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { MainRotateStrategy } from './strategies/rotate/mainRotateStrategy';
import { RotateDefaultStrategy } from './strategies/rotate/rotateDefaultStrategy';

export const rotateStrategy = new MainRotateStrategy({
  strategy: new RotateDefaultStrategy()
}) 

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);


