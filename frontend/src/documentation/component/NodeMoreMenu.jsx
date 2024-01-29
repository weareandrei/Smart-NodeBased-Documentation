import * as React from 'react'

import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateIcon from "@mui/icons-material/Create"
import BugReportIcon from "@mui/icons-material/BugReport"

const NodeMoreMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton
                className="nodrag"
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                style={{ width: '27px', borderRadius: '5px', padding: '0px' }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // PaperProps={{
                //     style: {
                //         maxHeight: ITEM_HEIGHT * 4.5,
                //         width: '20ch',
                //     },
                // }}
            >
                <MenuItem key={'op1'} onClick={handleNodeMenuButton}>
                    <CreateIcon style={{marginRight: '12px', color: '#552CF6'}}/>
                    Create new task
                </MenuItem>
                <MenuItem key={'op2'} onClick={handleNodeMenuButton}>
                    <BugReportIcon style={{marginRight: '12px', color: '#552CF6'}}/>
                    Report bug
                </MenuItem>
            </Menu>
        </div>
    )
}

const handleNodeMenuButton = (context) => {
    console.log('context', context)
}

export default NodeMoreMenu