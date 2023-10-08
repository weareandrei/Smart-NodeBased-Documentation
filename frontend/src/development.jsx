import React from 'react'
import {createRoot} from 'react-dom/client'
import {AppContainer} from 'react-hot-loader'
import App from './app'
import { store, history } from './core/store'

const container = document.getElementById('root')
const root = createRoot(container)

const launch = (Component, store) => {
    root.render(
        <AppContainer>
            <Component store={store}
                       history={history}/>
        </AppContainer>
    )
}

launch(App, store)
const alwaysFalse = false
if (module.hot || alwaysFalse) {
    module.hot.accept('./app.jsx', () => import('./app.jsx').then(launch))
}
