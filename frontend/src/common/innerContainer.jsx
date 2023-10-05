/* eslint-disable react/display-name,react/prop-types */
import React from 'react'

export default ({...props}) =>
    <div {...props}
               style={{...style.innerContainer, ...props.style}}/>

const style = {
    innerContainer: {
        maxWidth: '1440px',
        padding: 0,
        paddingTop: '64px'
    }
}
