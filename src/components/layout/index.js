import './_layout.scss'

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'

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
            <meta name='description' content={ metadata.description || `Slugbyte's Art/> Audio, and Programming Blog + Portfolio.`  } />
            <meta name='keywords' content={ metadata.keywords || 'art programing portfolio blog' }/>
            <meta name='twitter:title' content={ metadata.title }/>
            <meta name='twitter:description' content={ metadata.description }/>
            <meta name='twitter:image' content={ metadata.image || require('../blog/needy-for-speedy/cover-image.png')}/>
            <meta name='twitter:url' content={ metadata.url }/>
            <meta name='twitter:card' content={ metadata.card  || 'slugbyte_card'}/> 
            <meta property='og:title' content={ metadata.title }/>
            <meta property='og:description' content={ metadata.description }/>
            <meta property='og:image' content={ metadata.image || require('../blog/needy-for-speedy/cover-image.png')}/>
            <meta property='og:url' content={ metadata.url }/>
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
