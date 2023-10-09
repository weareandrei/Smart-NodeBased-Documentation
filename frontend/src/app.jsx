import React from 'react'
import PropTypes from 'prop-types'
import {CookiesProvider} from 'react-cookie/lib'
import Head from "./core/head"
import Footer from "./core/footer"
import {persistor} from './core/store'
import {PersistGate} from "redux-persist/integration/react"
import {ConnectedRouter} from 'connected-react-router'
import {connect, Provider} from 'react-redux'
import Route from './core/route'

import * as actions from './action'
import Navigation from "./navigation/navigation"

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
          <React.Suspense fallback={<div/>}>
            <ConnectedRouter history={this.props.history}>
              {this.renderApp()}
            </ConnectedRouter>
          </React.Suspense>
        </PersistGate>
      </Provider>

  renderApp = () =>
      <div>
        <Head/>

          {/*{this.renderNavigation(this.props.history.location.pathname)}*/}
          <Navigation fullNav={true} />

        <div style={style.content}>
          <Route/>
        </div>

        <Footer/>
      </div>

    // renderNavigation = (path) =>  {
    //     console.log('Pathname ... ', path)
    //     // This probably needs to be done using the STATE, not PROPS.
    //     if (path === '/auth') {
    //         return <Navigation fullNav={false} />
    //     } else {
    //         return <Navigation fullNav={true} />
    //     }
    // }
}

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const style = {
    content: {
        marginLeft: '280px',
        marginTop: '60px'
    }
}

export default connect((state) => ({
}), actions)(App)
