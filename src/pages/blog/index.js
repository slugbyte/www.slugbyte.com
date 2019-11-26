import './_blog.scss' 

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
import LazyImage from '../../components/lazy-image'

import allPostMetadata from '../../components/blog-posts/all-post-metadata.js'
import metadata from '../../metadata/blog-metadata.js'

const BlogPostItem = ({post}) => {
  let {metadata} = post
  post.image.description = metadata.description
  return (
    <div className='blog-post-item'>
      <LazyImage image={post.image} />
      <h2>{metadata.title}</h2>
      <p>{metadata.description}</p>
      <Link to={metadata.url}>Read Post</Link>
    </div>
  )
}

const IndexPage = () => (
  <Layout metadata={metadata}>
    <div className='blog-page'>
      <div className='blog-container clearfix'>
        {allPostMetadata.map((post, i) => <BlogPostItem key={i} post={post} /> ) }
      </div>
    </div>
  </Layout>
)

export default IndexPage
