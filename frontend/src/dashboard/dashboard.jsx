import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {withMediaQuery} from "../common/media";
import {Container} from "@mui/material";
import PropTypes from "prop-types";
import * as actions from "./action";


class Dashboard extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        documentation: PropTypes.object,
        loadDocumentation: PropTypes.func.isRequired
    }

    static defaultProps = {
        documentation: null
    }

    componentDidMount() {
        // if (this.props.documentation === null) {
        //     this.props.loadDocumentation(this.props.user.documentationId)
        // }
        console.log('user:', this.props.user)
        this.props.loadDocumentation(this.props.user.documentationId)
    }

    render() {

        const documentationContent = this.props.documentation ? JSON.stringify(this.props.documentation) : 'Documentation not available';

        return (
            <Container>
                <div>
                    <p>Dashboard page</p>
                    <p>Documentation:</p>
                    <pre>{documentationContent}</pre>
                </div>
            </Container>
        )
    }

}

export default connect((state) => ({
    user: state.auth.userData,
    documentation: state.application.documentation
}), actions)(withCookies(withRouter(withMediaQuery(Dashboard))))
