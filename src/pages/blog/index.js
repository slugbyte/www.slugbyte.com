import './_blog.scss' 

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
const postData = require('../../components/blog/create-blog-post-data.js')()

import metadata from './metadata.json'

const BlogPostItem = ({imageURL, metadata}) => (
  <div className='blog-post-item'>
    <img src={imageURL}/>
    <h2>{metadata.title}</h2>
    <p>{metadata.description}</p>
    <Link to={metadata.url}>Read Post</Link>
  </div>
)

const IndexPage = () => (
  <Layout metadata={metadata}>
    <div className='blog-page'>
      <div className='blog-container'>
        {postData.map((post, i) => <BlogPostItem metadata={post.metadata} imageURL={post.imageURL}/> ) }
      </div>
    </div>
  </Layout>
)

export default IndexPage
