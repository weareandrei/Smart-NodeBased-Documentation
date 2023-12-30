import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Typography from "@mui/material/Typography"
import PropTypes from "prop-types"
import find from "lodash/find";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default class ProjectSelect extends React.Component {

    static propTypes = {
        selectedProject: PropTypes.object,
        allProjects: PropTypes.array.isRequired,
        selectProject: PropTypes.func.isRequired,
    }

    render() {
        return (
            <FormControl fullWidth sx={{height: '45px', marginTop: '15px'}}>
                <Select
                    displayEmpty
                    value={this.props.selectedProject.id}
                    onChange={this.onSelectChange}
                    input={<OutlinedInput />}
                    IconComponent={() => (
                        <UnfoldMoreIcon style={{height: '22px', marginRight: '5px', color: '#938EA6'}}/>
                    )}
                    sx={{height: '45px', borderColor: '#DFDFDF', boxShadow: '0px 2px 3px 2px rgba(147, 142, 166, 0.1)'}}
                    renderValue={(selected) => {
                        const selectedProject = find(this.props.allProjects, (project) => project.id === selected)

                        if (selected.length === 0) {
                            return <Typography style={{color: '#938EA6', fontSize: '15px', fontStyle: 'regular', overflow: 'hidden'}}>Select Project</Typography>
                        }

                        return (
                            <div style={style.menuItem}>
                                <div style={style.menuItemIcon}>{selectedProject.title.charAt(0)}</div>
                                <Typography style={{fontSize: '16px', fontWeight: '400', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{selectedProject.title}</Typography>
                            </div>
                        )
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {/*<MenuItem disabled value="">*/}
                    {/*    <em>Placeholder</em>*/}
                    {/*</MenuItem>*/}
                    {this.props.allProjects.map((project) => (
                        <MenuItem
                            key={project.id} // Use project.id as the key
                            value={project.id} // Update this line to use project.id
                            // style={getStyles(project.title, personName, theme)}
                        >
                            <div style={style.menuItemIcon}>{project.title.charAt(0)}</div>
                            {project.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }

    onSelectChange = (event) => {
        console.log('selecting project value', event.target.value)
        this.props.selectProject(event.target.value)
    }

}

const style = {
    menuItem: {
        display: 'flex',
        justifyContent: 'left'
    },
    menuItemIcon: {
        width: '22px',
        height: '22px',
        background: '#552CF6',
        color: '#fff',
        marginRight: '10px',
        textAlign: 'center',
        borderRadius: '5px',
        fontSize: '12px',
        display: 'flex',
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
}