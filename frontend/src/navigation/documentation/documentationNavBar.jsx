/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"

import DocumentationBreadcrumbs from "./component/documentationBreadcrumbs"
import ProjectSelect from "./component/projectSelect"
import DocumentationSearch from "./component/documentationSearch"
import RecentNodesList from "./component/recentNodesList"
import AvailableNodesList from "./component/availableNodesList"

export default class DocumentationNavBar extends React.Component {

    static propTypes = {
        allNodes: PropTypes.array.isRequired,
        selectedNode: PropTypes.object,
        selectNode: PropTypes.func.isRequired
    }

    static defaultProps = {
        selectedNode: null
    }

    render = () =>
        <div style={style.documentationNavBar}>
            <DocumentationBreadcrumbs/>
            <ProjectSelect/>
            <DocumentationSearch/>
            <RecentNodesList/>
            <AvailableNodesList
                allNodes={this.props.allNodes}
                selectedNode={this.props.selectedNode}
                selectNode={this.props.selectNode}
            />
        </div>

}

const style = {
    documentationNavBar: {
        left: '77px',

        position: 'absolute',
        height: '100vh',
        width: '300px',
        right: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#fff',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.05)',
        padding: '30px 20px',
        zIndex: '10001'
    }
}
