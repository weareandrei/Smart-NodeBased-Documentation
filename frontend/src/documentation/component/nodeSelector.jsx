import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class NodeSelector extends Component {

    static propTypes = {}

    render() {
        return (
            <div style={style.selectorContainer}>
                <div style={style.draggableNode} onDragStart={(event) => this.onDragStart(event, 'input')} draggable>
                    Input Node
                </div>

                <div style={style.draggableNode} onDragStart={(event) => this.onDragStart(event, 'input')} draggable>
                    Input Node
                </div>

                <div style={style.draggableNode} onDragStart={(event) => this.onDragStart(event, 'input')} draggable>
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

const style = {
    selectorContainer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        right: 0,
        bottom: 0,
        height: 'fit-content',
        width: '150px',
        background: 'rgba(210,210,210,0.3)',
        borderRadius: '10px',
        margin: '10px',
        padding: '10px',
        overflow: 'scroll'
    },
    draggableNode: {
        padding: '10px',
        marginBottom: '10px',
        background: 'white',
        border: '1px black solid',
        borderRadius: '3px'
    }
}