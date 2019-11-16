import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../../layout'
import Markdown from '../../markdown'
import content from './index.md'
import metadata from './metadata.json'

const Page = () => (
  <Layout metadata={metadata} >
    <Markdown content={content} />
  </Layout>
)

export default Page 
