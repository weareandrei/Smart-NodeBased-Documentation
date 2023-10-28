// weird gotcha - install history v4.10.1
// see open issue: https://github.com/supasate/connected-react-router/issues/312#issuecomment-647082777
import { combineReducers } from "redux"
import { createBrowserHistory } from "history"
import { createReduxHistoryContext } from 'redux-first-history'
import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import thunk from 'redux-thunk'

import application from '../reducer'
import navigationReducer from '../navigation/reducer'
import authReducer from '../auth/reducer'
import documentationReducer from '../documentation/reducer'

const persistConfig = {
    key: 'root',
    storage,
    // Add any specific configuration for redux-persist here
}

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory()
    //other options if needed
})

const combinedReducers = combineReducers({
    application: application,
    navigation: navigationReducer,
    auth: authReducer,
    documentation: documentationReducer,
    router: routerReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const preloadedState = {}
const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware),
    reducer: persistedReducer,
    preloadedState
})

const persistor = persistStore(store)
const history = createReduxHistory(store)

export { store, history, persistor }

