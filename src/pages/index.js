import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout >
    <div style={{padding: '100px'}}>
      <h1>Hi people</h1>
      <img 
      style={{width: '100%'}}
  alt='slugtina demo animation' src={require('../images/slugtina.gif')} />
    </div>
  </Layout>
)

export default IndexPage
