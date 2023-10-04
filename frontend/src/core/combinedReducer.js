import { applyMiddleware, createStore as _createStore} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import {createBrowserHistory} from 'history'

import application from '../reducer'

export const history = createBrowserHistory({basename: '/'})

const persistConfig = {
    key: 'root',
    storage,
    // blacklist is for things that you don't want to be stored (persistent)
    blacklist: ['spreadsheet', 'application']
}

const createStore = (combinedReducer) => {
    const middleware = [
        routerMiddleware(history)
    ].filter(Boolean)

    return applyMiddleware(...middleware)(_createStore)(combinedReducer &&
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

const rootReducer = combineReducers({
    application,
    router: connectRouter(history)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
