import React from 'react'
import {Container} from "@mui/material"
import PropTypes from "prop-types"
import map from "lodash/map"
import Button from '@mui/material/Button';

export default class Node extends React.Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
        firstLevel: PropTypes.bool,
        size: PropTypes.object.isRequired
    }

    static defaultProps = {
        firstLevel: false,
    }

    render = () =>
        this.props.firstLevel ?
            this.renderMainNode(this.props.node) :
            this.renderRegularNode(this.props.node)

    renderMainNode = () =>
        <Button key={this.props.node.id} style={style.nodeButtonContainer} onClick={() => this.props.onClick(this.props.node)}>
            <div style={style.node(true)}>{this.props.node.title}</div>
        </Button>


    renderRegularNode = () =>
        <Button key={this.props.node.id} style={style.nodeButtonContainer}  onClick={() => this.props.onClick(this.props.node)}>
            <div style={style.node(false)}>{this.props.node.title}</div>
        </Button>
}

const style = {
    nodeButtonContainer: {
        width: '100%',
        height: '100%',
        background: '#3E4854'
    },
    node: (main) =>
        main ? {
            width: '100%',
            // background: '#3E4854',
            // borderRadius: '20px'
    } : {
            width: '100%',
            // background: '#788390',
            // borderRadius: '20px'
    }
}
