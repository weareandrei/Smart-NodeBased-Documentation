/* eslint-disable max-len,max-lines-per-function */
import Helmet from 'react-helmet/lib/Helmet'
import React from 'react'

const Head = () =>
    <Helmet>
        <title>Omega - Boost Your Development Productivity</title>
        <meta name='theme-color'
              content='#6D86A4'/>
        <meta name='application-name'
              content='Omega'/>
        <meta property='og:site_name'
              content='Omega'/>

        <meta property='og:locale'
              content='en_US'/>

        <meta content='Omega - Boost Your Development Productivity.'
              name='description'/>
        <meta content='Omega'
              property='og:title'/>

        <meta content='Omega - Boost Your Development Productivity.'
              property='og:description'/>
        <meta content='https://www.omega.app/'
              property='og:url'/>

        <meta property='og:type'
              content='website'/>

        <meta content='Omega - Boost Your Development Productivity'
              property='twitter:title'/>
        <meta content='Omega - Boost Your Development Productivity.'
              property='twitter:description'/>

        {/*favicon*/}
        <link rel='apple-touch-icon'
              sizes='180x180'
              href='../../public/favicon.ico'/>
        <link rel='shortcut icon'
              type='image/x-icon'
              href='../../public/favicon.ico'/>
        <link rel='shortcut icon'
              type='image/png'
              sizes='32x32'
              href='../../public/favicon.ico'/>
        <link rel='shortcut icon'
              type='image/png'
              sizes='16x16'
              href='../../public/favicon.ico'/>

        <link rel='canonical'
              href={window.location.href}/>
    </Helmet>

export default Head
