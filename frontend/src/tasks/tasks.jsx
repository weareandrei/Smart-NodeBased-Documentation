import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {withMediaQuery} from "../common/media";
import {Container} from "@mui/material";


class Tasks extends React.Component {

    render() {
        console.log('Render TASKS')
        return (
            <Container>
                Tasks Page
            </Container>
        )
    }

}

export default connect((state) => ({
}))(withCookies(withRouter(withMediaQuery(Tasks))))
