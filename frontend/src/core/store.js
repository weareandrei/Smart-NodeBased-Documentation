import { combineReducers } from "redux"
import { createBrowserHistory } from "history"
import { createReduxHistoryContext } from 'redux-first-history'
import { configureStore } from "@reduxjs/toolkit"
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import application from '../reducer'
import navigationReducer from '../navigation/reducer'
import authReducer from '../auth/reducer'
import documentationReducer from '../documentation/reducer'

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory()
})

const combinedReducers = combineReducers({
    application: application,
    navigation: navigationReducer,
    auth: authReducer,
    documentation: documentationReducer,
    router: routerReducer
})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, combinedReducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(routerMiddleware)
})

const persistor = persistStore(store)
const history = createReduxHistory(store)

export { store, history, persistor }

