import React from 'react'

import Layout from '../layout'
import Markdown from '../markdown'

const createMarkdownPost = ({metadata, content}) => () => (
  <Layout metadata={metadata}>
    <Markdown content={content} />
  </Layout>
)

export default createMarkdownPost 
