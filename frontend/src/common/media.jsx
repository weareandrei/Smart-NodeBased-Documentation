import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react'

export const withMediaQuery = (Component) => (props) => {
    const isMobile = Boolean(window.matchMedia('(max-width: 599px)').matches)
    const isDesktop = !isMobile

    return <Component {...props}
                      isMobile={isMobile}
                      isDesktop={isDesktop}/>
}