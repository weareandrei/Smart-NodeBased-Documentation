/* eslint-disable max-lines */
import React from 'react'
import PropTypes from "prop-types"
import IconButton from "@mui/material/IconButton"

import {ExpandLess, ExpandMore} from "@mui/icons-material"
import Typography from "@mui/material/Typography"
import NodeIcon from "../../../documentation/component/nodeIcon";
import {ButtonGroup, Popper} from "@mui/material";
import Button from "@mui/material/Button";

export default class MaxNodeNav extends React.Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        nodeId: PropTypes.string.isRequired,
        nodeType: PropTypes.string.isRequired,
        onExpanded: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        isParent: PropTypes.bool
    }

    static defaultProps = {
        isParent: false
    }

    state = {
        isExpanded: false,
    }

    render = () =>
        <React.Fragment>
            <ButtonGroup>
                <Button onClick={this.props.onClick}></Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>

    nodeExpandButtonClicked = () => {
        this.state.isExpanded ?
            this.nodeExpandOff() : this.nodeExpandOn()
    }

    nodeExpandOn = () => {
        this.setState({isExpanded: true})
        this.props.onExpanded(this.props.nodeId, true)
    }

    nodeExpandOff = () => {
        this.setState({isExpanded: false})
        this.props.onExpanded(this.props.nodeId, false)
    }
}

const style = {

}
