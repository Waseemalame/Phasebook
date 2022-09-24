import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentsReducer from './comment';
import postsReducer from './post';
import imagesReducer from './image';
import requestsReducer from './request';
import messagesReducer from './message';
import likesReducer from './like';
import session from './session'

const rootReducer = combineReducers({
  session,
  posts: postsReducer,
  comments: commentsReducer,
  friends: requestsReducer,
  images: imagesReducer,
  messages: messagesReducer,
  likes: likesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
