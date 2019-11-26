import './_layout.scss'

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'

let defaultTwitterCard = 'https://www.slugbyte.com' + require('../../asset/image/card/twitter/landing-card-twitter.png')
let defaultFacebookCard = 'https://www.slugbyte.com' + require('../../asset/image/card/facebook/landing-card-facebook.png')

const Layout = (props) => {
  let children = props.children
  let metadata = props.metadata || {}
  
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet>
            <html lang="en" />
            <title>{metadata.title || data.site.siteMetadata.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name='description' content={ metadata.description || `Slugbyte's Art, Audio, and Programming Blog + Portfolio.`  } />
            <meta name='keywords' content={ metadata.keywords || 'art audio programing portfolio blog' }/>

            <meta name='twitter:title' content={ metadata.title }/>
            <meta name='twitter:description' content={ metadata.description }/>
            <meta name='twitter:image' content={metadata.twitterCard || defaultTwitterCard}/>
            <meta name='twitter:url' content={ 'https://www.slugbyte.com' + metadata.url }/>
            <meta name='twitter:card' content={ 'summary_large_image'}/> 

            <meta property='og:title' content={ metadata.title }/>
            <meta property='og:description' content={ metadata.description }/>
            <meta property='og:image' content={metadata.facebookCard || defaultFacebookCard }/>
            <meta property='og:url' content={ 'https://www.slugbyte.com' + metadata.url }/>
          </Helmet>
          <div className='site-content'>
            <Header />
            <main className='site-main'>
              {children}
            </main>
            <footer>
              &copy; Duncan Marsh 2019
            </footer>
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
