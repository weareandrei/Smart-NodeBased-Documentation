import * as React from 'react'
import PropTypes from "prop-types"

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Select as BaseSelect } from '@mui/base/Select'

import map from "lodash/map"

import NodeIcon from "./nodeIcon"
import {Paper} from "@mui/material"
import {Option} from "@mui/base"
import Button from "@mui/material/Button";

const allIcons = [
    { id: '0', iconName: "page", typeName: "Page" },
    { id: '1', iconName: "code snippet", typeName: "Code Snippet" },
    { id: '2', iconName: "note", typeName: "Note" },
    { id: '3', iconName: "link", typeName: "Link" }
]

export default class NodeTypeSelect extends React.Component {

    static propTypes = {
        selectedType: PropTypes.string.isRequired,
        selectType: PropTypes.func.isRequired
    }

    render() {
        return (
            <FormControl>
                <BaseSelect
                    displayEmpty
                    value={this.props.selectedType.id}
                    // onChange={this.onSelectChange}
                    sx={{border: '0px'}}
                    renderValue={(selected) => {
                        return (
                            <NodeIcon nodeType={this.props.selectedType} type={'main'}/>
                        )
                    }}
                >
                    <Paper>
                        {map(allIcons, (icon) => (
                            <MenuItem
                                key={icon.id} // Use project.id as the key
                                value={icon.iconName} // Update this line to use project.id

                                // style={getStyles(project.title, personName, theme)}
                            >
                                <Button onClick={() => this.onSelectChange(icon.iconName)}>
                                    <NodeIcon nodeType={icon.iconName} type={'main'}/>
                                    {icon.typeName}
                                </Button>
                            </MenuItem>
                        ))}
                    </Paper>

                </BaseSelect>
            </FormControl>
        )
    }

    onSelectChange = (iconName) => {
        console.log('selecting node type value', iconName)
        this.props.selectType(iconName)
    }

}