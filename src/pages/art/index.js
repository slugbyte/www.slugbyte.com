import './_art.scss'

import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from '../../components/layout'
import ArtBrowser from '../../components/art-browser'

const metadata = require('./metadata.json')

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
