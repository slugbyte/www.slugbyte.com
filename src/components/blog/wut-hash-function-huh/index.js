import React from 'react'

import {Link} from 'gatsby'
import Layout from '../../layout'
import Observable from '../../observable'
import BlogNav from '../blog-nav.js'

import oContent from './observable-function.js'
import oData from './observable-data.js'
import metadata from './metadata.json'

const Page = () => (
  <Layout metadata={metadata}>
    <Observable content={oContent} data={oData} expose={['stringTo32BitBlocks', 'hash', 'mix', 'hashedLoremToPoints']}/>
    <BlogNav metadata={metadata} />
  </Layout>
)

export default Page 
