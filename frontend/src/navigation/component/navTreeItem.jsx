/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import isEmpty from "lodash/isEmpty"

import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import List from '@mui/material/List'
import map from "lodash/map"

export default class NavTreeItem extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.array,
        childDepthLevel: PropTypes.number.isRequired
    }

    static defaultProps = {
        children: []
    }

    state = {
        open: false
    }

    render() {
        return this.renderNavItem()
    }

    renderNavItem = () => {
        return (
            <div>
                <ListItemButton onClick={() => this.toggleItemCollapse()}
                                sx={{ pl: 4 * (this.props.childDepthLevel-1) }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={this.props.title} />
                    {!isEmpty(this.props.children) &&
                        (this.state.open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {map(this.props.children, (child, index) =>
                            <NavTreeItem
                                key={index}
                                title={child.title}
                                children={child.children}
                                childDepthLevel={this.props.childDepthLevel+1}/>)}

                        <ListItemButton sx={{ pl: 4 * this.props.childDepthLevel }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </div>
        )
    }

    toggleItemCollapse = () => {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    }
}
