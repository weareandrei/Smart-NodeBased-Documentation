import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FlowComponent from './FlowComponent';
import map from 'lodash/map';

export default class NodesGridSurface extends Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        selectNode: PropTypes.func.isRequired,
        updateNode: PropTypes.func.isRequired,
    }

    render() {
        console.log('-- this.props.nodes', this.props.nodes)
        return this.renderFlowComponent(
            this.createFlowNodes(this.props.nodes)
        )
    }

    renderFlowComponent = (nodes) =>
        <FlowComponent
            nodes={nodes}
            edgesDisplayed={[]}
        />

    createFlowNodes = (nodes) =>
        map(nodes, (node) => ({
            id: node.id,
            data: {
                label: node.title,
            },
            position: { x: 250 * node.id, y: 0 },
        }))
}
