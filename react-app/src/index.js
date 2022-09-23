import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './components/context/Modal';
import MessageContextProvider from './components/context/messageContext';
import ProfileContextProvider from './components/context/profileContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProfileContextProvider>
        <MessageContextProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </MessageContextProvider>
      </ProfileContextProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
