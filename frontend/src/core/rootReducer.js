// rootReducer.js

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as storage

import application from '../reducer'; // Your application reducer
import navigationReducer from '../navigation/reducer';
import authReducer from "@/auth/reducer"; // Your navigation reducer

const persistConfig = {
    key: 'root',
    storage,
    // Add any specific configuration for redux-persist here
}

const createRootReducer = (history) =>
    combineReducers({
        application,
        navigation: navigationReducer,
        auth: authReducer,
        router: connectRouter(history), // Integrating connected-react-router with history
    })

const rootReducer = (history) => {
    const combinedReducer = createRootReducer(history);
    const persistedReducer = persistReducer(persistConfig, combinedReducer);

    return persistedReducer
};

export default rootReducer
