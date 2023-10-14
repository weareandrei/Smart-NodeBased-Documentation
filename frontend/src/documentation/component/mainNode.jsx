import React from 'react'
import {Container} from "@mui/material"
import PropTypes from "prop-types"

export default class MainNode extends React.Component {

    static propTypes = {
        node: PropTypes.object.isRequired
    }

    render = () =>
        <Container style={style.node}>
            <div style={{color: '#fff'}}>{this.props.node.title}</div>
        </Container>

}

const style = {
    node: {
        width: '200px',
        height: '100px',
        margin: '25px',
        padding: '20px',
        background: '#3E4854',
        borderRadius: '20px'
    }
}