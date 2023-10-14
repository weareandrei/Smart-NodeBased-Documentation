import React from 'react'
import {Container} from "@mui/material"
import PropTypes from "prop-types"
import map from "lodash/map"
import Button from '@mui/material/Button';

export default class Node extends React.Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
        firstLevel: PropTypes.bool
    }

    static defaultProps = {
        firstLevel: false
    }

    render = () =>
        <div>
            {this.props.firstLevel ?
                this.renderMainNode(this.props.node) :
                this.renderRegularNode(this.props.node)}
            <div style={style.nodeContainer}>
                {this.props.node.children &&
                    map(this.props.node.children, (nodeChild, index) =>
                        <Node key={index}
                              node={nodeChild}
                              onClick={this.props.onClick}/>)}
            </div>
        </div>

    renderMainNode = () =>
        <Button onClick={() => this.props.onClick(this.props.node)}>
            <Container style={style.mainNode}>
                <div style={{color: '#fff'}}>{this.props.node.title}</div>
            </Container>
        </Button>


    renderRegularNode = () =>
        <Button onClick={() => this.props.onClick(this.props.node)}>
            <Container style={style.regularNode}>
                <div style={{color: '#fff'}}>{this.props.node.title}</div>
            </Container>
        </Button>
}

const style = {
    nodeContainer: {
        display: 'flex',
        flexDirection: 'horizontal',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    mainNode: {
        width: '200px',
        height: '100px',
        margin: '25px',
        padding: '18px',
        background: '#3E4854',
        borderRadius: '20px'

    },
    regularNode: {
        width: '180px',
        height: '86px',
        margin: '25px',
        padding: '16px',
        background: '#788390',
        borderRadius: '20px'
    }
}
