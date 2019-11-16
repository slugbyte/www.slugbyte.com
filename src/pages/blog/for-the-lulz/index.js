import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../../../components/layout'
import Markdown from '../../../components/markdown'
import content from './index.md'
import metadata from './metadata.json'


const Page = () => (
  <Layout 
     title={metadata.title} 
     description={metadata.description}>
    <Markdown content={content} />
  </Layout>
)

export default Page 
