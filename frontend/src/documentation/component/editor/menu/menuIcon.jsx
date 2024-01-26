import React from 'react'

import { FaBold, FaItalic } from "react-icons/fa"
import { MdOutlineFormatUnderlined } from "react-icons/md"
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu"


const MenuIcon = ({ name, className}) => {
    switch (name) {
        case 'paragraph':
            return (<FaBold style={style.icon} className={className}/>)
        case 'heading1':
            return (<LuHeading1 style={style.icon} className={className}/>)
        case 'heading2':
            return (<LuHeading2 style={style.icon} className={className}/>)
        case 'heading3':
            return (<LuHeading3 style={style.icon} className={className}/>)
        case 'italic':
            return (<FaItalic style={style.icon} className={className}/>)
        case 'underline':
            return (<MdOutlineFormatUnderlined style={style.icon} className={className}/>)

    }
}

const style = {
    icon: {
        height: '15px',
        width: '15px',
        color: '#000'
    }
}

export default MenuIcon