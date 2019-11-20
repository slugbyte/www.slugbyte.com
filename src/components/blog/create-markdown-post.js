import './_markdown-post.scss'

import React from 'react'
import {Link} from 'gatsby'
import Layout from '../layout'
import Markdown from '../markdown'
import BlogNav from './blog-nav.js'

const createMarkdownPost = ({metadata, content}) => () => {
  let className = metadata.title.toLowerCase().replace(/[^A-Za-z0-9 ]/g, '').replace(new RegExp(' ', 'g'), '-') + ' blog-post'
  return (
    <Layout metadata={metadata}>
      <div className={className}>
        <div className={metadata.url.slice(1).replace(new RegExp('/', 'g'), '-')}>
          <Markdown content={content} />
          <BlogNav metadata={metadata} />
        </div>
      </div>
    </Layout>
  )
}

export default createMarkdownPost 
