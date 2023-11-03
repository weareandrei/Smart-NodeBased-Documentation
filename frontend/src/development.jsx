import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './app'
import { store, history } from './core/store'
import './style.css'

const container = document.getElementById('root')
const root = createRoot(container)

const launch = (Component, store) => {
    root.render(
        <Component store={store}
                   history={history}/>
    )
}

launch(App, store)
