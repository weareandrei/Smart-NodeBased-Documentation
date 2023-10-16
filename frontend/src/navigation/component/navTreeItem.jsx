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

import Typography from '@mui/material/Typography';


import map from "lodash/map"
import get from "lodash/get"

export default class NavTreeItem extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        childDepthLevel: PropTypes.number.isRequired,
        node: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired
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
                <ListItemButton
                    onClick={() => {
                        this.toggleItemCollapse();
                        this.props.onClick(this.props.node);
                    }}
                    sx={{ pr: 1, pl: 4 * (this.props.childDepthLevel - 1) + 1}}>
                    <ListItemIcon style={{minWidth: 'auto', maxWidth: 'auto', marginRight: '10px'}}>
                        <InboxIcon />
                    </ListItemIcon>

                    {/*<Typography display="block" noWrap={false} gutterBottom style={{textOverflow: 'ellipsis'}}>*/}
                    {/*    {this.props.title}*/}
                    {/*</Typography>*/}

                    <ListItemText primaryTypographyProps={{ style: { whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' } }}
                                  primary={this.props.title} />
                    {!isEmpty(get(this.props.node, 'children')) &&
                        (this.state.open ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {map(this.props.node.children, (child, index) =>
                            <NavTreeItem
                                key={index}
                                title={child.title}
                                node={child}
                                childDepthLevel={this.props.childDepthLevel+1}
                                onClick={this.props.onClick}/>)}
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
