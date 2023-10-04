import React from 'react'
import PropTypes from 'prop-types'
import {CookiesProvider} from 'react-cookie/lib'
import Head from "./core/head";
import Footer from "./core/footer";

class App extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    openCart: PropTypes.func.isRequired,
    isCartOpen: PropTypes.bool.isRequired,
    country: PropTypes.string.isRequired
  }

  static defaultProps = {}

  state = {
    prevLocation: ''
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.history.listen(this.checkPageDuplication)
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

        {/*<Navigation onCartClick={() => this.props.openCart(!this.props.isCartOpen)}/>*/}

        <div style={this.getContainerStyle()}>
          <Route/>
        </div>

        <Footer/>
      </div>
}

const theme = createMuiTheme({
  palette: {
    primary: {main: primary},
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1281,
      xl: 1920
    }
  }
})

const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

const style = {
  container: {
    background: backgroundGrey
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
  isCartOpen: state.application.isCartOpen,
  country: get(state.application.store, 'country', 'Singapore')
}), actions)(App)