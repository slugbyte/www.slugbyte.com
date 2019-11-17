import './layout.scss'

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
          <Helmet
            title={metadata.title || data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: metadata.description | 'TODO:'  },
              { name: 'keywords', content: 'art, programming, music' },
            ]}>
            <html lang="en" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Helmet>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className='site-content'>
            {children}
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
