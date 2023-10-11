import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {withMediaQuery} from "@/common/media";
import {Container} from "@mui/material";


class Documentation extends React.Component {

    render() {
        console.log('Render DOCUMENTAION')
        return (
            <Container>
                Documentation Page
            </Container>
        )
    }

}

export default connect((state) => ({
}))(withCookies(withRouter(withMediaQuery(Documentation))))
