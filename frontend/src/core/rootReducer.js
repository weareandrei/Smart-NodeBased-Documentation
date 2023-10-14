import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import application from '../reducer'
import navigationReducer from '../navigation/reducer'
import authReducer from "@/auth/reducer"
import documentationReducer from "@/documentation/reducer"

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
        documentation: documentationReducer,
        router: connectRouter(history),
    })

const rootReducer = (history) => {
    const combinedReducer = createRootReducer(history);
    const persistedReducer = persistReducer(persistConfig, combinedReducer);

    return persistedReducer
};

export default rootReducer
