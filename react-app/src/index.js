import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './components/context/Modal';
import MessageContextProvider from './context/messageContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MessageContextProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </MessageContextProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
