import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import Typography from "@mui/material/Typography";

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

const names = [
    'MetaScanner Project',
    'FairShop',
    'Telegram News Channel'
]

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function ProjectSelect() {
    const theme = useTheme()
    const [personName, setPersonName] = React.useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    return (
        <FormControl fullWidth sx={{height: '45px', marginTop: '15px'}}>
            <Select
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                IconComponent={() => (
                    <UnfoldMoreIcon style={{height: '22px', marginRight: '5px', color: '#938EA6'}}/>
                )}
                sx={{height: '45px', borderColor: '#DFDFDF', boxShadow: '0px 2px 3px 2px rgba(147, 142, 166, 0.1)'}}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <Typography style={{color: '#938EA6', fontSize: '15px', fontStyle: 'regular', overflow: 'hidden'}}>Select project</Typography>
                    }

                    return (
                        <div style={style.menuItem}>
                            <div style={style.menuItemIcon}>{selected[0].charAt(0)}</div>
                            <Typography style={{fontSize: '16px', fontWeight: '400', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{selected[0]}</Typography>
                        </div>
                    )
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {/*<MenuItem disabled value="">*/}
                {/*    <em>Placeholder</em>*/}
                {/*</MenuItem>*/}
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                    >
                        <div style={style.menuItemIcon}>{name.charAt(0)}</div>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
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