import React from 'react'
import PropTypes from 'prop-types'
import {CookiesProvider} from 'react-cookie/lib'
import Head from "./core/head"
import Footer from "./core/footer"
import {persistor} from './core/combinedReducer'
import {PersistGate} from "redux-persist/integration/react"
import {ConnectedRouter} from 'connected-react-router'
import {connect, Provider} from 'react-redux'
import Route from './core/route'

import * as actions from './action'

class App extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    return (
        <CookiesProvider>
          {this.renderProvider()}
        </CookiesProvider>
    )
  }

  renderProvider = () =>
      <Provider store={this.props.store}>
        <PersistGate loading={null}
                     persistor={persistor}>
          {/*<ThemeProvider theme={theme}>*/}
          <React.Suspense fallback={<div/>}>
            <ConnectedRouter history={this.props.history}>
              {this.renderApp()}
            </ConnectedRouter>
          </React.Suspense>
          {/*</ThemeProvider>*/}
        </PersistGate>
      </Provider>

  renderApp = () =>
      <div style={style.container}>
        <Head/>

        Some navigation text here
        {/*<Navigation onCartClick={() => this.props.openCart(!this.props.isCartOpen)}/>*/}

        <div>
        {/*<div style={this.getContainerStyle()}>*/}
            Hello World
        {/*  <Route/>*/}
        </div>

        <Footer/>
      </div>
}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const style = {
  container: {
    background: 'grey'
  },
  mainContainer: {
    minHeight: isMobile() ? '3220px' : '800px'
  },
  mainProductContainer: {
    minHeight: isMobile() ? '2000px' : '1300px'
  },
  mainCheckoutContainer: {
    minHeight: '1150px'
  },
  preloader: {
    top: '56px',
    zIndex: 1000
  }
}

export default connect((state) => ({
}), actions)(App)