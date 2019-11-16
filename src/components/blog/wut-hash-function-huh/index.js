import React from 'react'

import {Link} from 'gatsby'
import Layout from '../../layout'
import Observable from '../../observable'

import oContent from './observable-function.js'
import oData from './observable-data.js'
import metadata from './metadata.json'

const Page = () => (
  <Layout metadata={metadata}>
    <Link to='/blog' className='back-btn'> Back </Link>
    <Observable content={oContent} data={oData} expose={['stringTo32BitBlocks', 'hash', 'mix', 'hashedLoremToPoints']}/>
    <Link to='/blog' className='back-btn'> Back </Link>
  </Layout>
)

export default Page 
