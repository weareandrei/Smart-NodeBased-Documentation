import React from 'react'
import PropTypes from 'prop-types'
import {CookiesProvider} from 'react-cookie/lib'
import Head from "./core/head"
import Footer from "./core/footer"
import {store, persistor, history} from './core/store'
import {PersistGate} from "redux-persist/integration/react"
import { Router } from "react-router-dom"
import {connect, Provider} from 'react-redux'
import Route from './core/route'

import * as actions from './action'
import Navigation from "./navigation/navigation"

class App extends React.Component {

  static propTypes = {
  }

  render() {
      return (
        <CookiesProvider>
            {this.renderProvider()}
        </CookiesProvider>
      )
  }

  renderProvider = () =>
      <Provider store={store}>
        <PersistGate loading={null}
                     persistor={persistor}>
          <React.Suspense fallback={<div/>}>
            <Router history={history}>
              {this.renderApp()}
            </Router>
          </React.Suspense>
        </PersistGate>
      </Provider>

  renderApp = () =>
      <div>
        <Head/>

          <Navigation fullNav={true} />

        <div style={style.content}>
          <Route/>
        </div>

        <Footer/>
      </div>
}

// const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const style = {
    content: {
        marginLeft: '280px',
        marginTop: '60px'
    }
}

export default connect((state) => ({
}), actions)(App)
