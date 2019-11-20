import './_blog.scss' 

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
import LazyImage from '../../components/lazy-image'
const postData = require('../../components/blog/create-blog-post-data.js')()

import metadata from './metadata.json'

const BlogPostItem = ({post}) => {
  let {metadata, thumbnail, imageURL} = post
  console.log('thumbnail', thumbnail)
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
      <div className='blog-container'>
        {postData.map((post, i) => <BlogPostItem key={i} post={post} /> ) }
      </div>
    </div>
  </Layout>
)

export default IndexPage
