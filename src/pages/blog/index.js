import './_blog.scss' 

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
import Image from '../../components/image'

const BlogPostItem = () => (
  <div className='blog-post'>
    <h2></h2>
    <img />
    <p></p>
  </div>
)

const IndexPage = () => (
  <Layout >
    <div className='blog-page'>
      <div className='blog-container'>
         <BlogPostItem />
         <BlogPostItem />
         <BlogPostItem />
         <BlogPostItem />
         <BlogPostItem />
      </div>
    </div>
  </Layout>
)

export default IndexPage
