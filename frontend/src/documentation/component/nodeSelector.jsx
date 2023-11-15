import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class NodeSelector extends Component {

    static propTypes = {}

    render() {
        return (
            <div>
                <div>You can drag these nodes to the pane on the right.</div>
                <div onDragStart={(event) => this.onDragStart(event, 'input')} draggable>
                    Input Node
                </div>
            </div>
        )
    }

    onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move'
    }

}
