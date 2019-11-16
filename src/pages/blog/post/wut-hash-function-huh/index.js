import React from 'react'
import Layout from '../../../../components/layout'

import Observable from '../../../../components/observable'

import oContent from './observable-function.js'
import oData from './observable-data.js'

const Page = () => (
  <Layout  >
    <Observable content={oContent} data={oData} expose={['stringTo32BitBlocks', 'hash', 'mix', 'hashedLoremToPoints']}/>
  </Layout>
)

export default Page 
