/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import {Breadcrumbs, Link} from "@mui/material"
import Typography from "@mui/material/Typography"

export default class DocumentationBreadcrumbs extends React.Component {

    static propTypes = {
    }

    render = () =>
        <div style={style.mainContainer}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="#938EA6" href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    color="#938EA6"
                    href="/">
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
        </div>

}

const style = {
    mainContainer: {
        width: '100%'
    }
}
