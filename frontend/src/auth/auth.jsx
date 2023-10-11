/* eslint-disable max-lines */
import React from 'react'
import * as actions from './action'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withCookies} from 'react-cookie'
import {withMediaQuery} from '@/common/media'
import {withRouter} from 'react-router-dom'

import Button from '@mui/material/Button'
import {validateUser} from "@/auth/action";
import {TextField} from "@mui/material";


class Auth extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        authenticated: PropTypes.bool.isRequired,
        validateUser: PropTypes.func.isRequired
    }

    render() {
        return this.props.authenticated ? this.signedIn('signedIn') : this.renderLoginPage()
    }

    state = {
        username: '',
        password: ''
    }

    renderLoginPage = () => {
        return (
            <div>
                <TextField
                    label="Username"
                    variant="outlined"
                    value={this.state.username}
                    onChange={(e) => this.setState({ username: e.target.value })}
                    fullWidth
                    margin="normal"/>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    fullWidth
                    margin="normal"/>
                <Button
                    variant="outlined"
                    onClick={() => {
                        const credentials = {
                            username: this.state.username,
                            password: this.state.password
                        };
                        this.props.validateUser(credentials)
                    }}>
                    Sign In
                </Button>
            </div>
        );
    }

    signedIn = (authState) => {
        if (authState === 'signedIn') {
            const nextPage = this.props.location && this.props.location.pathname === 'login' ?
                '/dashboard' : '/dashboard'
            this.props.history.push(nextPage)
        }
    }

}

export default connect((state) => ({
    isMobile: false,
    authenticated: state.auth.authenticated
}), actions)(withCookies(withRouter(withMediaQuery(Auth))))
