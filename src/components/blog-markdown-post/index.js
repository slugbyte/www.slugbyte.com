import './_markdown-post.scss'

import React from 'react'
import Layout from '../layout'
import Markdown from '../markdown'
import BlogNav from '../blog-nav'

class BlogMarkdownPost extends React.Component { 
  render(){
    let {metadata, content} = this.props
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
}

export default BlogMarkdownPost
