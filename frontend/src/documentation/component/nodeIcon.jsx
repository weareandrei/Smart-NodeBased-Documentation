import React from 'react'
import PropTypes from "prop-types"

// Header icons
import NotesIcon from '@mui/icons-material/Notes'
import LayersIcon from '@mui/icons-material/Layers'
import DataObjectIcon from '@mui/icons-material/DataObject'
import InsertLinkIcon from '@mui/icons-material/InsertLink';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export default class NodeIcon extends React.Component {

    static propTypes = {
        nodeType: PropTypes.string.isRequired,
        type: PropTypes.string,
        sx: PropTypes.object
    }

    static defaultProps = {
        sx: {},
        type: 'main' // or nav
    }

    render = () => {
        switch (this.props.nodeType) {
            case 'page' :
                return <LayersIcon style={{...this.selectStyle(this.props.type), ...this.props.sx}}/>
            case 'current page' :
                return <LayersIcon style={{...this.selectStyle(this.props.type), ...this.props.sx}}/>
            case 'code snippet' :
                return <DataObjectIcon style={{...this.selectStyle(this.props.type), ...this.props.sx}}/>
            case 'note' :
                return <NotesIcon style={{...this.selectStyle(this.props.type), ...this.props.sx}}/>
            case 'link' :
                return <InsertLinkIcon style={{...this.selectStyle(this.props.type), ...this.props.sx}}/>
            case 'backButton' :
                return <KeyboardBackspaceIcon style={{...this.selectStyle('backButton'), ...this.props.sx}}/>
        }
    }

    selectStyle = (iconType) => {
        switch (iconType) {
            case 'main':
                return {color: '#552CF6', marginRight: '15px'}
            case 'nav':
                return {color: '#552CF6', height: '25px'}
            case 'backButton':
                return {color: '#938EA6', height: '20px'}
        }

    }

}
