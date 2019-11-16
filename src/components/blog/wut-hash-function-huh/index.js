import React from 'react'

import Layout from '../../layout'
import Observable from '../../observable'

import oContent from './observable-function.js'
import oData from './observable-data.js'

const Page = () => (
  <Layout  >
    <Observable content={oContent} data={oData} expose={['stringTo32BitBlocks', 'hash', 'mix', 'hashedLoremToPoints']}/>
  </Layout>
)

export default Page 
