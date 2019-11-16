import React from 'react'

import {Link} from 'gatsby'
import Layout from '../layout'
import Markdown from '../markdown'
import BlogNav from './blog-nav.js'

const createMarkdownPost = ({metadata, content}) => () => {
  return (
    <Layout metadata={metadata}>
      <div className={metadata.url.slice(1).replace(new RegExp('/', 'g'), '-')}>
        <Markdown content={content} />
        <BlogNav metadata={metadata} />
      </div>
    </Layout>
  )
}

export default createMarkdownPost 
