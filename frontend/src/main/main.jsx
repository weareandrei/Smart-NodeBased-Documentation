import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie";
import {withRouter} from "react-router-dom";
import {withMediaQuery} from "@/common/media";


class MainPage extends React.Component {

    render() {
        console.log('Render MAIN')
        return (
            <dev>
                Main Page
            </dev>
        )
    }

}

export default connect((state) => ({
}))(withCookies(withRouter(withMediaQuery(MainPage))))
