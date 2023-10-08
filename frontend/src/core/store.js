// store.js

import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk'; // Import Redux Thunk middleware

import rootReducer from './rootReducer'; // Your rootReducer

// Create a history instance
export const history = createBrowserHistory();

// Create the middleware for connecting history with Redux
const routerMiddlewareInstance = routerMiddleware(history);

// Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [routerMiddlewareInstance, thunk];

// Create the Redux store
const store = createStore(
    rootReducer(history), // Pass history to the rootReducer
    composeEnhancers(applyMiddleware(...middlewares))
);

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
