import './_art.scss'

import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from '../../components/layout'
import ArtBrowser from '../../components/art-browser'

import metadata from '../../metadata/art-metadata.js'

const IndexPage = () => {
  return (
    <Layout metadata={metadata}>
      <div className='art-page'>
        <ArtBrowser />
      </div>
    </Layout>
  )
}

export default IndexPage
